---
title: "Directus"
description: "Разверните headless CMS Directus в Coolify: оболочка (wrapper) для SQL-баз данных, REST/GraphQL API, no-code студия данных и настраиваемые типы полей для любого проекта."
---

![directus](https://user-images.githubusercontent.com/522079/158864859-0fbeae62-9d7a-4619-b35e-f8fa5f68e0c8.png)

## Что такое Directus?

Directus — это API реального времени и дашборд приложения для управления контентом в базах данных SQL.

- **Open Source (Открытый исходный код).** Отсутствие искусственных ограничений, привязки к поставщику (vendor lock-in) или скрытых платных функций.
- **REST и GraphQL API.** Мгновенно создает невероятно быстрый Node.js API поверх любой базы данных SQL.
- **Управление чистым SQL.** Работает с новыми или существующими базами данных SQL без необходимости миграции.
- **Выбор базы данных.** Поддерживает PostgreSQL, MySQL, SQLite, OracleDB, CockroachDB, MariaDB и MS-SQL.
- **On-Prem или Облако.** Запустите локально (on-premises) или воспользуйтесь нашим [cloud-сервисом самообслуживания (self-service Cloud service)](https://directus.io/pricing?utm_source=coolify.io).
- **Полная расширяемость.** Создана с возможностью работы под вашим брендом (white-label), что упрощает настройку нашей модульной платформы.
- **Современный дашборд.** Наше no-code приложение Vue.js является безопасным и интуитивно понятным для нетехнических пользователей и не требует обучения.

## Варианты развертывания

Directus доступен в двух конфигурациях развертывания в Coolify:

### Directus (По умолчанию)
- **База данных:** SQLite3 (файловая)
- **Сценарий использования:** Разработка, тестирование или небольшие развертывания
- **Компоненты:** Единый контейнер Directus со встроенной базой данных SQLite

### Directus с PostgreSQL
- **База данных:** PostgreSQL + Redis
- **Сценарий использования:** Продакшен (production) развертывания, требующие лучшей производительности, масштабируемости и кэширования
- **Компоненты:**
  - Контейнер Directus
  - Контейнер PostgreSQL 16
  - Контейнер Redis 7 для кэширования
  - Автоматическая настройка базы данных и проверки работоспособности (health checks)

## Помощь сообщества

[Документация Directus](https://docs.directus.io?utm_source=coolify.io) — отличное место для начала; также вы можете изучить другие каналы:

- [Discord](https://directus.chat?utm_source=coolify.io) (Вопросы, живые обсуждения)
- [Проблемы на GitHub (GitHub Issues)](https://github.com/directus/directus/issues?utm_source=coolify.io) (Сообщения об ошибках)
- [Обсуждения на GitHub (GitHub Discussions)](https://github.com/directus/directus/discussions?utm_source=coolify.io) (Запросы на новые функции (Feature Requests))
- [Twitter](https://twitter.com/directus?utm_source=coolify.io) (Последние новости)
- [YouTube](https://www.youtube.com/c/DirectusVideos/featured?utm_source=coolify.io) (Видеоуроки)

## Ссылки

- [Официальный сайт](https://directus.io?utm_source=coolify.io)
- [GitHub](https://github.com/directus/directus?utm_source=coolify.io)
