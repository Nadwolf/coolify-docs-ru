---
title: "GitHub Preview Deploy"
description: "Автоматически развертывайте предварительные версии вашего приложения для каждого Pull Request в GitHub с помощью Coolify."
---

# GitHub Preview Deploy
Предварительные развертывания (Preview deployments) позволяют Coolify автоматически развертывать новые версии вашего приложения каждый раз, когда кто-то открывает Pull Request (PR) в вашем репозитории GitHub.

Эти предварительные развертывания автоматически удаляются после слияния или закрытия соответствующего Pull Request, что обеспечивает чистоту окружения.


## Особенности
- **[Ограниченное развертывание](#ограниченное-развертывание)**: Контролируйте, кто может запускать предварительные развертывания из PR.
- **[Раздельные секреты](#раздельные-секреты)**: Храните переменные окружения для продакшена и превью отдельно.
- **[Автоматические комментарии](#автоматические-комментарии)**: Публикуйте обновления статуса деплоя прямо в комментариях к Pull Request.

## Опции предварительных развертываний
<ZoomableImage src="/docs/images/applications/ci-cd/github/preview-deploy/4.webp" />

- **Preview URL Template:** Каждое предварительное развертывание получает свой уникальный URL на основе этого шаблона.
  - Используйте <code v-pre>{{random}}</code> для генерации случайного поддомена при каждом деплое PR.
  - Используйте <code v-pre>{{pr_id}}</code>, чтобы использовать ID Pull Request в качестве поддомена.

  ::: warning ВАЖНО
  Вам необходимо настроить **wildcard** `A`-запись для поддомена, который вы хотите использовать для превью-деплоев, указав IP-адрес вашего сервера. Например, чтобы использовать `https://123.preview.example.com`, создайте A-запись для `*.preview.example.com`, указывающую на IP вашего сервера.
  :::

- **Load Pull Requests:** Позволяет вручную получить все открытые Pull Request в вашем репозитории. Это полезно, если у вас уже были открытые PR до настройки предварительных развертываний.

::: info ИНФОРМАЦИЯ
Coolify не запускает автоматический деплой для Pull Request, которые были открыты до включения функции предварительных развертываний. Вам нужно развернуть их вручную, нажав кнопку 'Deploy' в списке PR на странице Preview Deployments.
:::

## Ограниченное развертывание
Если любой пользователь сможет запустить превью-деплой, просто создав Pull Request, он сможет выполнить произвольный код в вашем окружении, что потенциально дает доступ к ресурсам или секретам.

Coolify позволяет настроить, кто может запускать новые предварительные развертывания, чтобы предотвратить это:

<ZoomableImage src="/docs/images/applications/ci-cd/github/preview-deploy/1.webp" />

- **Preview Deployments**: Включает функцию предварительных развертываний, при этом запускать деплой PR могут только участники репозитория, коллабораторы и контрибьюторы.
- **Allow Public PR Deployments**: Кто угодно может запускать деплой PR.

## Раздельные секреты
Coolify разделяет переменные окружения для продакшена и превью-деплоев, обеспечивая безопасность ваших секретов.

<ZoomableImage src="/docs/images/applications/ci-cd/github/preview-deploy/2.webp" />

- **Production Environment Variables:** Эти переменные используются только в вашем основном развертывании. Они полностью изолированы и никогда не попадают в превью-деплои из Pull Request.
- **Preview Deployment Environment Variables:** Отдельный набор переменных, используемых только для превью-деплоев на основе PR. В них можно безопасно хранить нечувствительные данные или значения с ограниченным доступом, гарантируя, что через сторонние PR нельзя будет получить доступ к продакшен-секретам.

## Автоматические комментарии
Coolify оставляет комментарии в Pull Request со статусом деплоя и автоматически обновляет их при изменении статуса.

<ZoomableImage src="/docs/images/applications/ci-cd/github/preview-deploy/3.webp" />

::: warning ВАЖНО
Автоматические комментарии работают только при использовании GitHub App для предварительных развертываний.
:::

## Методы настройки
Существует два метода настройки превью-деплоев в Coolify:
- [Через GitHub App](#настройка-через-github-app)
- [Через вебхуки](#настройка-через-вебхуки)

### Настройка через GitHub App
Сначала следуйте нашему руководству по настройке GitHub App: [/applications/ci-cd/github/setup-app](/applications/ci-cd/github/setup-app).

В процессе настройки убедитесь, что функция Preview Deployments настроена правильно. Шаги различаются в зависимости от того, используете ли вы автоматическую или ручную настройку.

::: tabs
== Автоматическая настройка
<ZoomableImage src="/docs/images/applications/ci-cd/github/preview-deploy/github-app/1.webp" />

Перед тем как нажать «Register now», включите опцию «Preview Deployments». Это всё!

== Ручная настройка
<ZoomableImage src="/docs/images/applications/ci-cd/github/preview-deploy/github-app/2.webp" />

При настройке прав доступа для GitHub App выполните следующее:

1. В разделе **Permissions** нажмите на **Repository permissions**.
2. Установите доступ `Read and write` для **Pull Requests**.
3. Прокрутите вниз до раздела **Subscribe to events**.
4. Включите опцию **Pull requests**.

Готово!
:::

---

Если вы уже настроили GitHub App без включения функции «Preview Deployments», выполните следующие шаги:

<ZoomableImage src="/docs/images/applications/ci-cd/github/preview-deploy/github-app/3.webp" />

1. В дашборде Coolify на боковой панели нажмите **Sources**, затем выберите ваше GitHub App.
2. Нажмите кнопку **Update** в разделе Permissions (это перенаправит вас на GitHub).

<ZoomableImage src="/docs/images/applications/ci-cd/github/preview-deploy/github-app/4.webp" />

3. В разделе **Permissions** нажмите на **Repository permissions**.
4. Установите доступ `Read and write` для **Pull Requests**.
5. Прокрутите вниз до раздела **Subscribe to events**.
6. Включите опцию **Pull requests**.

---

### Настройка через вебхуки
<ZoomableImage src="/docs/images/applications/ci-cd/github/preview-deploy/webhook/1.webp" />

1. Введите секрет вебхука GitHub (случайная строка).
2. Сохраните URL вебхука — он понадобится позже.

::: warning ВАЖНО
Секрет вебхука действует как пароль. Coolify примет вебхук только в том случае, если секрет совпадает.
:::

<ZoomableImage src="/docs/images/applications/ci-cd/github/preview-deploy/webhook/2.webp" />

3. Перейдите на страницу настроек вашего репозитория.
4. Выберите **Webhooks** в боковом меню.
5. Нажмите кнопку **Add webhook**.

<ZoomableImage src="/docs/images/applications/ci-cd/github/preview-deploy/webhook/3.webp" />

6. Вставьте скопированный URL вебхука из Coolify в поле «Payload URL».
7. Введите секрет вебхука из Coolify в поле «Secret».
8. Включите «Enable SSL verification».
9. Выберите «Let me select individual events» (Выбрать отдельные события).
10. Отметьте «Pull Requests».
11. Убедитесь, что галочка «Active» установлена.
12. Нажмите кнопку **Add webhook**.

После добавления вы увидите страницу, подобную показанной ниже:

<ZoomableImage src="/docs/images/applications/ci-cd/github/preview-deploy/webhook/4.webp" />

Вот и всё! Coolify будет автоматически запускать предварительные развертывания при создании новых Pull Request.