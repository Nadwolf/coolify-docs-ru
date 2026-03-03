---
title: "Доступ к серверу по SSH через Cloudflare Tunnels"
description: "Настройте безопасный доступ по SSH к серверам Coolify через Cloudflare Tunnels с автоматической или ручной установкой cloudflared, скрывающей IP-адреса серверов."
---

# Доступ к серверу по SSH через Cloudflare Tunnels

Доступ к вашему серверу по SSH через Cloudflare Tunnel — это безопасный и простой способ подключения к удаленному серверу, при котором его IP-адрес остается скрытым.

Это руководство объясняет, как настроить такой доступ с помощью функции автоматической установки туннеля в Coolify.

## Для кого это?

Эта настройка идеальна, если вы:

- Хотите скрыть IP-адрес своего сервера.
- Хотите закрыть все порты SSH на сервере для внешнего мира.
- Не хотите полагаться на статические публичные IP для доступа к удаленному серверу.
- У вас нет статического публичного IP для сервера (актуально для [ручной настройки](#ручная-настройка)).

## Перед началом

- Мы предполагаем, что у вас уже есть сервер с запущенным Coolify, и вы хотите настроить туннель для подключения *другого* сервера к нему.
- Если вы пытаетесь настроить туннель на том же сервере, где запущен Coolify, и у вас нет других серверов для подключения, SSH-туннель вам не нужен. Coolify уже имеет полный root-доступ к серверу, на котором он работает.

## Как это работает?

Схема процесса для визуализации:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/high-level-diagram.webp" />

---

# Методы настройки

Существует два способа: автоматический и ручной.

Основное различие в том, что при ручной настройке вы устанавливаете cloudflared сами, а при автоматической — это делает Coolify.

Выберите нужный раздел:

- [Автоматическая настройка](#автоматическая-настройка)
- [Ручная настройка](#ручная-настройка)

## Автоматическая настройка

Для использования автоматической настройки Coolify:

- Ваш удаленный сервер должен иметь **публичный IP-адрес** и **активный порт SSH** на время начальной настройки. После завершения вы сможете закрыть все порты.
- Если у вашего сервера вообще нет публичного IP, автоматическая настройка **вам не подходит**. Используйте [ручную настройку](#ручная-настройка).
- Вам нужен домен, **DNS которого управляются через Cloudflare**.

### Быстрые ссылки:

- [Создание приватного SSH ключа](#_1-создание-приватного-ssh-ключа)
- [Добавление публичного ключа на сервер](#_2-добавление-публичного-ключа-на-сервер)
- [Добавление сервера в Coolify](#_3-добавление-вашего-сервера-в-coolify)
- [Валидация сервера в Coolify](#_4-валидация-вашего-сервера-в-coolify)
- [Создание Cloudflare Tunnel](#_5-создание-cloudflare-tunnel)
- [Настройка Cloudflare Tunnel в Coolify](#_6-настройка-cloudflare-tunnel-в-coolify)

---

::: warning Пример данных
В этом руководстве используются следующие данные в качестве примера. Заменяйте их своими реальными данными:

- **IPv4 адрес удаленного сервера:** 203.0.113.1
- **Доменное имя:** example.com
- **Имя пользователя:** root
- **Порт SSH:** 22
:::

---

## 1. Создание приватного SSH ключа

Чтобы создать ключ:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/automated-1.webp" />

1. В дашборде Coolify перейдите в **Keys & Tokens**.
2. Нажмите кнопку **+ Add**.

Вам предложат выбрать тип ключа и дать ему название.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/automated-2.webp" />

1. Нажмите Generate new **ED25519** или **RSA**, чтобы создать ключ.
2. Скопируйте публичный ключ и сохраните его (он нужен для следующего шага). Нажмите **Continue**.

## 2. Добавление публичного ключа на сервер

Подключитесь по SSH к серверу, который хотите добавить в Coolify:

```sh
ssh root@203.0.113.1
```

Добавьте ваш публичный ключ в файл authorized_keys:

```sh
$ echo "<ВСТАВЬТЕ_ВАШ_ПУБЛИЧНЫЙ_КЛЮЧ_В_ЭТИ_КАВЫЧКИ>" >> ~/.ssh/authorized_keys
```

## 3. Добавление вашего сервера в Coolify

Чтобы добавить сервер:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/automated-3.webp" />

1. В дашборде Coolify перейдите в **Servers**.
2. Нажмите кнопку **+ Add**.

Укажите данные сервера:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/automated-4.webp" />

1. **Name** - Название сервера для отображения.
2. **IP Address/Domain** - Введите публичный IP сервера.
3. **Port** - Порт SSH.
4. **User** - Пользователь (должен быть root или иметь права sudo).
5. **Private key** - Выберите ключ, созданный на [Шаге 1](#_1-создание-приватного-ssh-ключа).
6. Нажмите **Continue**.

## 4. Валидация вашего сервера в Coolify

Нажмите кнопку **Validate Server & Install Docker Engine**.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/automated-5.webp" />

Coolify подключится к серверу и настроит всё необходимое. После завершения страница сервера будет выглядеть так:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/automated-6.webp" />

## 5. Создание Cloudflare Tunnel

Войдите в Cloudflare и перейдите на страницу [Zero Trust](https://one.dash.cloudflare.com/).

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/automated-7.webp" />

1. Перейдите в **Networks** > **Tunnels**.
2. Нажмите **Add a tunnel**.
3. Выберите **Select Cloudflared**.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/automated-8.webp" />

Введите название туннеля.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/automated-9.webp" />

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/automated-10.webp" />

Скопируйте команду установки, а точнее только токен из неё (начинается с «eyJ»).

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/automated-11.webp" />

Нажмите **Next**. Добавьте имя хоста (hostname) для SSH.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/automated-12.webp" />

1. **Subdomain** - Укажите поддомен (например, **ssh**).
2. **Domain** - Выберите ваш домен.
3. **Type** - Выберите **SSH** (очень важно).
4. **URL** - Введите **localhost:22** (или ваш порт SSH).
5. Нажмите **Save Tunnel**.

## 6. Настройка Cloudflare Tunnel в Coolify

Вернитесь в Coolify:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/automated-13.webp" />

Перейдите на страницу сервера, который хотите подключить через туннель:

1. Нажмите на **Cloudflare Tunnels**.
2. Нажмите кнопку **Automated**.

Укажите токен и домен:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/automated-14.webp" />

1. Введите **Tunnel Token**.
2. Введите **SSH Domain** (хостнейм из [Шага 5](#_5-создание-cloudflare-tunnel)).
3. Нажмите **Continue**.

Coolify установит cloudflared и настроит соединение. Это займет около минуты. После завершения статус туннеля обновится:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/automated-15.webp" />

IP-адрес сервера в Coolify автоматически изменится на домен туннеля.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/automated-16.webp" />

Теперь вы можете закрыть порт SSH на сервере для внешних IP (файрволом).

**Поздравляем**! Вы настроили доступ к серверу через туннель.

---

## Ручная настройка

Для ручной настройки:

- Вам нужен доступ к терминалу удаленного сервера (публичный IP не обязателен).
- Вам нужен домен в Cloudflare.

### Быстрые ссылки:

- [Создание приватного SSH ключа](#_1-создание-приватного-ssh-ключа-1)
- [Добавление публичного ключа на сервер](#_2-добавление-публичного-ключа-на-сервер-1)
- [Создание Cloudflare Tunnel](#_3-создание-cloudflare-tunnel-1)
- [Добавление сервера в Coolify](#_4-добавление-вашего-сервера-в-coolify-1)
- [Валидация сервера в Coolify](#_5-валидация-вашего-сервера-в-coolify-1)
- [Настройка Cloudflare Tunnel в Coolify](#_6-настройка-cloudflare-tunnel-в-coolify-1)

---

## 1. Создание приватного SSH ключа
(Процесс идентичен шагу 1 автоматической настройки)

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/manual-1.webp" />
<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/manual-2.webp" />

## 2. Добавление публичного ключа на сервер

Подключитесь к серверу. Он может быть за NAT или в локальной сети без внешнего IP.
Добавьте ключ в `~/.ssh/authorized_keys`.

## 3. Создание Cloudflare Tunnel

Выполните шаги по созданию туннеля в дашборде Zero Trust.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/manual-3.webp" />
<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/manual-4.webp" />
<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/manual-5.webp" />

Выберите способ установки cloudflared и следуйте инструкциям в дашборде Cloudflare.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/manual-6.webp" />
<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/manual-7.webp" />

Дождитесь появления коннектора в списке и нажмите **Next**. Настройте hostname:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/manual-8.webp" />
- **Service Type**: SSH.
- **URL**: localhost:22.

## 4. Добавление вашего сервера в Coolify

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/manual-9.webp" />
<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/manual-10.webp" />

В поле **IP Address/Domain** введите домен туннеля (тот, что указали на предыдущем шаге).

## 5. Валидация вашего сервера в Coolify

Нажмите **Validate Server & Install Docker Engine**.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/manual-11.webp" />
<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/manual-12.webp" />

## 6. Настройка Cloudflare Tunnel в Coolify

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/manual-13.webp" />

Зайдите в настройки сервера > **Cloudflare Tunnels** и нажмите **Manual**. Это подтвердит, что сервер использует туннель.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/server-ssh/manual-14.webp" />
 Готово!
