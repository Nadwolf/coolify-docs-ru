---
title: "Деплой из публичного репозитория"
description: "Узнайте, как развертывать приложения из публичных репозиториев GitHub напрямую, используя URL репозитория в Coolify."
---

# Деплой из публичного репозитория
Вы можете развертывать приложения из любого публичного репозитория GitHub, просто указав его URL.


## 1. Создайте новый ресурс в Coolify
<ZoomableImage src="/docs/images/applications/ci-cd/github/public-repository/1.webp" />

1. Выберите свой проект в дашборде Coolify.
2. Нажмите кнопку **+ New**, чтобы создать новый ресурс.

## 2. Выберите Public Repository как тип ресурса
<ZoomableImage src="/docs/images/applications/ci-cd/github/public-repository/2.webp" />

Выберите **Public Repository** из доступных типов ресурсов.


## 3. Выберите сервер
::: warning ВНИМАНИЕ!
Coolify автоматически выбирает сервер `localhost`, если у вас нет подключенных удаленных серверов. В таком случае переходите к следующему шагу.
:::

<ZoomableImage src="/docs/images/applications/ci-cd/github/public-repository/3.webp" />

Выберите сервер, на котором вы хотите развернуть приложение.


## 4. Введите ссылку на ваш репозиторий
<ZoomableImage src="/docs/images/applications/ci-cd/github/public-repository/4.webp" />

Вставьте URL вашего публичного репозитория GitHub.

::: success Подсказка
Ветка будет **выбрана автоматически** на основе предоставленного URL.

* https://github.com/coollabsio/coolify-examples → будет выбрана ветка **main**.
* https://github.com/coollabsio/coolify-examples/tree/nodejs-fastify → будет выбрана ветка **nodejs-fastify**.
:::


## 5. Настройте приложение и разверните
<ZoomableImage src="/docs/images/applications/ci-cd/github/public-repository/5.webp" />

После ввода ссылки на репозиторий нажмите **Check Repository**. Затем настройте билдпак (buildpack), порты и другие параметры. (Подробнее см. в нашем руководстве по [сборкам](/applications/build-packs/overview).)


После завершения настройки разверните ваше приложение.

Вот и всё!