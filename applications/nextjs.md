---
title: NextJS
description: Развертывайте приложения Next.js в Coolify с серверным рендерингом, статическими сборками, используя Nixpacks или кастомные конфигурации Dockerfile.
---

# NextJS

NextJS — это фреймворк на базе React, который обеспечивает такие функции, как серверный рендеринг (SSR) и генерация статических веб-сайтов (SSG).

[Пример репозитория.](https://github.com/coollabsio/coolify-examples/tree/main/nextjs)

## Развертывание с Nixpacks

### Серверная сборка (NodeJS)

- Установите `Build Pack` в значение `nixpacks`.

### Статическая сборка (SPA)

- Установите `Build Pack` в значение `nixpacks`.
- Включите опцию `Is it a static site?`.
- Установите `Output Directory` (исходящая директория) в значение `out`.

## Развертывание с Dockerfile

Если у вас возникли проблемы с Nixpacks или вам нужен больший контроль над этапом сборки, вы можете использовать Dockerfile для развертывания приложения NextJS.

### Необходимые условия

1. Установите значение `Ports Exposes` равным `3000`.
2. Создайте файл `Dockerfile` в корне проекта и скопируйте содержимое из официального [репозитория NextJS](https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile).
3. Установите `Build Pack` в значение `Dockerfile`.
