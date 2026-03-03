---
title: "Docuseal"
description: "Разверните DocuSeal в Coolify для заполнения PDF-форм, получения электронных подписей (e-signatures), настройки документооборота и автоматизации бизнес-процессов."
---

## Что такое Docuseal?

Подписание документов (Document Signing) для всех: навсегда бесплатно для физических лиц, с возможностью расширения для бизнеса и разработчиков. Open Source альтернатива DocuSign, PandaDoc и другим.

## Варианты развертывания

DocuSeal доступен в двух конфигурациях развертывания в Coolify:

### DocuSeal (По умолчанию)
- **База данных:** SQLite (встроенная)
- **Сценарий использования:** Простые развертывания, тестирование или небольшой объем подписания документов
- **Компоненты:** Единый контейнер DocuSeal со встроенной базой данных SQLite

### DocuSeal с PostgreSQL
- **База данных:** PostgreSQL
- **Сценарий использования:** Продакшен (production) развертывания, требующие лучшей производительности, масштабируемости и параллельного доступа (concurrent access)
- **Компоненты:**
  - Контейнер DocuSeal
  - Контейнер PostgreSQL
  - Автоматическая настройка базы данных и проверки работоспособности (health checks)

## Скриншоты

<ZoomableImage src="/docs/images/services/docuseal.webp" alt="Дашборд Docuseal" />

## Ссылки

- [Официальный сайт](https://www.docuseal.co?utm_source=coolify.io)
- [GitHub](https://github.com/docusealco/docuseal?utm_source=coolify.io)
