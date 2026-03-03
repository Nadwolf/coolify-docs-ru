---
title: "Unleash"
description: "Управляйте функциями в Coolify с помощью Unleash: переключатели функций (feature toggles), A/B тестирование, постепенное развертывание и управление флагами функций корпоративного уровня."
---

<ZoomableImage src="/docs/images/services/unleash.svg" alt="Дашборд Unleash" />

![Unleash](https://raw.githubusercontent.com/Unleash/unleash/main/.github/github_header_opaque_landscape.svg)

## Что такое Unleash?

Unleash — это сервис управления флагами функций (feature flagging) с открытым исходным кодом.

## Варианты развертывания

Unleash доступен в двух конфигурациях развертывания в Coolify:

### Unleash с PostgreSQL
- **База данных:** PostgreSQL
- **Сценарий использования:** Стандартные развертывания с управляемой базой данных
- **Компоненты:**
  - Контейнер Unleash
  - Контейнер PostgreSQL
  - Автоматическая настройка базы данных и проверки работоспособности (health checks)

### Unleash без базы данных
- **База данных:** Внешняя (предоставляемая пользователем)
- **Сценарий использования:** Продвинутые развертывания с существующей инфраструктурой баз данных или пользовательскими конфигурациями БД
- **Компоненты:**
  - Контейнер Unleash
  - Требуется конфигурация подключения к внешней базе данных

## Скриншоты

![Превью Unleash](https://raw.githubusercontent.com/Unleash/unleash/main/.github/github_online_demo.svg)

## Ссылки

- [Официальный сайт](https://getunleash.io)
- [GitHub](https://github.com/unleash/unleash)
