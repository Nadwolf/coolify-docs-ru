---
title: SigNoz
description: "Платформа наблюдения (observability), нативная для OpenTelemetry, включающая логи, трассировки и метрики."
---

# SigNoz

<ZoomableImage src="/docs/images/services/signoz-logo.svg" alt="Логотип SigNoz" />

## Что такое SigNoz

SigNoz — это платформа наблюдения (observability) с открытым исходным кодом, нативная для OpenTelemetry, которая объединяет логи, трассировки (traces) и метрики.

## Настройка SigNoz

Следующие шаги помогут вам настроить SigNoz после создания сервиса в Coolify.

### Настройка URL-адресов

Поскольку SigNoz является комплексной платформой наблюдения, для её работы необходимо открыть несколько портов.
Первый — это URL пользовательского интерфейса (UI). Вы можете найти его в поле "Service URL" (URL сервиса) службы Signoz, например: `https://signoz.example.com:8080`

Затем вам нужно предоставить доступ к Otel Collector — службе, которая отвечает за получение трассировок, метрик и логов от ваших приложений и сервисов.
Она поддерживает множество различных форматов, таких как GRPC, HTTP, метрики Prometheus и [многие форматы логов](https://signoz.io/docs/userguide/logs/) (FluentBit/FluentD, syslog, логи из облачных сервисов и т. д.).

Для каждого приемника (receiver) открывается отдельный порт, и нам нужно открыть соответствующий порт для каждого из них.
Для этого у вас есть две стратегии:
- Настройка отдельного URL-адреса для каждого приемника.
- Прямое открытие портов на хосте и для внешнего мира.

Выбор варианта зависит от ваших требований к безопасности и структуры ваших доменов.

#### Один поддомен на каждый приемник (receiver)

Это решение требует только сопоставления вашего поддомена со службой Otel Collector. Мы рассмотрим два приемника по умолчанию: HTTP и GRPC.

1. Убедитесь, что ваши поддомены зарегистрированы и указывают на ваш сервер, например `https://signoz-grpc.example.com` и `https://signoz-http.example.com`.
2. Откройте настройки службы "Otel Collector".
3. Добавьте свои домены в формате `https://<subdomain>.example.com:<port in container>`, разделяя их запятыми. Например: `https://signoz-grpc.example.com:4317,https://signoz-http.example.com:4318`

Если вы хотите открыть дополнительные порты/приемники, просто добавьте новый адрес в список.

#### Открытие портов на хосте

Если вы предпочитаете использовать один домен для всех приемников, вы можете отредактировать Docker Compose, чтобы напрямую открыть порты в контейнере otel-collector:

```yaml
services:
  # ...
otel-collector:
  image: signoz/signoz-otel-collector:latest
  container_name: signoz-otel-collector
  # ...
  ports:
  - 4317:4317 # GRPC Collector
  - 4318:4318 # HTTP Collector
  
  # ...
```

Теперь вы можете добавлять порт к URL вашего сервиса для отправки данных в приемник: `https://signoz.example.com:4318`

### Включение отправки уведомлений по SMTP

SigNoz использует электронную почту для двух целей: приглашения пользователей и [отправки алертов](https://signoz.io/docs/alerts/).

#### Электронная почта SigNoz

Чтобы включить отправку писем по SMTP (включая приглашение новых членов команды), вам необходимо установить следующие переменные на вкладке Environment Variables (Переменные окружения) вашего сервиса в Coolify:

- `SIGNOZ_EMAILING_ENABLED` включает возможности отправки писем в SigNoz.
- `SIGNOZ_EMAILING_SMTP_ADDRESS` — адрес используемого SMTP-сервера в формате `host:port`.
- `SIGNOZ_EMAILING_SMTP_FROM` — адрес электронной почты, используемый в поле "From" (От кого).
- `SIGNOZ_EMAILING_SMTP_AUTH_USERNAME` и `SIGNOZ_EMAILING_SMTP_AUTH_PASSWORD` используются для аутентификации на SMTP-сервере.

Доступны и другие переменные окружения для аутентификации через Identity/Secret или использования TLS вместо SmartTLS. О том, как их добавить, читайте в разделе [Passing environment variables not included in the template](passing-environment-variables-not-included-in-the-template).

#### Электронная почта Alert Manager

Оповещения по электронной почте могут отправляться только в том случае, если SMTP-сервер настроен специально для менеджера алертов (alert manager). Глобальная конфигурация SMTP и конфигурация Alert Manager используют разные переменные окружения.

**Примечание**: В настоящее время у SigNoz есть известная проблема, препятствующая сохранению конфигурации почтовых оповещений. Вы можете следить за прогрессом решения этой [проблемы в их баг-трекере](https://github.com/SigNoz/signoz/issues/8478).

Чтобы включить оповещения по электронной почте, вам необходимо установить следующие переменные на вкладке Environment Variables вашего сервиса в Coolify:

- `SIGNOZ_ALERTMANAGER_SIGNOZ_GLOBAL_SMTP__SMARTHOST` — адрес используемого SMTP-сервера в формате `host:port`.
- `SIGNOZ_ALERTMANAGER_SIGNOZ_GLOBAL_SMTP__FROM` — адрес электронной почты, используемый в поле "From" (От кого).
- `SIGNOZ_ALERTMANAGER_SIGNOZ_GLOBAL_SMTP__AUTH__USERNAME` и `SIGNOZ_ALERTMANAGER_SIGNOZ_GLOBAL_SMTP__AUTH__PASSWORD` используются для аутентификации на SMTP-сервере.

Доступны и другие переменные окружения для аутентификации через Identity/Secret или использования TLS вместо SmartTLS. О том, как их добавить, читайте в разделе [Passing environment variables not included in the template](passing-environment-variables-not-included-in-the-template).


## Проблема с правами доступа при использовании не-root пользователя

Эта проблема в основном связана с тем, что Coolify повторно применяет права владения своего пользователя и chmod к файлам, смонтированным в контейнере. 

Решением здесь будет сделать файлы доступными для чтения всеми. Откройте терминал на вашем сервере, перейдите в `/data/coolify/services/<SERVICE ID>/clickhouse` и выполните команду `chmod o+r *`. Это должно позволить Clickhouse получить доступ к файлам по мере необходимости.

## Ссылки

- [Официальная документация](https://signoz.io/docs/introduction/)
- [Документация OpenTelemetry](https://opentelemetry.io/)
