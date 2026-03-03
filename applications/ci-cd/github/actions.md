---
title: "GitHub Actions"
description: "Развертывайте приложения с помощью GitHub Actions для сборки Docker-образов и запуска переразвертывания в Coolify."
---

# GitHub Actions
GitHub Actions позволяют собирать ваше приложение в виде Docker-образа и автоматически развертывать его в Coolify.

GitHub Actions обеспечивают большую гибкость при деплое, так как вы можете запускать рабочий процесс по самым разным событиям: коммиты в определенные ветки, создание релизов и т.д. Вы также можете интегрировать проверки и тесты в ваш CI/CD конвейер, гарантируя, что новые версии будут развернуты в Coolify только после успешного прохождения всех валидаций.

## Обзор процесса
Настройте GitHub Actions для сборки и публикации Docker-образа вашего приложения в реестр контейнеров (например, GHCR или Docker Hub), а затем выполните вызов API Coolify для переразвертывания приложения с использованием последнего образа, отправленного в реестр.

Для справки вы можете изучить этот [пример репозитория](https://github.com/andrasbacsai/github-actions-with-coolify) и его [файл рабочего процесса](https://github.com/andrasbacsai/github-actions-with-coolify/blob/main/.github/workflows/build.yaml).

::: info Пример данных
Следующие данные используются в качестве примера в этом руководстве. Замените их своими реальными данными при выполнении шагов:

- **Docker Image:** `shadowarcanist/tasklytics:latest`
- **Registry:** `ghcr.io`
- **Branch:** `main`
:::

## 1. Выберите подходящий тип развертывания
<ZoomableImage src="/docs/images/applications/ci-cd/github/actions/1.webp" />

С помощью GitHub Actions вы собираете приложение как Docker-образ на раннерах GitHub и отправляете его в реестр контейнеров. Выберите тип развертывания, поддерживающий предварительно собранные Docker-образы.

Для приложений на основе Git используйте **Docker Compose** в качестве билдпака. В вашем файле compose укажите загрузку (pull) готового образа вместо его сборки:

```yaml
services:
  web:
    # БЫЛО:
    # build:
    #   context: .
    #   dockerfile: Dockerfile

    # СТАЛО:
    image: ghcr.io/shadowarcanist/tasklytics:latest
    ports:
      - "8080:8080"
```

Для приложений на основе Docker используйте имя образа, например `ghcr.io/shadowarcanist/tasklytics:latest`, чтобы Docker подтянул уже собранный образ.

## 2. Включите Coolify API
<ZoomableImage src="/docs/images/applications/ci-cd/github/actions/2.webp" />

1. Перейдите на страницу **Settings** в Coolify.
2. Откройте вкладку **Configuration**.
3. Нажмите на **Advanced**.
4. Отметьте опцию **API Access**.

## 3. Создайте API-токен Coolify
<ZoomableImage src="/docs/images/applications/ci-cd/github/actions/3.webp" />

1. Перейдите на страницу **Keys & Tokens** в Coolify.
2. Откройте вкладку **API Tokens**.
3. Отметьте право **Deploy** в разрешениях токена.
4. Дайте вашему API-токену название.
5. Нажмите кнопку **Create**.
6. Скопируйте и сохраните созданный токен в надежном месте.

## 4. Получите URL вебхука Coolify
<ZoomableImage src="/docs/images/applications/ci-cd/github/actions/4.webp" />

1. Откройте страницу конфигурации вашего приложения.
2. Перейдите на страницу **Webhooks**.
3. Скопируйте и сохраните URL «Deploy webhook».

## 5. Настройте секреты репозитория
<ZoomableImage src="/docs/images/applications/ci-cd/github/actions/5.webp" />

1. Перейдите в настройки вашего репозитория на GitHub.
2. Нажмите **Actions** в боковом меню (в разделе «Secrets and variables»).
3. Нажмите **New repository secret**.

<ZoomableImage src="/docs/images/applications/ci-cd/github/actions/6.webp" />

4. Введите `COOLIFY_WEBHOOK` в качестве названия.
5. Вставьте URL вебхука Coolify (из [шага 4](#_4-получите-url-вебхука-coolify)) в поле значения секрета.
6. Нажмите кнопку **Add secret**.

<ZoomableImage src="/docs/images/applications/ci-cd/github/actions/7.webp" />

7. Нажмите **New repository secret** еще раз.

<ZoomableImage src="/docs/images/applications/ci-cd/github/actions/8.webp" />

8. Введите `COOLIFY_TOKEN` в качестве названия.
9. Вставьте API-токен Coolify (из шага 3) в поле значения секрета.
10. Нажмите кнопку **Add secret**.

## 6. Настройте GitHub Workflow
1. Создайте новый файл рабочего процесса в директории `.github/workflows` вашего репозитория (с расширением `.yml` или `.yaml`).
2. Используйте следующее содержимое в качестве основы:

```yaml
name: Build and Deploy
on:
  push:
    branches: ["main"]  # Запуск при пуше в ветку main
env:
  REGISTRY: ghcr.io
  IMAGE_NAME: "andrasbacsai/github-actions-with-coolify"

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v3
      - name: Login to registry
        uses: docker/login-action@v2
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - name: Build and push image
        uses: docker/build-push-action@v4
        with:
          context: .
          file: Dockerfile
          platforms: linux/amd64
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
      - name: Deploy to Coolify
        run: |
          curl --request GET '${{ secrets.COOLIFY_WEBHOOK }}' --header 'Authorization: Bearer ${{ secrets.COOLIFY_TOKEN }}'
```

Этот процесс собирает Docker-образ, пушит его в `ghcr.io` с тегом `latest` и запускает деплой в Coolify через API.

::: warning ВАЖНО
Приведенный выше рабочий процесс — это всего лишь пример. Настройте его под свои нужды CI/CD.

Убедитесь, что шаг **Deploy to Coolify** идет после всех проверок и тестов, чтобы он запускался только тогда, когда всё остальное пройдено успешно.
:::

## 7. Аутентификация в реестре контейнеров
Если вы отправляете образ в приватный реестр, авторизуйтесь в нем на вашем сервере, чтобы он мог скачать образ.

Выполните одну из этих команд в терминале вашего сервера (в зависимости от реестра):

- **Docker Hub**: `docker login`
- **GitHub Container Registry (GHCR)**: `docker login ghcr.io -u ВАШ_ЛОГИН --password-stdin`

Для других реестров обратитесь к их документации.

Вот и всё!