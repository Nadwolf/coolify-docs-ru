---
title: "OpenSSH"
description: "Настройте сервер OpenSSH для Coolify: аутентификация по ключам, правильные права доступа и автоматизированная настройка SSH в Ubuntu, Debian, CentOS и Alpine Linux."
---

# OpenSSH
Coolify использует SSH для подключения к вашему серверу и развертывания приложений. Это касается даже сервера `localhost`, на котором запущен сам Coolify.

Вам необходимо правильно настроить SSH, чтобы Coolify имел доступ к вашим серверам.

## Методы настройки
Существует два способа настройки OpenSSH:
- [Полуавтоматическая настройка](#полуавтоматическая-настройка)
- [Ручная настройка](#ручная-настройка)

::: danger ВАЖНО!
  SSH-ключ не должен иметь кодовой фразы (passphrase), а для пользователя не должна быть включена двухфакторная аутентификация (2FA). В противном случае скрипт установки или SSH-соединение Coolify завершатся ошибкой.
:::

## Полуавтоматическая настройка
### 1. Установка OpenSSH Server

::: tabs
== Debian / Ubuntu / PopOS

```bash
apt update && apt install -y openssh-server
systemctl enable --now ssh
```

== CentOS / RHEL / Rocky / Fedora

```bash
dnf install -y openssh-server
systemctl enable --now sshd
```

== SLES/openSUSE

```bash
zypper install -y openssh
systemctl enable --now sshd
```

== Arch Linux

```bash
pacman -Sy --noconfirm openssh
systemctl enable --now sshd
```

== Alpine Linux

```bash
apk add openssh
rc-update add sshd
rc-service sshd start
```
:::

### 2. Настройка SSH

1. Отредактируйте конфигурацию SSH:

```bash
nano /etc/ssh/sshd_config
```

2. Установите следующие параметры:

```ssh
PubkeyAuthentication yes
PermitRootLogin prohibit-password
```

::: info Примечание
  Параметр `PermitRootLogin` может принимать значения `yes`, `without-password` или `prohibit-password`. Для повышения безопасности мы рекомендуем использовать `prohibit-password`.
:::

::: danger ВАЖНО!
  Убедитесь, что вы добавили свои SSH-ключи в файл `~/.ssh/authorized_keys` ПЕРЕД ТЕМ, как устанавливать `PermitRootLogin` в значение `prohibit-password`, иначе вы можете потерять доступ к серверу.
:::

3. Перезапустите SSH:

::: tabs
== Debian / Ubuntu / PopOS

```bash
systemctl restart ssh
```

== CentOS / RHEL / Rocky / Fedora / Arch / openSUSE

```bash
systemctl restart sshd
```

== Alpine Linux

```bash
rc-service sshd restart
```
:::

## Ручная настройка

::: info Примечание
Следующие шаги обычно выполняются автоматически скриптом установки Coolify. Ручная настройка требуется только в случае сбоя автоматической.
:::

### 1. Установка OpenSSH Server
(Шаги идентичны описанным в разделе "Полуавтоматическая настройка")

### 2. Настройка SSH
(Шаги идентичны описанным в разделе "Полуавтоматическая настройка")

### 3. Генерация SSH-ключа для Coolify

Выполните следующие команды **на сервере**:
1. Сгенерируйте SSH-ключ:
```bash
ssh-keygen -t ed25519 -a 100 \
  -f /data/coolify/ssh/keys/id.root@host.docker.internal \
  -q -N "" -C root@coolify
```

2. Измените владельца файла:
```bash
chown 9999 /data/coolify/ssh/keys/id.root@host.docker.internal
```

### 4. Авторизация публичного ключа

1. Добавьте публичный ключ в файл `authorized_keys`:
```bash
mkdir -p ~/.ssh
cat /data/coolify/ssh/keys/id.root@host.docker.internal.pub >> ~/.ssh/authorized_keys
```

2. Измените права доступа:
```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

### 5. Добавление приватного ключа в Coolify

1. Скопируйте содержимое приватного ключа:
```bash
# Эта команда выведет содержимое приватного ключа, скопируйте его вручную
cat /data/coolify/ssh/keys/id.root@host.docker.internal
```

2. Войдите в дашборд Coolify и добавьте новый приватный ключ (Add a new private key).
  <ZoomableImage src="/docs/images/knowledge-base/servers/openssh/1.webp" />
  
  В поле ввода вставьте приватный ключ, скопированный на предыдущем шаге.
  <ZoomableImage src="/docs/images/knowledge-base/servers/openssh/2.webp" />

3. Перейдите во вкладку **Servers** и выберите сервер `localhost`.
  <ZoomableImage src="/docs/images/knowledge-base/servers/openssh/3.webp" />

4. Перейдите на страницу "Private key" и выберите ключ, добавленный ранее.
  <ZoomableImage src="/docs/images/knowledge-base/servers/openssh/4.webp" />

### 6. Валидация сервера
Перейдите на страницу "General" и нажмите **Validate Server & Install Docker Engine**.
  <ZoomableImage src="/docs/images/knowledge-base/servers/openssh/5.webp" />

После завершения вы должны увидеть зеленый статус **Proxy Running**, что означает успешную настройку.
  <ZoomableImage src="/docs/images/knowledge-base/servers/openssh/6.webp" />