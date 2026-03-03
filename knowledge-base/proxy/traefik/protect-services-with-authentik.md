---
title: "Middleware Authentik Forward Auth"
description: "Защитите сервисы Coolify с помощью forward-аутентификации Authentik SSO, используя middleware Traefik для реализации единого входа (SSO) через Proxy Provider."
---

# Middleware Authentik Forward Authentication
Traefik позволяет защитить ваши приложения с помощью аутентификации, используя [Proxy Provider](https://docs.goauthentik.io/docs/add-secure-apps/providers/proxy/) от Authentik.
Это дает возможность добавить полноценную систему единого входа (SSO) для ваших сервисов.

## Настройка приложения и Proxy Provider в Authentik

Первым делом необходимо развернуть [сервис Authentik](/services/authentik), а затем настроить нужные компоненты:

- Создайте **Proxy Provider** с типом аутентификации `forward authentication`.
- Создайте приложение (application) и привяжите к нему созданный Proxy Provider.
- В поле "Cookie Domain" укажите домен ваших сервисов.

## Настройка конфигурации Traefik

Следующий шаг — добавить middleware Traefik в динамическую конфигурацию вашего инстанса.

Замените `AUTHENTIK_SERVER_HOST` на хост вашего сервера Authentik (например, `authentik-server-ncoc0ooog0ckwc0gwgoocgs8`).

```yaml
http:
  middlewares:
    authentik-auth:
      forwardAuth:
        address: 'http://AUTHENTIK_SERVER_HOST:9000/outpost.goauthentik.io/auth/traefik'
        trustForwardHeader: true
        authResponseHeaders:
          - X-authentik-username
          - X-authentik-groups
          - X-authentik-entitlements
          - X-authentik-email
          - X-authentik-name
          - X-authentik-uid
          - X-authentik-jwt
          - X-authentik-meta-jwks
          - X-authentik-meta-outpost
          - X-authentik-meta-provider
          - X-authentik-meta-app
          - X-authentik-meta-version
```

## Защита сервисов

Чтобы защитить конкретный сервис, добавьте метку (label) middleware Traefik в конфигурацию Docker Compose этого контейнера:

```yaml
services:
  privatebin:
    image: privatebin/nginx-fpm-alpine
    environment:
      - SERVICE_FQDN_PRIVATEBIN_8080
    volumes:
      - 'privatebin_data:/srv/data'
    healthcheck:
      test:
        - CMD-SHELL
        - 'wget -qO- http://127.0.0.1:8080/'
      interval: 5s
      timeout: 20s
      retries: 10
    labels:
      - traefik.http.middlewares.authentik-auth@file
```