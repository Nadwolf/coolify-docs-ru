---
title: Установка
description: Установите self-hosted PaaS Coolify на Linux-серверы с помощью автоматизированного скрипта настройки Docker, ручной конфигурации, доступа по SSH и настройки фаервола.
outline: 2
---

<ZoomableImage src="/docs/images/get-started/installation-banner.webp" alt="Coolify installation banner" />

<br />

Если вы решите использовать **Coolify Cloud**, установка не требуется. Просто посетите страницу [регистрации Coolify Cloud](https://app.coolify.io/register), чтобы создать учетную запись и начать работу с Coolify за считанные минуты!

Ниже приведены инструкции по установке Coolify, если вы предпочитаете **self-host** версию.

## Self-hosted установка

Если вам нравится всё контролировать и управлять самостоятельно, self-hosting Coolify — ваш путь.

Это совершенно бесплатно (не считая расходов на сервер) и дает вам полный контроль над вашей конфигурацией.

::: success Быстрая установка (рекомендуется):

```sh
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
```

Запустите этот скрипт в своем терминале, и Coolify будет установлена автоматически. Для получения более подробной информации, включая настройку фаервола и предварительные требования, ознакомьтесь с руководством ниже.

:::

::: warning Примечание для пользователей Ubuntu:
Скрипт автоматической установки работает только с версиями Ubuntu LTS (20.04, 22.04, 24.04). Если вы используете версию, не являющуюся LTS (например, 24.10), пожалуйста, воспользуйтесь методом [ручной установки](#manual-installation) ниже.
:::

## Прежде чем начать

Перед установкой Coolify убедитесь, что ваш сервер соответствует необходимым требованиям.

### 1. Требования к серверу

Вам нужен сервер с доступом по SSH. Это может быть:

- VPS (Virtual Private Server)
- Выделенный сервер (Dedicated Server)
- Виртуальная машина (VM)
- Raspberry Pi (см. наше [руководство по настройке Raspberry Pi OS](/knowledge-base/how-to/raspberry-pi-os#prerequisites))
- Или любой другой сервер с доступом по SSH

:::warning Примечание:
Для Coolify лучше всего использовать чистый сервер, чтобы избежать конфликтов с существующими приложениями.
:::

:::info Совет:
Если вы еще не выбрали провайдера сервера, рассмотрите возможность использования [Hetzner](https://coolify.io/hetzner). Вы даже можете воспользоваться нашей [партнерской ссылкой](https://coolify.io/hetzner), чтобы поддержать проект.
:::

### 2. Поддерживаемые операционные системы

Coolify поддерживает несколько дистрибутивов Linux:

- На базе Debian (например, Debian, Ubuntu — поддерживаются все версии, но для Ubuntu не-LTS требуется ручная установка)
- На базе Redhat (например, CentOS, TencentOS, Fedora, Redhat, AlmaLinux, Rocky, Asahi)
- На базе SUSE (например, SLES, SUSE, openSUSE)
- Arch Linux (Примечание: поддерживаются не все производные Arch)
- Alpine Linux
- Raspberry Pi OS 64-bit (Raspbian)

::: info Примечание
Для некоторых дистрибутивов (например, AlmaLinux) Docker должен быть предварительно установлен. Если скрипт установки не сработал, установите Docker вручную и запустите скрипт повторно.

Другие дистрибутивы Linux также могут работать с Coolify, но они не тестировались официально.
:::

### 3. Поддерживаемые архитектуры

Coolify работает на 64-битных системах:

- AMD64
- ARM64

::: warning Примечание для пользователей Raspberry Pi:
Обязательно используйте 64-битную версию Raspberry Pi OS (Raspbian). Для получения подробной информации ознакомьтесь с нашим [руководством по настройке Raspberry Pi OS](/knowledge-base/how-to/raspberry-pi-os#prerequisites).
:::

### 4. Минимальные аппаратные требования

Ваш сервер должен иметь как минимум:

- **CPU**: 2 ядра
- **Оперативная память (RAM)**: 2 ГБ
- **Хранилище**: 30 ГБ свободного места

Coolify может исправно работать на серверах с характеристиками ниже указанных, но мы рекомендуем придерживаться этих минимальных требований.

Это гарантирует, что у пользователей будет достаточно ресурсов для развертывания нескольких приложений без проблем с производительностью.

::: warning Внимание!
Если вы запускаете и сборки, и саму Coolify на одном сервере, следите за использованием ресурсов. Высокая нагрузка может сделать ваш сервер невосприимчивым.

При необходимости рассмотрите возможность включения файла подкачки (swap) или апгрейда сервера.
:::

### 5. Ресурсы сервера для ваших проектов

Необходимые ресурсы зависят от ваших проектов. Например, если вы планируете размещать несколько сервисов или крупные приложения, выберите сервер с более мощным процессором, большим объемом памяти и хранилища.

::: success ⚙️ Пример конфигурации:
Андраш (автор Coolify) запускает свои продакшн-приложения на сервере со следующими характеристиками:

- **Память**: 8 ГБ (среднее использование: 3.5 ГБ)
- **CPU**: 4 ядра (среднее использование: 20–30%)
- **Хранилище**: 150 ГБ (среднее использование: 40 ГБ)

Эта конфигурация комфортно поддерживает:

- 3 приложения NodeJS
- 4 статических сайта
- Plausible Analytics
- Fider (инструмент обратной связи)
- UptimeKuma (мониторинг доступности)
- Ghost (рассылки)
- 3 базы данных Redis
- 2 базы данных PostgreSQL
:::

## Методы установки

Существует два способа установки Coolify:

- [Быстрая установка](#quick-installation-recommended) (рекомендуется)
- [Ручная установка](#manual-installation)

Мы настоятельно рекомендуем метод **быстрой установки**, так как он автоматизирует процесс и снижает вероятность ошибок.

---

### Быстрая установка (рекомендуется)

Это самый простой и быстрый способ запустить Coolify.

#### 1. Подготовьте сервер

- Войдите как пользователь root (пользователи без прав root пока полностью не поддерживаются).
- Настройте SSH, следуя [руководству по настройке SSH](/knowledge-base/server/openssh#ssh-settings-configuration).
- Настройте фаервол с помощью [руководства по фаерволу](/knowledge-base/server/firewall).
- Убедитесь, что установлен [curl](https://curl.se/) (обычно он предустановлен).

#### 2. Запустите скрипт установки

Как только ваш сервер будет готов, выполните:

```sh
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

Посмотреть [исходный код скрипта](https://github.com/coollabsio/coolify/blob/main/scripts/install.sh)

::: info Совет:
Если вы вошли не под пользователем root, запустите скрипт через sudo:

```sh
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
```

:::

#### Продвинутый уровень: Настройка установки с помощью переменных окружения

Скрипт установки поддерживает несколько переменных окружения для настройки вашей инсталляции Coolify. Они не являются обязательными.

:::details Нажмите, чтобы просмотреть все доступные переменные окружения

Вы можете установить эти переменные окружения перед запуском скрипта установки, чтобы настроить вашу конфигурацию Coolify:

| Переменная окружения         | Описание                                              | Значение по умолчанию | Пример               |
| ---------------------------- | ----------------------------------------------------- | --------------------- | -------------------- |
| `ROOT_USERNAME`              | Имя пользователя для первой учетной записи админа     | -                     | `admin`              |
| `ROOT_USER_EMAIL`            | Email для первой учетной записи админа                | -                     | `admin@example.com`  |
| `ROOT_USER_PASSWORD`         | Пароль для первой учетной записи админа               | -                     | `SecurePassword123!` |
| `DOCKER_ADDRESS_POOL_BASE`   | База пула адресов Docker (нотация CIDR)               | `10.0.0.0/8`          | `172.16.0.0/12`      |
| `DOCKER_ADDRESS_POOL_SIZE`   | Размер пула адресов Docker (от 16 до 28)              | `24`                  | `20`                 |
| `DOCKER_POOL_FORCE_OVERRIDE` | Принудительная перезапись существующего пула Docker    | `false`               | `true`               |
| `AUTOUPDATE`                 | Включить/выключить автоматическое обновление Coolify   | `true`                | `false`              |
| `REGISTRY_URL`               | Пользовательский Docker registry для образов Coolify  | `ghcr.io`             | `your-registry.com`  |

**Примеры использования:**

**1. Создание учетной записи админа во время установки:**

```bash
env ROOT_USERNAME=admin \
ROOT_USER_EMAIL=admin@example.com \
ROOT_USER_PASSWORD=SecurePassword123 \
bash -c 'curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash'
```

Ознакомьтесь с руководством [Создание root-пользователя через переменные окружения](/knowledge-base/create-root-user-with-env) для подробностей.

**2. Настройка пула сети Docker:**

```bash
env DOCKER_ADDRESS_POOL_BASE=172.16.0.0/12 \
DOCKER_ADDRESS_POOL_SIZE=20 \
bash -c 'curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash'
```

Ознакомьтесь с руководством [Определение кастомной сети Docker через ENV](/knowledge-base/define-custom-docker-network-with-env) для подробностей.

**3. Отключение автообновлений:**

```bash
env AUTOUPDATE=false \
bash -c 'curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash'
```

**4. Использование собственного Docker Registry:**

```bash
env REGISTRY_URL=your-registry.com \
bash -c 'curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash'
```

При использовании собственного реестра убедитесь, что все необходимые образы Coolify доступны в нем.

**5. Сочетание нескольких переменных:**

```bash
env ROOT_USERNAME=admin \
ROOT_USER_EMAIL=admin@example.com \
ROOT_USER_PASSWORD=SecurePassword123 \
AUTOUPDATE=false \
DOCKER_ADDRESS_POOL_BASE=172.16.0.0/12 \
bash -c 'curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash'
```

:::

#### 3. Доступ к Coolify

После установки скрипт отобразит ваш URL для входа в Coolify (например, `http://203.0.113.1:8000`). Перейдите по этому адресу, и вы будете перенаправлены на страницу регистрации для создания первой учетной записи администратора.

::: danger ВНИМАНИЕ:
**Сразу после установки создайте учетную запись администратора. Если кто-то другой перейдет на страницу регистрации раньше вас, он может получить полный контроль над вашим сервером.**
:::

::: info Примечание:
Если вы установили Coolify на Raspberry Pi в вашей домашней сети, используйте ваш локальный IP-адрес для доступа, так как публичный IP может не сработать внутри сети.
:::

#### Что делает установщик:

- Устанавливает необходимые инструменты (curl, wget, git, jq, openssl)
- Устанавливает Docker Engine (версия 24+)
- Настраивает параметры Docker (логирование, демон)
- Создает директории в `/data/coolify`
- Настраивает SSH-ключи для управления сервером
- Устанавливает и запускает Coolify

::: warning Внимание:
Docker, установленный через snap, не поддерживается!
:::

**На этом руководство по быстрой установке заканчивается. Если вы выполнили шаги выше, вы можете начать использовать Coolify. Руководство ниже предназначено для тех, кто хочет установить и настроить Coolify вручную.**

---

### Ручная установка

Для тех, кто предпочитает больше контроля, вы можете установить Coolify вручную. Этот метод требует нескольких дополнительных шагов.

::: info Примечание
Метод ручной установки обязателен для:

- Версий Ubuntu, не являющихся LTS (например, 24.10)
- Систем, в которых возникают проблемы с автоматическим скриптом
:::

#### Предварительные требования

- **SSH**: Убедитесь, что SSH включен и настроен правильно (см. [руководство по настройке SSH](/knowledge-base/server/openssh)).
- **curl**: Убедитесь, что [curl](https://curl.se/) установлен.
- **Docker Engine**: Установите Docker, следуя официальному [руководству по установке Docker Engine](https://docs.docker.com/engine/install/#server) (версия 24+).

::: warning Внимание:
Docker, установленный через snap, не поддерживается!
:::

---

Выполните следующие шаги для ручной настройки:

#### 1. Создание директорий

Создайте базовые директории для Coolify в `/data/coolify`:

```sh
mkdir -p /data/coolify/{source,ssh,applications,databases,backups,services,proxy,webhooks-during-maintenance}
mkdir -p /data/coolify/ssh/{keys,mux}
mkdir -p /data/coolify/proxy/dynamic
```

#### 2. Генерация и добавление SSH-ключа

Сгенерируйте SSH-ключ, чтобы Coolify могла управлять вашим сервером:

```sh
ssh-keygen -f /data/coolify/ssh/keys/id.root@host.docker.internal -t ed25519 -N '' -C root@coolify
```

Затем добавьте публичный ключ в ваш файл `~/.ssh/authorized_keys`:

```sh
cat /data/coolify/ssh/keys/id.root@host.docker.internal.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

::: info Совет!
Если у вас уже есть SSH-ключ, вы можете пропустить генерацию нового, но не забудьте добавить его в ваш экземпляр Coolify после установки.
:::

#### 3. Настройка конфигурационных файлов

Загрузите необходимые файлы из CDN Coolify в `/data/coolify/source`:

```sh
curl -fsSL https://cdn.coollabs.io/coolify/docker-compose.yml -o /data/coolify/source/docker-compose.yml
curl -fsSL https://cdn.coollabs.io/coolify/docker-compose.prod.yml -o /data/coolify/source/docker-compose.prod.yml
curl -fsSL https://cdn.coollabs.io/coolify/.env.production -o /data/coolify/source/.env
curl -fsSL https://cdn.coollabs.io/coolify/upgrade.sh -o /data/coolify/source/upgrade.sh
```

#### 4. Установка прав доступа

Установите правильные права доступа для файлов и директорий Coolify:

```sh
chown -R 9999:root /data/coolify
chmod -R 700 /data/coolify
```

#### 5. Генерация значений

Обновите файл `.env` безопасными случайными значениями:

```sh
sed -i "s|APP_ID=.*|APP_ID=$(openssl rand -hex 16)|g" /data/coolify/source/.env
sed -i "s|APP_KEY=.*|APP_KEY=base64:$(openssl rand -base64 32)|g" /data/coolify/source/.env
sed -i "s|DB_PASSWORD=.*|DB_PASSWORD=$(openssl rand -base64 32)|g" /data/coolify/source/.env
sed -i "s|REDIS_PASSWORD=.*|REDIS_PASSWORD=$(openssl rand -base64 32)|g" /data/coolify/source/.env
sed -i "s|PUSHER_APP_ID=.*|PUSHER_APP_ID=$(openssl rand -hex 32)|g" /data/coolify/source/.env
sed -i "s|PUSHER_APP_KEY=.*|PUSHER_APP_KEY=$(openssl rand -hex 32)|g" /data/coolify/source/.env
sed -i "s|PUSHER_APP_SECRET=.*|PUSHER_APP_SECRET=$(openssl rand -hex 32)|g" /data/coolify/source/.env
```

::: warning Важно:
Выполняйте эти команды только при первой установке Coolify. Изменение этих значений позже может нарушить работу вашей системы. Сохраните их в надежном месте!
:::

#### 6. Создание сети Docker

Убедитесь, что сеть Docker создана:

```sh
docker network create --attachable coolify
```

#### 7. Запуск Coolify

Запустите Coolify с помощью Docker Compose:

```sh
docker compose --env-file /data/coolify/source/.env -f /data/coolify/source/docker-compose.yml -f /data/coolify/source/docker-compose.prod.yml up -d --pull always --remove-orphans --force-recreate
```

::: warning Важно:
На этом этапе вам может потребоваться выполнить `docker login`, если возникнут проблемы.
:::

#### 8. Доступ к Coolify

Теперь вы можете получить доступ к Coolify, перейдя по адресу `http://203.0.113.1:8000` (замените `203.0.113.1` на IP-адрес вашего сервера).

Если вы застряли на каком-либо этапе, присоединяйтесь к нашему [сообществу в Discord](https://coolify.io/discord) и создайте пост в канале форума поддержки.
