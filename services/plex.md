---
title: "Plex"
description: "Транслируйте медиа в Coolify с сервером Plex: фильмы, сериалы, музыка, фото с транскодированием (transcoding), мобильными приложениями и поддержкой Live TV DVR."
---

<ZoomableImage src="/docs/images/services/plex-logo.svg" alt="Дашборд Plex" />

## Что такое Plex?

Доступная практически на любом устройстве, Plex — это первая и единственная стриминговая платформа, предлагающая бесплатные (с рекламой) фильмы, шоу и трансляции телеканалов (live TV) в одном месте.

## Установка (Installation)

1. Создайте сервис внутри Coolify.
2. ПЕРЕД запуском сервиса установите переменную `PLEX_CLAIM`. Вы можете получить токен запроса (claim token) здесь: https://plex.tv/claim
3. Если ваше устройство поддерживает это, включите аппаратное транскодирование (hardware transcoding), раскомментировав этот раздел в файле compose:

```yaml
#devices:
# - "/dev/dri:/dev/dri"
```

## Скриншоты

<ZoomableImage src="/docs/images/services/plex.webp" alt="Дашборд Plex" />

## Ссылки

- [Официальный сайт](https://www.plex.tv/)
- [GitHub](https://github.com/plexinc/pms-docker)
