---
title: "N8N"
description: "Создавайте рабочие процессы (workflows) в Coolify с помощью платформы автоматизации n8n, соединяющей 400+ приложений, API, баз данных для no-code/low-code автоматизации задач и интеграции."
---

![N8N](https://user-images.githubusercontent.com/65276001/173571060-9f2f6d7b-bac0-43b6-bdb2-001da9694058.png)

## Что такое N8N?

N8N — это open-source инструмент автоматизации рабочих процессов, который позволяет вам связывать различные приложения и сервисы. Это альтернатива с открытым исходным кодом инструментам вроде Zapier или Make.

## Варианты развертывания

N8N доступен в трех конфигурациях развертывания в Coolify:

### n8n (По умолчанию)
- **База данных:** SQLite (встроенная)
- **Сценарий использования:** Простые развертывания, тестирование или рабочие процессы с небольшим объемом (low-volume)
- **Компоненты:** Единый контейнер n8n со встроенной базой данных SQLite

### n8n с PostgreSQL
- **База данных:** PostgreSQL (внешняя)
- **Сценарий использования:** Prod-развертывания (production), требующие лучшей производительности, масштабируемости и постоянного хранения данных (data persistence)
- **Компоненты:**
  - Контейнер n8n
  - Контейнер PostgreSQL 16
  - Автоматическая настройка базы данных и проверки работоспособности (health checks)

### n8n с PostgreSQL и Worker
- **База данных:** PostgreSQL + Redis
- **Сценарий использования:** Высоконагруженные (high-volume) prod-развертывания с выполнением на основе очередей (queue-based execution) и параллельной обработкой рабочих процессов (parallel workflow processing)
- **Компоненты:**
  - Основной контейнер n8n (main container)
  - Контейнер n8n-worker для распределенного выполнения
  - Контейнер PostgreSQL 16
  - Контейнер Redis для управления очередями
  - Автоматическая настройка базы данных и проверки работоспособности (health checks)

## Скриншоты

![Превью N8N](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-screenshot.png)

### Расширение n8n пользовательскими зависимостями (custom dependencies)

Чтобы расширить n8n пользовательскими зависимостями, вы можете добавить их в свой Dockerfile, следуя примеру ниже:

```dockerfile
...
RUN apk add --no-cache ffmpeg
...
```

### Пример Dockerfile

```dockerfile
FROM n8nio/n8n:latest

# Переключитесь на пользователя root для установки пакетов и изменения системных каталогов
USER root

# Установите необходимые системные пакеты с помощью apk
# build-base, python3-dev, geoip-dev нужны для потенциальных нативных зависимостей
# wget для загрузки, git для управления исходным кодом (может понадобиться для Go), bash (полезная оболочка)
RUN apk update && \
    apk add --no-cache \
        wget \
        ffmpeg


ENV N8N_HOST=${SUBDOMAIN}.${DOMAIN_NAME}
ENV N8N_PORT=5678
ENV N8N_PROTOCOL=https
ENV NODE_ENV=production
ENV WEBHOOK_URL=https://${SUBDOMAIN}.${DOMAIN_NAME}/

# Переключитесь обратно на пользователя без прав root, от имени которого работает n8n (обычно 'node')
USER node
```

## Ссылки

- [Официальный сайт](https://n8n.io/)
- [GitHub](https://github.com/n8n-io/n8n)
