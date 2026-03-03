---
title: SvelteKit
description: Развертывайте приложения SvelteKit в Coolify со статическими сборками через adapter-static или Node-серверами через adapter-node.
---

# SvelteKit

SvelteKit — это фреймворк для создания веб-приложений любого размера, предлагающий отличный опыт разработки и гибкую файловую систему роутинга.

## Статическая сборка (`adapter-static`)

Для сборки статического сайта вам необходимо использовать адаптер `@sveltejs/adapter-static` ([документация](https://kit.svelte.dev/docs/adapter-static)).

1. Включите опцию статического сайта (`on`) в разделе `Build Pack`.
2. Установите `Publish Directory` (публичную директорию) равной `/build`.

## Node-сервер (`adapter-node`)

Для сборки приложения SvelteKit на базе Node-сервера вам необходимо использовать адаптер `@sveltejs/adapter-node` ([документация](https://kit.svelte.dev/docs/adapter-node)).

1. Выключите опцию статического сайта (`off`) в разделе `Build Pack`.
2. Установите команду запуска (`Start Command`) в значение `node build`.
