---
title: "Once Campfire"
description: "Здесь вы найдете документацию по размещению Once Campfire с помощью Coolify."
---

<ZoomableImage src="/docs/images/services/oncecampfire-logo.png" alt="Дашборд Once Campfire" />

## Что такое Once Campfire?

Once Campfire — это веб-приложение для чата. Оно поддерживает многие из ожидаемых вами функций, включая:

- Несколько комнат с управлением доступом
- Личные сообщения (Direct messages)
- Прикрепление файлов с предварительным просмотром (previews)
- Поиск
- Уведомления (через Web Push)
- Упоминания (@mentions)
- API с поддержкой интеграции ботов

## Ссылки

- [Официальный сайт](https://once.com/campfire?utm_source=coolify.io)
- [GitHub](https://github.com/basecamp/once-campfire?utm_source=coolify.io)

## Конфигурация (Configuration)

Once Campfire требует минимальной конфигурации для начала работы:

### Обязательные переменные окружения (Required Environment Variables)

- **SECRET_KEY_BASE** - Безопасный случайный ключ для шифрования (автоматически генерируется Coolify)

### Необязательные переменные окружения (Optional Environment Variables)

- **VAPID_PUBLIC_KEY** - Для web push уведомлений
- **VAPID_PRIVATE_KEY** - Для web push уведомлений
- **DISABLE_SSL** - Установите значение `true` для отключения SSL (по умолчанию: `true`)
- **SSL_DOMAIN** - Ваш домен для настройки SSL
- **SKIP_TELEMETRY** - Установите значение `true` для отключения телеметрии (по умолчанию: `true`)
- **SENTRY_DSN** - Для отчетов об ошибках
