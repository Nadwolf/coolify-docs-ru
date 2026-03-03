---
title: "Beszel"
description: "Разверните легкий (lightweight) мониторинг серверов Beszel в Coolify: метрики в реальном времени, статистика Docker и минимальное потребление ресурсов для отслеживания инфраструктуры."
---

<ZoomableImage src="/docs/images/services/beszel.svg" alt="Дашборд Beszel" />

## Что такое Beszel?

Легкий (lightweight) центр мониторинга серверов (server monitoring hub) с историческими данными, статистикой Docker и алертами (оповещениями).

## Настройка

- Разверните Beszel, используя шаблон Coolify.
- В интерфейсе выберите `Add a new System` (Добавить новую систему).
- Введите `beszel-agent` в поле Host/IP.
- Скопируйте публичный ключ (public Key) в переменную окружения (env variable) `KEY`, а токен — в переменную `TOKEN` в настройках переменных окружения проекта Beszel (Они (токен и ключ) выдаются в интерфейсе Beszel при добавлении новой системы).
- Отключите сжатие gzip в настройках сервиса hub. (Это обрабатывается Coolify автоматически после версии v4.0.0-beta.452).

## Ссылки

- [GitHub](https://github.com/henrygd/beszel)
