---
title: "Балансировка нагрузки"
description: "Настраивайте балансировку нагрузки Traefik в Coolify между несколькими серверами или контейнерами с использованием динамической конфигурации, подлержкой HTTPS и мониторингом состояния."
---

# Балансировка нагрузки
Вы можете легко настроить Traefik для балансировки трафика вашего приложения между:

- 2 и более серверами
- 2 и более контейнерами на одном сервере

## Несколько серверов (2+ servers)

### Предварительные условия

1. Убедитесь, что для вашего домена создана правильная DNS-запись. Домен должен указывать на IP-адрес сервера, где вы настраиваете балансировщик.
2. Ваше приложение должно быть развернуто на нескольких серверах: подробнее [здесь](/knowledge-base/server/multiple-servers).
3. Убедитесь, что Traefik запущен на всех серверах.
4. Укажите нужный `fqdn` для доступа к приложению.
5. После деплоя на все серверы необходимо создать динамическую конфигурацию для Traefik в директории `/data/coolify/proxy/dynamic`.

### Динамическая конфигурация

В интерфейсе Coolify перейдите в настройки сервера (Server settings) во вкладку Proxy, там можно добавить динамическую конфигурацию.

Приведенная ниже конфигурация актуальна для использования **https**.

```yaml {16,26,32,33}
http:
  middlewares:
    redirect-to-https:
      redirectscheme:
        scheme: https
    gzip:
      compress: true
  routers:
    lb-http:
      middlewares:
        - redirect-to-https
      entryPoints:
        - http
      service: noop
      # Замените <CHANGE_THIS_TO_YOUR_DOMAIN> на ваш домен, например `example.com` (без https://)
      rule: Host(`<CHANGE_THIS_TO_YOUR_DOMAIN>`)
    lb-https:
      middlewares:
        - gzip
      entryPoints:
        - https
      service: lb-https
      tls:
        certResolver: letsencrypt
      # Замените <CHANGE_THIS_TO_YOUR_DOMAIN> на ваш домен, например `example.com` (без https://)
      rule: Host(`<CHANGE_THIS_TO_YOUR_DOMAIN>`)
  services:
    lb-https:
      loadBalancer:
        servers:
          # Замените <CHANGE_THIS_TO_YOUR_IP_ADDRESS> на IP-адреса ваших серверов
          - url: 'http://<CHANGE_THIS_TO_YOUR_IP_ADDRESS>'
          - url: 'http://<CHANGE_THIS_TO_YOUR_IP_ADDRESS>'
          # Можно добавить любое количество серверов
    noop:
      loadBalancer:
        servers:
          - url: ''
```

Конфигурация ниже актуальна для использования **http**.

```yaml {13,19,20}
http:
  middlewares:
    gzip:
      compress: true
  routers:
    lb-http:
      middlewares:
        - gzip
      entryPoints:
        - http
      service: lb-http
      # Замените <CHANGE_THIS_TO_YOUR_DOMAIN> на ваш домен, например `example.com` (без http://)
      rule: Host(`<CHANGE_THIS_TO_YOUR_DOMAIN>`)
  services:
    lb-http:
      loadBalancer:
        servers:
          # Замените <CHANGE_THIS_TO_YOUR_IP_ADDRESS> на IP-адреса ваших серверов
          - url: 'http://<CHANGE_THIS_TO_YOUR_IP_ADDRESS>'
          - url: 'http://<CHANGE_THIS_TO_YOUR_IP_ADDRESS>'
          # Можно добавить любое количество серверов
```

## Несколько контейнеров на одном сервере (2+ containers)

### Предварительные условия

1. Убедитесь, что DNS-запись домена указывает на сервер.
2. Разверните приложение в нескольких контейнерах на одном сервере.
3. Убедитесь, что Traefik запущен на сервере.

### Динамическая конфигурация

Конфигурация для использования **https**.

```yaml {18,26,34,35}
http:
  middlewares:
    redirect-to-https:
      redirectscheme:
        scheme: https
    gzip:
      compress: true
  routers:
    lb-https:
      tls:
        certResolver: letsencrypt
      middlewares:
        - gzip
      entryPoints:
        - https
      service: lb-https
      # Замените <CHANGE_THIS_TO_YOUR_DOMAIN> на ваш домен, например `example.com` (без http://)
      rule: Host(`<CHANGE_THIS_TO_YOUR_DOMAIN>`)
    lb-http:
      middlewares:
        - redirect-to-https
      entryPoints:
        - http
      service: noop
      # Замените <CHANGE_THIS_TO_YOUR_DOMAIN> на ваш домен, например `example.com` (без http://)
      rule: Host(`<CHANGE_THIS_TO_YOUR_DOMAIN>`)
  services:
    lb-https:
      loadBalancer:
        servers:
          # Замените <UUID_OR_HOST.DOCKER.INTERNAL>:<PORT> на UUID контейнера или host.docker.internal и порт
          # UUID используется, если порт проброшен на хост-систему
          # host.docker.internal используется, если порт не проброшен наружу
          - url: 'http://<UUID_OR_HOST.DOCKER.INTERNAL>:<PORT>'
          - url: 'http://<UUID_OR_HOST.DOCKER.INTERNAL>:<PORT>'
          # Добавьте нужное количество контейнеров
    noop:
      loadBalancer:
        servers:
          - url: ''
```

Конфигурация для использования **http**.

```yaml {13,21,22}
http:
  middlewares:
    gzip:
      compress: true
  routers:
    lb-http:
      middlewares:
        - gzip
      entryPoints:
        - http
      service: lb-http
      # Замените <CHANGE_THIS_TO_YOUR_DOMAIN> на ваш домен, например `example.com` (без http://)
      rule: Host(`<CHANGE_THIS_TO_YOUR_DOMAIN>`)
  services:
    lb-http:
      loadBalancer:
        servers:
          # Замените <UUID_OR_HOST.DOCKER.INTERNAL>:<PORT> на данные ваших контейнеров
          - url: 'http://<UUID_OR_HOST.DOCKER.INTERNAL>:<PORT>'
          - url: 'http://<UUID_OR_HOST.DOCKER.INTERNAL>:<PORT>'
```
