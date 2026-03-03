---
title: Flowise
description: "Создавайте рабочие процессы ИИ (AI workflows) в Coolify с помощью drag-and-drop интерфейса Flowise для LLM: разработка чат-ботов, агентов, RAG-приложений и интеграция пользовательских инструментов ИИ."
---

# Flowise

<ZoomableImage src="/docs/images/services/flowise.jpg" alt="Дашборд Flowise" />

## Что такое Flowise

Flowise — это open-source low-code инструмент для разработчиков, позволяющий создавать настраиваемые сценарии оркестрации LLM (LLM orchestration flows) и ИИ-агентов.

## Варианты развертывания

Flowise доступен в двух конфигурациях развертывания в Coolify:

### Flowise (По умолчанию)
- **База данных:** SQLite (встроенная)
- **Сценарий использования:** Простые развертывания, тестирование или персональная разработка рабочих процессов ИИ (AI workflow development)
- **Компоненты:** Единый контейнер Flowise со встроенной базой данных SQLite

### Flowise с базами данных (with Databases)
- **База данных:** PostgreSQL + Redis
- **Сценарий использования:** Продакшен (production) развертывания, требующие лучшей производительности, кэширования и масштабируемости
- **Компоненты:**
  - Контейнер Flowise
  - Контейнер PostgreSQL для хранения (persistence) данных
  - Контейнер Redis для кэширования и управления сессиями (session management)
  - Автоматическая настройка базы данных и проверки работоспособности (health checks)

## Ссылки

- [Официальная документация](https://docs.flowiseai.com/?utm_source=coolify.io)
