---
title: "GitHub Auto Deploy"
description: "Автоматически развертывайте приложения из репозиториев GitHub в Coolify, используя GitHub Apps, Actions или вебхуки."
---

# GitHub Auto Deploy
Coolify может автоматически развертывать новые версии вашего приложения каждый раз, когда вы пушите изменения в репозиторий GitHub.

Существует три метода настройки автоматических развертываний в Coolify:
- [GitHub App](#github-app)
- [GitHub Actions](#github-actions)
- [Webhooks](#webhooks)

## GitHub App
У нас есть отдельное руководство по настройке GitHub App, которое вы можете найти здесь: [/github/setup-app](/applications/ci-cd/github/setup-app).

Coolify автоматически включает «Auto Deploy» (Автодеплой) после настройки GitHub App. Если этого не произошло, включите его в настройках вашего приложения, выполнив следующие действия:

<ZoomableImage src="/docs/images/applications/ci-cd/github/auto-deploy/github-app/1.webp" />

1. Откройте страницу конфигурации вашего приложения.
2. Перейдите в раздел «Advanced» (Дополнительно).
3. Включите «Auto Deploy» в основных настройках (general).

## GitHub Actions
У нас есть отдельное руководство по настройке GitHub Actions, которое вы можете найти здесь: [/github/setup-app](/applications/ci-cd/github/setup-app).

## Webhooks

### 1. Включите Auto Deploy
<ZoomableImage src="/docs/images/applications/ci-cd/github/auto-deploy/webhooks/1.webp" />

1. Откройте страницу конфигурации вашего приложения.
2. Перейдите в раздел «Advanced» (Дополнительно).
3. Включите «Auto Deploy» в основных настройках (general).

### 2. Настройте секрет вебхука GitHub
<ZoomableImage src="/docs/images/applications/ci-cd/github/auto-deploy/webhooks/2.webp" />

1. Введите секрет вебхука GitHub (это должна быть случайная строка; вы можете использовать инструменты вроде [Random String Generator](https://getrandomgenerator.com/string)).
2. Сохраните URL вебхука, он понадобится нам позже.

::: warning ВАЖНО
Секрет вебхука действует как пароль. Coolify примет вебхук только в том случае, если секрет совпадает.
:::

### 3. Настройте вебхук на GitHub
<ZoomableImage src="/docs/images/applications/ci-cd/github/auto-deploy/webhooks/3.webp" />

1. Перейдите на страницу настроек вашего репозитория.
2. Нажмите на «Webhooks» в боковом меню.
3. Нажмите кнопку «Add webhook» (Добавить вебхук).

<ZoomableImage src="/docs/images/applications/ci-cd/github/auto-deploy/webhooks/4.webp" />

4. Вставьте скопированный ранее URL вебхука из Coolify в поле «Payload URL».
5. Введите секрет вебхука из Coolify в поле «Secret».
6. Включите «Enable SSL verification».
7. Выберите «Just the `push` event» (Только событие push).
8. Убедитесь, что галочка «Active» установлена.
9. Нажмите кнопку «Add webhook».

После нажатия «Add webhook» вы увидите страницу, подобную показанной ниже:

<ZoomableImage src="/docs/images/applications/ci-cd/github/auto-deploy/webhooks/5.webp" />

Вот и всё! Coolify будет автоматически переразвертывать ваше приложение каждый раз, когда вы пушите изменения в репозиторий.