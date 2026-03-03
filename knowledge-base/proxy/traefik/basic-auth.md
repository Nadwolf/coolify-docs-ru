---
title: "Middleware Basic Auth"
description: "Защитите приложения и сервисы Coolify с помощью middleware базовой аутентификации Traefik, используя учетные данные htpasswd для стандартных развертываний и Docker Compose."
---

# Middleware Basic Auth (Базовая аутентификация)
Конфигурация немного отличается для [`стандартных приложений`](#стандартные-приложения) и [`приложений на базе Docker Compose / сервисов в один клик`](#docker-compose-и-сервисы).

## Стандартные приложения

```bash
traefik.http.middlewares.<random_unique_name>.basicauth.users=test:$2y$12$ci.4U63YX83CwkyUrjqxAucnmi2xXOIlEF6T/KdP9824f1Rf1iyNG
traefik.http.routers.<unique_router_name>.middlewares=<random_unique_name>
```

В примере выше в качестве имени пользователя используется `test`, а в качестве пароля — `test`.

::: info
Скорее всего, у вас уже есть метка (label) `traefik.http.middlewares`. В этом случае вам нужно добавить ваше уникальное имя middleware (`random_unique_name`) к существующему значению через запятую.
Например:

  ```bash
  traefik.http.routers.<unique_router_name>.middlewares=gzip,<random_unique_name>
  ```
:::

Примечание: `<random_unique_name>` и `<unique_router_name>` — это заполнители. Вам нужно заменить их реальными значениями.
`<random_unique_name>` — это любое уникальное имя для middleware, которое вы придумываете сами. `<unique_router_name>` — это уникальное имя роутера, которое Coolify уже сгенерировал для вас.

### Пример с простым контейнером nginx

Допустим, у вас есть простой веб-контейнер nginx, созданный в Coolify с таким Dockerfile:
```Dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
```

Метки контейнера (`Container Labels`), сгенерированные Coolify, будут выглядеть примерно так:

```bash
traefik.enable=true
traefik.http.middlewares.gzip.compress=true
traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https
traefik.http.routers.http-0-wc04wo4ow4scokgsw8wow4s8.entryPoints=http
traefik.http.routers.http-0-wc04wo4ow4scokgsw8wow4s8.middlewares=redirect-to-https
traefik.http.routers.http-0-wc04wo4ow4scokgsw8wow4s8.rule=Host(`nginxsite.mysite.com`) && PathPrefix(`/`)
traefik.http.routers.http-0-wc04wo4ow4scokgsw8wow4s8.service=http-0-wc04wo4ow4scokgsw8wow4s8
traefik.http.routers.https-0-wc04wo4ow4scokgsw8wow4s8.entryPoints=https
traefik.http.routers.https-0-wc04wo4ow4scokgsw8wow4s8.middlewares=gzip
traefik.http.routers.https-0-wc04wo4ow4scokgsw8wow4s8.rule=Host(`nginxsite.mysite.com`) && PathPrefix(`/`)
traefik.http.routers.https-0-wc04wo4ow4scokgsw8wow4s8.service=https-0-wc04wo4ow4scokgsw8wow4s8
traefik.http.routers.https-0-wc04wo4ow4scokgsw8wow4s8.tls.certresolver=letsencrypt
traefik.http.routers.https-0-wc04wo4ow4scokgsw8wow4s8.tls=true
traefik.http.services.http-0-wc04wo4ow4scokgsw8wow4s8.loadbalancer.server.port=80
traefik.http.services.https-0-wc04wo4ow4scokgsw8wow4s8.loadbalancer.server.port=80
caddy_0.encode=zstd gzip
caddy_0.handle_path.0_reverse_proxy={{upstreams 80}}
caddy_0.handle_path=/*
caddy_0.header=-Server
caddy_0.try_files={path} /index.html /index.php
caddy_0=https://nginxsite.73rdst.com
caddy_ingress_network=coolify
```

Если вы хотите добавить базовую аутентификацию и назвать middleware `mybasicauth`, добавьте следующую метку под первой строкой `traefik.enable=true`:

`traefik.http.middlewares.mybasicauth.basicauth.users=test:$2y$12$ci.4U63YX83CwkyUrjqxAucnmi2xXOIlEF6T/KdP9824f1Rf1iyNG`

Здесь `mybasicauth` заменяет заполнитель `<random_unique_name>`. То есть вы сами дали имя этому правилу.

Затем добавьте это имя в список middleware роутера. Поскольку там уже есть `gzip`, добавьте новое имя через запятую.

Обновите строку:

`traefik.http.routers.https-0-wc04wo4ow4scokgsw8wow4s8.middlewares=gzip`

на:

`traefik.http.routers.https-0-wc04wo4ow4scokgsw8wow4s8.middlewares=gzip,mybasicauth`

В данном случае `<unique_router_name>` заменен на `https-0-wc04wo4ow4scokgsw8wow4s8` (имя, сгенерированное Coolify). Теперь ваш сайт защищен паролем.

## Docker Compose и сервисы

Чтобы добавить middleware `basicauth` в ваш сервис, добавьте следующие метки в файл `docker-compose.yml`:

```yaml
services:
  nginx-simple-web-container::
    image: 'nginx:alpine'
    ports:
      - '8080:80'
    labels:
      - 'traefik.http.middlewares.<random_unique_name>.basicauth.users=test:$2y$12$ci.4U63YX83CwkyUrjqxAucnmi2xXOIlEF6T/KdP9824f1Rf1iyNG'
```

Замените `<random_unique_name>` на ваше имя. Если вы выберете `mybasicauth`, метка будет выглядеть так:

```yaml
labels:
  - 'traefik.http.middlewares.mybasicauth.basicauth.users=test:$2y$12$ci.4U63YX83CwkyUrjqxAucnmi2xXOIlEF6T/KdP9824f1Rf1iyNG'
```

Теперь контейнер защищен логином `test` и паролем `test`.

Примечание: При использовании меток базовой аутентификации спецсимволы, такие как `$`, `@` и `,`, должны быть экранированы, чтобы избежать ошибок парсинга. Например, заключайте значения меток в кавычки и используйте обратную косую черту `\` перед спецсимволами, если используете двойные кавычки.

## Как сгенерировать логин/пароль?

Вам нужно указать пару имя_пользователя:хеш_пароля в метке `basicauth.users`.

Это можно сделать с помощью команды [htpasswd](https://httpd.apache.org/docs/current/programs/htpasswd.html):

```bash
htpasswd -nbB test test
```

Эта команда сгенерирует хеш для пользователя `test` с паролем `test`.
Вы можете заменить `test` на нужные вам данные и вставить полученный результат в метку `basicauth.users`.

Примечание: команда `htpasswd` доступна в большинстве дистрибутивов Linux. В Debian/Ubuntu она входит в пакет `apache2-utils`. Подробности можно найти [здесь](https://httpd.apache.org/docs/current/programs/htpasswd.html).
