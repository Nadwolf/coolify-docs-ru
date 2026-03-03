---
title: "Wildcard SSL-сертификаты"
description: "Настраивайте Wildcard SSL-сертификаты Let's Encrypt через DNS challenge в Traefik с использованием Cloudflare, Hetzner или других провайдеров для автоматической защиты всех поддоменов."
---

# Настройка Wildcard SSL-сертификатов в Traefik

## Предварительные требования

- У вас должен быть домен и DNS-провайдер, поддерживающий поддомены-джокеры (wildcard subdomains).
- Для получения wildcard-сертификатов от Let's Encrypt необходимо использовать [dnsChallenge](https://doc.traefik.io/traefik/https/acme/#dnschallenge) в Traefik.
- Вы должны использовать одного из поддерживаемых DNS-[провайдеров](https://go-acme.github.io/lego/dns/index.html#dns-providers).

::: tip Совет
Для каждого провайдера требуются свои переменные окружения в конфигурации Traefik. Список необходимых переменных можно найти в [официальной документации](https://go-acme.github.io/lego/dns/index.html#dns-providers).

Если вам нужен специфический токен (например, для [Cloudflare](https://go-acme.github.io/lego/dns/cloudflare/)), проверьте настройки провайдера.
:::

## Конфигурация

1. Создайте DNS-запись для wildcard-поддомена: `*.coolify.io`.
2. Перейдите в настройки прокси (меню Servers / Proxy) и добавьте конфигурацию в зависимости от вашего [провайдера](https://doc.traefik.io/traefik/https/acme/#providers). В примере ниже используется `Hetzner`.

```bash
version: '3.8'
networks:
  coolify:
    external: true
services:
  traefik:
    container_name: coolify-proxy
    image: 'traefik:v3.6'
    restart: unless-stopped
    environment:
      - HETZNER_API_TOKEN=<Ваш API Токен>
    extra_hosts:
      - 'host.docker.internal:host-gateway'
    networks:
      - coolify
    ports:
      - '80:80'
      - '443:443'
      - '8080:8080'
    healthcheck:
      test: 'wget -qO- http://localhost:80/ping || exit 1'
      interval: 4s
      timeout: 2s
      retries: 5
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock:ro'
      - '/data/coolify/proxy:/traefik'
    command:
      - '--ping=true'
      - '--ping.entrypoint=http'
      - '--api.dashboard=true'
      - '--api.insecure=false'
      - '--entrypoints.http.address=:80'
      - '--entrypoints.https.address=:443'
      - '--entrypoints.http.http.encodequerysemicolons=true'
      - '--entrypoints.https.http.encodequerysemicolons=true'
      - '--providers.docker.exposedbydefault=false'
      - '--providers.file.directory=/traefik/dynamic/'
      - '--providers.file.watch=true'
      # используем dnschallenge вместо httpchallenge
      # - '--certificatesresolvers.letsencrypt.acme.httpchallenge=true'
      # - '--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=http'
      - '--certificatesresolvers.letsencrypt.acme.dnschallenge.provider=hetzner'
      - '--certificatesresolvers.letsencrypt.acme.dnschallenge.delaybeforecheck=0'
      - '--certificatesresolvers.letsencrypt.acme.storage=/traefik/acme.json'
      - '--providers.docker=true'
    labels:
      - traefik.enable=true
      - traefik.http.routers.traefik.entrypoints=http
      - traefik.http.routers.traefik.middlewares=traefik-basic-auth@file
      - traefik.http.routers.traefik.service=api@internal
      - traefik.http.routers.traefik.tls.certresolver=letsencrypt
      - traefik.http.routers.traefik.tls.domains[0].main=coolify.io
      - traefik.http.routers.traefik.tls.domains[0].sans=*.coolify.io
      - traefik.http.services.traefik.loadbalancer.server.port=8080
      - traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https
      - traefik.http.middlewares.gzip.compress=true
```

> Вы также можете использовать `env_file` вместо `environment`, но в этом случае вам нужно будет создать файл `.env` с переменной `HETZNER_API_TOKEN` на сервере.

> Замените параметр `--certificatesresolvers.letsencrypt.acme.dnschallenge.provider=hetzner` на имя вашего провайдера.

Теперь у вас есть два варианта настройки wildcard-поддоменов для ваших ресурсов.

### Обычный режим (Normal)

Используйте этот вариант, если хотите использовать один (wildcard) сертификат для всех ваших ресурсов.

Это удобно, так как Traefik не нужно генерировать новый сертификат для каждого ресурса. Новые деплои станут доступны мгновенно без ожидания выдачи сертификата.

- В приложении укажите FQDN нужного поддомена, например: `https://example.coolify.io`.

```bash
traefik.enable=true
traefik.http.routers.<unique_router_name_https>.rule=Host(`example.coolify.io`) && PathPrefix(`/`)
traefik.http.routers.<unique_router_name_https>.entryPoints=https
traefik.http.routers.<unique_router_name_https>.middlewares=gzip
traefik.http.routers.<unique_router_name_https>.service=<unique_service_name>
traefik.http.routers.<unique_router_name_https>.tls=true
traefik.http.services.<unique_service_name>.loadbalancer.server.port=80
traefik.http.routers.<unique_router_name_https>.tls.certresolver=letsencrypt

traefik.http.routers.<unique_router_name_http>.rule=Host(`example.coolify.io`) && PathPrefix(`/`)
traefik.http.routers.<unique_router_name_http>.entryPoints=http
traefik.http.routers.<unique_router_name_http>.middlewares=redirect-to-https
```

### SaaS режим

Перенаправление всех поддоменов на одно приложение. Используйте этот вариант, если хотите использовать Coolify как SaaS-провайдер.

- В приложении оставьте поле FQDN `пустым`.
- Добавьте следующие кастомные метки (labels):

:::tabs key:saas
== Traefik v3

```bash
traefik.enable=true
traefik.http.routers.<unique_router_name_https>.rule=HostRegexp(`^.+\.coolify\.io$`)
traefik.http.routers.<unique_router_name_https>.entryPoints=https
traefik.http.routers.<unique_router_name_https>.middlewares=gzip
traefik.http.routers.<unique_router_name_https>.service=<unique_service_name>
traefik.http.routers.<unique_router_name_https>.tls.certresolver=letsencrypt
traefik.http.services.<unique_service_name>.loadbalancer.server.port=80
traefik.http.routers.<unique_router_name_https>.tls=true

traefik.http.routers.<unique_router_name_http>.rule=HostRegexp(`^.+\.coolify\.io$`)
traefik.http.routers.<unique_router_name_http>.entryPoints=http
traefik.http.routers.<unique_router_name_http>.middlewares=redirect-to-https
```

== Traefik v2

```bash
traefik.enable=true
traefik.http.routers.<unique_router_name_https>.rule=HostRegexp(`{subdomain:[a-zA-Z0-9-]+}.coolify.io`)
traefik.http.routers.<unique_router_name_https>.entryPoints=https
traefik.http.routers.<unique_router_name_https>.middlewares=gzip
traefik.http.routers.<unique_router_name_https>.service=<unique_service_name>
traefik.http.routers.<unique_router_name_https>.tls.certresolver=letsencrypt
traefik.http.services.<unique_service_name>.loadbalancer.server.port=80
traefik.http.routers.<unique_router_name_https>.tls=true

traefik.http.routers.<unique_router_name_http>.rule=HostRegexp(`{subdomain:[a-zA-Z0-9-]+}.coolify.io`)
traefik.http.routers.<unique_router_name_http>.entryPoints=http
traefik.http.routers.<unique_router_name_http>.middlewares=redirect-to-https
```

:::

> Параметр `traefik.http.routers.<unique_router_name_https>.tls.certresolver` должен совпадать с именем вашего `certresolver` в конфигурации прокси Traefik (по умолчанию — `letsencrypt`).

> Параметр `traefik.http.services.<unique_service_name>.loadbalancer.server.port` должен соответствовать порту, который слушает ваше приложение (порт 80, если используется статический деплой).

::: warning Осторожно
Вы не можете использовать обе конфигурации (Normal и SaaS) одновременно на одном сервере.
:::
