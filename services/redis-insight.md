---
title: "Redis Insight"
description: "Здесь вы найдете документацию по размещению Redis Insight с помощью Coolify."
---

# Redis Insight

<ZoomableImage src="/docs/images/services/redisinsight-logo.png" />

## Что такое Redis Insight?

Redis Insight — это официальный графический интерфейс (GUI) для Redis, который позволяет взаимодействовать с базой данных как через GUI, так и через CLI в полнофункциональном десктопном клиенте. Он предоставляет интуитивно понятные инструменты для визуализации и оптимизации данных в Redis, облегчая работу с базами данных Redis через графическое представление структур данных, анализ производительности запросов и мониторинг в реальном времени.

## Как подключиться к Redis, развернутому через Coolify?

### 1. Подключение к предустановленной сети (Predefined Network)
<ZoomableImage src="/docs/images/services/redisinsight-guide1.webp" />
1. Перейдите на страницу общих настроек (General Configuration) сервиса Redis Insight.
2. Включите опцию "**Connect To Predefined Network**" (Подключиться к предустановленной сети).

:::success Совет
Начиная с Coolify v4.0.0-beta.455, эта опция включена по умолчанию.  
Если вы развернули Redis Insight раньше, включите "**Connect To Predefined Network**" вручную.
:::

### 2. Получение URL-адреса Redis
<ZoomableImage src="/docs/images/services/redisinsight-guide2.webp" />
1. Перейдите на страницу общих настроек (General Configuration) базы данных Redis, которую вы развернули через Coolify.
2. Скопируйте "**Redis URL (Internal)**" (Внутренний URL Redis) и используйте его в качестве URL базы данных на панели управления Redis Insight.

## Ссылки

- [Официальный сайт](https://redis.io/insight?utm_source=coolify.io)
- [Документация](https://redis.io/docs/latest/operate/redisinsight?utm_source=coolify.io)
- [GitHub](https://github.com/RedisInsight/RedisInsight?utm_source=coolify.io)
