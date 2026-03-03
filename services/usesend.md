---
title: Usesend
description: "useSend — это альтернатива с открытым исходным кодом для Resend, Sendgrid, Mailgun, Postmark и др."
---

# Usesend

<ZoomableImage src="/docs/images/services/usesend-logo.svg" alt="Логотип Usesend" />

## Что такое Usesend

Usesend — это альтернатива с открытым исходным кодом для Resend, Sendgrid, Mailgun, Postmark и т. д. Ранее была известна под названием unsend.

Требуется выполнить некоторую настройку; пожалуйста, обратитесь к [официальной документации](https://docs.usesend.com/self-hosting/overview?utm_source=coolify.io) для получения дополнительной информации.

## Скриншоты

<ZoomableImage src="/docs/images/services/usesend-screenshot.webp" alt="Скриншот Usesend" />

## Настройка SMTP

Запуск Usesend с поддержкой SMTP требует дополнительного компонента relay (ретранслятора) для обработки входящих запросов SMTP. Этот ретранслятор привязывается к нескольким портам, поддерживающим соединения SSL и TLS.

### Предварительные условия

Перед настройкой SMTP relay вам необходимо добавить certificate dumper в конфигурацию вашего прокси-сервера Traefik, чтобы сделать SSL-сертификаты Coolify доступными для ретранслятора:

1. Перейдите в раздел **Server** → **Proxy** → **Configuration**
2. Добавьте следующую конфигурацию для дампа сертификатов:

```yaml
traefik-certs-dumper:
  image: ghcr.io/kereis/traefik-certs-dumper:latest
  container_name: traefik-certs-dumper
  restart: unless-stopped
  depends_on:
    - traefik
  volumes:
    - /etc/localtime:/etc/localtime:ro
    - /data/coolify/proxy:/traefik:ro
    - /data/coolify/certs:/output
```

Этот сервис извлекает управляемые Traefik-ом сертификаты и выводит их в папку `/data/coolify/certs/`, делая их доступными для использования SMTP-ретранслятором для соединений SSL и TLS.

### Добавление службы SMTP Relay

Добавьте следующую службу в конец вашего файла Compose (нажав на кнопку "Edit compose file" при добавлении службы):

:::info
Замените `###USESEND FQDN (e.g. usesend.example.com)###` в приведенной ниже конфигурации на ваш домен для unsend.
:::
```yaml
  smtp-server:
    container_name: usesend-smtp-server
    image: 'usesend/smtp-proxy:latest'
    volumes:
      - type: bind
        source: /data/coolify/certs/###USESEND FQDN (e.g. usesend.example.com)###/key.pem
        target: /data/certs/key.pem
        read_only: true
      - type: bind
        source: /data/coolify/certs/###USESEND FQDN (e.g. usesend.example.com)###/cert.pem
        target: /data/certs/cert.pem
        read_only: true
    environment:
      - SMTP_AUTH_USERNAME=usesend
      - SERVICE_FQDN_SMTP
      - 'USESEND_BASE_URL=${SERVICE_URL_USESEND_3000}'
      - USESEND_API_KEY_PATH=/data/certs/key.pem
      - USESEND_API_CERT_PATH=/data/certs/cert.pem
    ports:
      - '25:25'
      - '587:587'
      - '2587:2587'
      - '465:465'
      - '2465:2465'
    healthcheck:
      test:
        - CMD
        - nc
        - -z
        - localhost
        - "25"
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s
```

Затем добавьте эти переменные окружения в основной сервис Usesend:

```yaml
      - SMTP_HOST=${SERVICE_FQDN_SMTP}
      - SMTP_USER=${SMTP_AUTH_USERNAME}
```

### Использование Usesend SMTP в ваших приложениях

Как только ретранслятор будет развернут, настройте свои приложения для отправки со следующими параметрами:

- **SMTP Host**: Ваш URL-адрес Usesend
- **SMTP Port**: 465 (SSL) или 587 (TLS/STARTTLS)
- **Username**: `usesend`
- **Password**: Ваш API-ключ Usesend (сгенерированный в дашборде Usesend)

Ретранслятор поддерживает несколько портов для совместимости с различными приложениями:
- **Стандартный SMTP**: порты 25, 587, 2587
- **SSL/TLS**: порты 465, 2465

Вы можете убедиться, что электронные письма успешно отправляются, через отчеты о доставке и предварительный просмотр сообщений в дашборде Usesend.

## Ссылки

- [Официальная документация](https://docs.usesend.com/self-hosting/overview?utm_source=coolify.io)
- [Официальный сайт ↗](https://usesend.com?utm_source=coolify.io)
- [GitHub ↗](https://github.com/usesend/usesend)
