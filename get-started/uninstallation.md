---
title: Удаление Coolify
description: Полностью удалите Coolify со своего self-hosted сервера, остановив контейнеры и удалив тома, сети, директории данных и Docker-образы.
---

<ZoomableImage src="/docs/images/get-started/uninstallation-banner.webp" alt="Coolify uninstallation banner" />

<br />

Если вы используете [Coolify Cloud](https://coolify.io/pricing/), вам не нужно удалять Coolify, так как команда Coolify управляет всем на своих серверах.

Чтобы прекратить использование Coolify Cloud, просто перейдите на [страницу оплаты](https://app.coolify.io/subscription/) и отмените подписку.

Для тех, кто использует **self-host** версию Coolify и желает удалить её со своего сервера, следуйте приведенным ниже шагам для безопасного удаления:

- [Остановка и удаление контейнеров](#_1-остановка-и-удаление-контейнеров)
- [Удаление томов Docker](#_2-удаление-томов-docker)
- [Удаление сети Docker](#_3-удаление-сети-docker)
- [Удаление директории данных Coolify](#_4-удаление-директории-данных-coolify)
- [Удаление образов Docker](#_5-удаление-образов-docker)

## 1. Остановка и удаление контейнеров

Остановите все Docker-контейнеры, связанные с Coolify, и удалите их, чтобы освободить системные ресурсы.

Выполните следующие команды в терминале:

```sh
sudo docker stop -t 0 coolify coolify-realtime coolify-db coolify-redis coolify-proxy coolify-sentinel
sudo docker rm coolify coolify-realtime coolify-db coolify-redis coolify-proxy coolify-sentinel
```

Флаг `-t 0` гарантирует немедленную остановку контейнеров без ожидания таймаута.

## 2. Удаление томов Docker

Чтобы удалить постоянные данные, хранящиеся в томах (volumes) Docker для Coolify, выполните:

```sh
sudo docker volume rm coolify-db coolify-redis
```

::: danger ВНИМАНИЕ!!
Удаление томов навсегда удалит все хранящиеся в них данные. Убедитесь, что у вас есть резервные копии, если они вам нужны.
:::

## 3. Удаление сети Docker

Coolify использует специальную сеть Docker под названием `coolify`. Удалите её с помощью следующей команды:

```sh
sudo docker network rm coolify
```

::: info Информация
Если вы столкнетесь с ошибкой, указывающей на то, что сеть используется, убедитесь, что никакие контейнеры не используют эту сеть, прежде чем повторить попытку.
:::

## 4. Удаление директории данных Coolify

Удалите директорию, в которой Coolify хранит свои данные на вашем сервере:

```sh
  sudo rm -rf /data/coolify
```

::: danger ВНИМАНИЕ!
Это действие навсегда удалит все данные, связанные с Coolify. Дважды проверьте путь к директории перед выполнением этой команды.
:::

## 5. Удаление образов Docker

Чтобы освободить место на диске, удалите все Docker-образы, используемые Coolify, выполнив следующие команды:

```sh
sudo docker rmi ghcr.io/coollabsio/coolify:latest
sudo docker rmi ghcr.io/coollabsio/coolify-helper:latest
sudo docker rmi quay.io/soketi/soketi:1.6-16-alpine
sudo docker rmi postgres:15-alpine
sudo docker rmi redis:alpine
```

Если вы использовали прокси по умолчанию, также удалите его образ:

```sh
sudo docker rmi traefik:v3.1
```

Если вы переключились на прокси Caddy, удалите этот образ вместо него:

```sh
sudo docker rmi lucaslorentz/caddy-docker-proxy:2.8-alpine
```

---

### Coolify успешно удалена

После выполнения этих шагов Coolify и все связанные с ней ресурсы будут полностью удалены с вашего сервера.
