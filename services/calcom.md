---
title: Calcom
description: "Разверните платформу для планирования расписания Cal.com в Coolify: интеграция с календарями, командное бронирование, обработка платежей и настраиваемые рабочие процессы записи на прием."
---

# Calcom

<ZoomableImage src="/docs/images/services/calcom.png" alt="Дашборд Calcom" />

## Что такое Calcom

Инфраструктура планирования расписания для каждого.

## Развертывание на x86 (amd64)

Вам нужно изменить docker compose по умолчанию на следующий, чтобы cal.com работал на архитектуре x86 (amd64):

```yaml
services:
  calcom:
    image: 'calcom/cal.com:<ВЕРСИЯ, совместимая с amd64>'
    platform: linux/amd64
    (... то же самое ...)
```

Вы можете проверить последнюю совместимую версию для amd64 [здесь](https://hub.docker.com/r/calcom/cal.com/tags).

Пример:

```yaml
services:
  calcom:
    image: 'calcom/cal.com:v5.9.0
    platform: linux/amd64
    (... то же самое ...)
```

## Ссылки

- [Официальная документация](https://cal.com/docs/developing/introduction?utm_source=coolify.io)
