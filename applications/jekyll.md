---
title: Jekyll
description: Развертывайте статические сайты Jekyll в Coolify с использованием Nixpacks или Dockerfile с Ruby, Nginx и автоматическими процессами сборки.
---

# Jekyll

Jekyll — это простой генератор статических сайтов, ориентированный на ведение блогов для персональных сайтов, сайтов проектов или организаций.

## Развертывание с Nixpacks

Инструменту Nixpacks требуется несколько необходимых условий в вашем исходном коде для развертывания приложения Jekyll. Подробнее [здесь](https://nixpacks.com/docs/providers/ruby).

## Развертывание с Dockerfile

Для простоты вы можете использовать Dockerfile для развертывания вашего приложения Jekyll.

### Необходимые условия

1. Установите значение `Ports Exposes` равным `80`.
2. Создайте `Dockerfile` в корне проекта со следующим содержимым:

```Dockerfile
FROM ruby:3.1.1 AS builder
RUN apt-get update -qq && apt-get install -y build-essential nodejs
WORKDIR /srv/jekyll
COPY Gemfile Gemfile.lock ./
RUN bundle install
COPY . .
RUN chown 1000:1000 -R /srv/jekyll
RUN bundle exec jekyll build -d /srv/jekyll/_site

FROM nginx:alpine
COPY --from=builder /srv/jekyll/_site /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

3. Убедитесь, что файлы `Gemfile` и `Gemfile.lock` находятся в корне вашего проекта.
4. Установите тип билдпака (buildpack) на `Dockerfile`.
