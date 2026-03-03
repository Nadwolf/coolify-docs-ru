---
title: "Перенаправления (Redirects)"
description: "Настраивайте редиректы URL в Traefik через Coolify: с www на без-www, переадресация доменов и редиректы на HTTPS для приложений и сервисов."
---

# Перенаправления (Redirects) в Traefik

Это руководство поможет вам настроить редиректы в Coolify с использованием Traefik.

Конфигурация немного отличается для `Стандартных приложений` и приложений на базе `Docker Compose` / сервисов в один клик.

## Стандартные приложения

- Вам необходимо указать оба FQDN для вашего ресурса, например: `coolify.io,www.coolify.io`.
- Добавьте уникальный middleware к вашему ресурсу.

### www -> без-www (non-www)

```bash
# Подобная строка уже определена автоматически.
traefik.http.routers.<unique_router_name>.rule=Host(`www.coolify.io`) && PathPrefix(`/`)

# Вам нужно добавить middleware к роутеру.
traefik.http.routers.<unique_router_name>.middlewares=example-middleware

# Если у вас несколько middleware, перечислите их через запятую.
# traefik.http.routers.<unique_router_name>.middlewares=gzip,example-middleware
#
traefik.http.middlewares.example-middleware.redirectregex.regex=^(http|https)://www\.(.+)
traefik.http.middlewares.example-middleware.redirectregex.replacement=${1}://${2}
traefik.http.middlewares.example-middleware.redirectregex.permanent=true
```

### без-www (non-www) -> www

```bash
# Подобная строка уже определена автоматически.
traefik.http.routers.<unique_router_name>.rule=Host(`coolify.io`) && PathPrefix(`/`)

# Вам нужно добавить middleware к роутеру.
traefik.http.routers.<unique_router_name>.middlewares=example-middleware

# Если у вас несколько middleware, перечислите их через запятую.
# traefik.http.routers.<unique_router_name>.middlewares=gzip,example-middleware
#
traefik.http.middlewares.example-middleware.redirectregex.regex=^(http|https)://(?:www\.)?(.+)
traefik.http.middlewares.example-middleware.redirectregex.replacement=${1}://www.${2}
traefik.http.middlewares.example-middleware.redirectregex.permanent=true
```

### домен -> другой домен

```bash
traefik.http.middlewares.redirect-otherdomain.redirectregex.regex=^(https?://)?source-domain\.com(.*)
traefik.http.middlewares.redirect-otherdomain.redirectregex.replacement=https://target-domain.com${2}
traefik.http.middlewares.redirect-otherdomain.redirectregex.permanent=true
```

Если вам также нужно сгенерировать SSL-сертификат для целевого домена (`target-domain`), добавьте дополнительную запись для роутера:

```bash
traefik.http.routers.redirect-otherdomain.middlewares=redirect-to-https,redirect-otherdomain
traefik.http.routers.redirect-otherdomain.rule=Host(`target-domain.com`) && PathPrefix(`/`)
traefik.http.routers.redirect-otherdomain.entryPoints=https
traefik.http.routers.redirect-otherdomain.tls.certresolver=letsencrypt
traefik.http.routers.redirect-otherdomain.tls=true
```

## Приложения на базе Docker Compose и сервисы

- Вам необходимо указать оба FQDN для вашего ресурса, например: `coolify.io,www.coolify.io`.
- Вам нужно только добавить метку middleware к роутеру.

### www -> без-www (non-www)

```bash
traefik.http.middlewares.example-middleware.redirectregex.regex=^(http|https)://www\.(.+)
traefik.http.middlewares.example-middleware.redirectregex.replacement=${1}://${2}
traefik.http.middlewares.example-middleware.redirectregex.permanent=true
```

### без-www (non-www) -> www

```bash
traefik.http.middlewares.example-middleware.redirectregex.regex=^(http|https)://(?:www\.)?(.+)
traefik.http.middlewares.example-middleware.redirectregex.replacement=${1}://www.${2}
traefik.http.middlewares.example-middleware.redirectregex.permanent=true
```

## Отладка

Вы можете проверить, правильно ли применены настройки Traefik, проинспектировав целевой Docker-контейнер.

Найдите ID контейнера:
```bash
docker ps
```

Проверьте метки (labels) контейнера:

```bash
docker inspect <container-id>
```

Вы также можете проверить логи контейнера `coolify-proxy`:

```bash
docker logs -f coolify-proxy
```
