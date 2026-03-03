---
title: "Supabase"
description: "Разверните Supabase в Coolify как open-source альтернативу Firebase: база данных Postgres, аутентификация, хранилище и подписки в реальном времени (real-time subscriptions)."
---

![Supabase](https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only)

## Что такое Supabase?

Альтернатива Firebase с открытым исходным кодом.

## Скриншоты

<ZoomableImage src="/docs/images/services/supabase-selfhost.webp" alt="Дашборд Supabase" />

## Примечания (Notes)

Вы можете найти свой анонимный ключ в разделе **Environment Variables** (Переменные окружения) в поле **SERVICE_SUPABASEANON_KEY**.

## Доступ к публичному порту

::: warning ПРИМЕЧАНИЕ:
Существует ошибка, связанная с тем, чтобы сделать базу данных общедоступной. Эта ошибка будет скоро исправлена. А пока вы можете использовать следующий обходной путь:
:::

Установите **Supabase Db** как публичный (public)

<ZoomableImage src="/docs/images/services/supabase-db-fix.webp" alt="Дашборд Supabase" />

Затем:

Перейдите на вкладку **General**, затем выберите **Edit Compose File** (Редактировать файл Compose).

Затем добавьте следующую строку:
`ports:
      - ${POSTGRES_PORT:-5432}:${POSTGRES_PORT:-5432}`

В секцию:

```yaml
supabase-db:
  image: "supabase/postgres:15.6.1.146"
  healthcheck:
    test: "pg_isready -U postgres -h 127.0.0.1"
    interval: 5s
    timeout: 5s
    retries: 10
  depends_on:
    supabase-vector:
      condition: service_healthy
  ports:
    - ${POSTGRES_PORT:-5432}:${POSTGRES_PORT:-5432}
```

И выполните перезапуск (Restart).

> ПРИМЕЧАНИЕ: если вы меняете порт на другой, не забудьте обновить переменную `POSTGRES_PORT` в разделе **Environment Variables**.

## Открытие портов с помощью ufw-docker

Наконец, чтобы разрешить внешний доступ к порту PostgreSQL в среде Docker, вам нужно открыть порт в брандмауэре (firewall), используя команду:

```bash
ufw route allow proto tcp from any to any port 5432
```

Это правило гарантирует, что трафик сможет достичь вашей базы данных PostgreSQL через сеть Docker. Для получения дополнительной информации ознакомьтесь с документацией [ufw-docker](https://github.com/chaifeng/ufw-docker).

### Использование интерфейса брандмауэра Hetzner

Если ваш сервер размещен на Hetzner, вам может не понадобиться ufw-docker. Вместо этого вы можете открыть соответствующий порт базы данных (например, 5432) напрямую через [интерфейс брандмауэра Hetzner](https://docs.hetzner.com/cloud/firewalls/overview).

## Ссылки

- [Официальный сайт](https://supabase.io)
- [GitHub](https://github.com/supabase/supabase)
