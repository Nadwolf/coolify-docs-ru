---
title: "Yamtrack"
description: "Отслеживайте время в Coolify с помощью YAMTrack: ведение логов времени проекта, выставление счетов, отчеты и инструмент управления продуктивностью для фрилансеров."
---

<ZoomableImage src="/docs/images/services/yamtrack.webp" alt="Логотип Yamtrack" />

## Что такое Yamtrack?

Yamtrack — это трекер медиаконтента для самостоятельного хостинга (self-hosted), предназначенный для отслеживания фильмов, сериалов, аниме, манги, видеоигр и книг.

## Варианты развертывания

Yamtrack доступен в двух конфигурациях развертывания в Coolify:

### Yamtrack (По умолчанию)
- **База данных:** SQLite (встроенная)
- **Сценарий использования:** Простые развертывания, тестирование или личное использование
- **Компоненты:** Один контейнер Yamtrack со встроенной базой данных SQLite

### Yamtrack с PostgreSQL
- **База данных:** PostgreSQL
- **Сценарий использования:** Решения для продакшена, требующие более высокой производительности и надежности данных
- **Компоненты:**
  - Контейнер Yamtrack
  - Контейнер PostgreSQL
  - Автоматическая настройка базы данных и проверки работоспособности (health checks)

## Скриншоты

<ZoomableImage src="/docs/images/services/yamtrack-screenshots-1.webp" alt="Скриншот интерфейса Yamtrack" />
<br />
<ZoomableImage src="/docs/images/services/yamtrack-screenshots-2.webp" alt="Скриншот интерфейса Yamtrack" />

## Ссылки

- [Официальный сайт](https://github.com/FuzzyGrim/Yamtrack/wiki?utm_source=coolify.io)
- [GitHub](https://github.com/FuzzyGrim/Yamtrack?utm_source=coolify.io)
