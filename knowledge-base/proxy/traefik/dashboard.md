---
title: "Включение дашборда"
description: "Включите и защитите дашборд Traefik в Coolify с помощью базовой аутентификации, динамической конфигурации, Let's Encrypt SSL и доступа по кастомному домену."
---

# Дашборд Traefik
По умолчанию дашборд (панель управления) Traefik включен в защищенном режиме, но не настроен для доступа из интернета.

Чтобы открыть к нему доступ извне, необходимо добавить динамическую конфигурацию и защитить её логином и паролем.

## Защищенный режим (через динамическую конфигурацию)

::: info Совет
  Как настроить динамическую конфигурацию Traefik? [Подробнее здесь](/knowledge-base/proxy/traefik/dynamic-config)
:::

Вы можете включить дашборд Traefik, добавив следующую динамическую конфигурацию:

```yaml
http:
  middlewares:
    auth:
      basicAuth:
        users:
          - "<СГЕНЕРИРОВАННЫЙ_ЛОГИН>:<СГЕНЕРИРОВАННЫЙ_ХЕШ_ПАРОЛЯ>"
    redirect-to-https:
      redirectScheme:
        scheme: https

  routers:
    dashboard-http:
      rule: Host(`<ВАШ_ДОМЕН_ДЛЯ_TRAEFIK>`) && (PathPrefix(`/dashboard`) || PathPrefix(`/api`))
      entryPoints:
        - http
      service: api@internal
      middlewares:
        - redirect-to-https

    dashboard-https:
      rule: Host(`<ВАШ_ДОМЕН_ДЛЯ_TRAEFIK>`) && (PathPrefix(`/dashboard`) || PathPrefix(`/api`))
      entryPoints:
        - https
      service: api@internal
      tls:
        certResolver: letsencrypt
      middlewares:
        - auth
```

Замените `<ВАШ_ДОМЕН_ДЛЯ_TRAEFIK>`, `<СГЕНЕРИРОВАННЫЙ_ЛОГИН>` и `<СГЕНЕРИРОВАННЫЙ_ХЕШ_ПАРОЛЯ>` на ваши значения.

Дашборд будет доступен по адресу: `https://<ВАШ_ДОМЕН_ДЛЯ_TRAEFIK>/dashboard/#/`.

### Как сгенерировать логин/пароль?
Это можно сделать с помощью команды [htpasswd](https://httpd.apache.org/docs/current/programs/htpasswd.html):

```bash
htpasswd -nbB test test
```

Пример вывода:

```bash
test:$apr1$H6uskkkW$IgXLP6ewTrSuBkTrqE8wj/
```

## Незащищенный режим (Не рекомендуется)
Если вы хотите включить дашборд без пароля, перейдите в настройки прокси, установите параметр `insecure` в значение `true` и перезапустите прокси.

```yaml
- '--api.insecure=true'
```
