---
title: Nuxt
description: Развертывайте приложения Nuxt в Coolify с серверными сборками, статической генерацией и поддержкой Nitro, используя конфигурации сборки Nixpacks.
---

# Nuxt

Nuxt — это фреймворк с открытым исходным кодом, который делает веб-разработку интуитивно понятной и мощной. Создавайте высокопроизводительные продакшен-ориентированные фуллстек-веб-приложения и сайты с уверенностью.

[Пример репозитория.](https://github.com/coollabsio/coolify-examples/tree/main/nuxt)

## Серверная сборка (Nuxt, с использованием `nuxt build`)

- Установите `Build Pack` в значение `nixpacks`.
- Установите команду запуска (`Start Command`) в значение `node .output/server/index.mjs`.

Также вы можете прописать скрипт `start` внутри `package.json` как `node .output/server/index.mjs`. В этом случае Nixpacks автоматически использует его как команду запуска.

## Статическая сборка (Nuxt, с использованием `nuxt generate`)

- Установите `Build Pack` в значение `nixpacks`.
- Включите опцию `Is it a static site?`.
- Установите `Output Directory` (исходящая директория) в значение `dist`.

## Серверная сборка Nitro (Nitro, с использованием `nitro build`)

- Установите `Build Pack` в значение `nixpacks`.
- Установите команду запуска (`Start Command`) в значение `node .output/server/index.mjs`.

Также вы можете прописать скрипт `start` в `package.json` как `node .output/server/index.mjs`. В этом случае Nixpacks автоматически использует его как команду запуска.
