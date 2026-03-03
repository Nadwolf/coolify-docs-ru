---
title: Static Build Pack
description: Развертывайте статические веб-сайты с веб-сервером Nginx, используя готовые файлы из Git-репозиториев. Поддержка Astro, Webstudio и других генераторов.
---

<ZoomableImage src="/docs/images/builds/packs/static/banner.webp" alt="Coolify banner" />

<br />

Static Build Pack берет файлы из вашего проекта и создает Docker-образ с веб-сервером для их обслуживания. Это означает, что ваш итоговый Docker-образ уже содержит веб-сервер, готовый отображать ваши файлы HTML, CSS и JavaScript.

Static Build Pack работает только в том случае, если ваш проект уже собран (например, с помощью генератора статических сайтов, такого как [Astro](https://astro.build/?utm_source=coolify.io) или [Webstudio](https://webstudio.is/?utm_source=coolify.io)). Как только у вас появились готовые файлы сборки, вы можете загрузить их в Git-репозиторий и использовать Coolify для деплоя сайта.

## Как использовать Static Build Pack

### 1. Подготовьте статические файлы

Сначала соберите свой сайт с помощью любимого генератора статических сайтов. В результате этого процесса будет создана папка со всеми файлами, необходимыми вашему сайту (HTML, CSS, JavaScript и т. д.).

Затем загрузите эти статические файлы в Git-репозиторий. Вы можете использовать [GitHub](https://github.com/?utm_source=coolify.io), [GitLab](https://about.gitlab.com/?utm_source=coolify.io) или любой другой Git-сервис. В этом руководстве мы будем использовать [GitHub](https://github.com/?utm_source=coolify.io) в качестве примера.

### 2. Создайте новый ресурс в Coolify

В дашборде Coolify откройте свой проект и нажмите кнопку **Create New Resource** (Создать новый ресурс).

<ZoomableImage src="/docs/images/builds/packs/static/1.webp" alt="скриншот дашборда Coolify" />

### 3. Выберите вариант развертывания

<ZoomableImage src="/docs/images/builds/packs/static/2.webp" alt="скриншот дашборда Coolify" />

**A.** Если ваш Git-репозиторий публичный, выберите вариант **Public Repository**.

**B.** Если ваш репозиторий приватный, вы можете выбрать **Github App** или **Deploy Key**. (Эти методы требуют дополнительной настройки. При необходимости вы можете ознакомиться с руководствами по настройке [Github App](/applications/ci-cd/github/integration#with-github-app-recommended) или [Deploy Key](/applications/ci-cd/github/integration#with-deploy-keys).)

### 4. Выберите ваш Git-репозиторий

Если вы используете публичный репозиторий, вставьте URL вашего репозитория GitHub при появлении запроса. Шаги практически одинаковы для всех вариантов.

<ZoomableImage src="/docs/images/builds/packs/static/3.webp" alt="скриншот дашборда Coolify" />

### 5. Выберите билдпак

Coolify по умолчанию предложит использовать Nixpacks. Нажмите на опцию Nixpack и выберите **Static** из выпадающего меню.

<ZoomableImage src="/docs/images/builds/packs/static/4.webp" alt="скриншот дашборда Coolify" />

Это укажет Coolify собрать ваш образ со статическим веб-сервером.

### 6. Установите базовую директорию (Base Directory)

Введите путь, где находятся ваши статические файлы:

<ZoomableImage src="/docs/images/builds/packs/static/5.webp" alt="скриншот дашборда Coolify" />

- Если ваши файлы находятся в корне репозитория, просто введите `/`.
- Если они находятся в подпапке, введите путь к этой папке (например, `/out`).

После установки базовой директории нажмите кнопку **Continue**.

### 7. Выберите веб-сервер

Начиная с Coolify **v4.0.0-beta.402**, единственным доступным вариантом веб-сервера является [Nginx](https://nginx.org/en/?utm_source=coolify.io). Поэтому **Nginx** будет выбран по умолчанию.

<ZoomableImage src="/docs/images/builds/packs/static/6.webp" alt="скриншот дашборда Coolify" />

### 8. Введите ваш домен

Введите доменное имя, по которому ваш сайт должен быть доступен.

<ZoomableImage src="/docs/images/builds/packs/static/7.webp" alt="скриншот дашборда Coolify" />

Если у вас несколько доменов, разделите их запятыми.

### 9. Разверните ваш сайт

Нажмите кнопку **Deploy**. Процесс развертывания обычно проходит быстро (часто меньше минуты, в зависимости от вашего сервера).

<ZoomableImage src="/docs/images/builds/packs/static/8.webp" alt="скриншот дашборда Coolify" />

После завершения деплоя перейдите по своему домену в браузере, чтобы увидеть работающий сайт.

### 10. Настройте конфигурацию веб-сервера <Badge type="warning" text="Опционально" />

Coolify предоставляет стандартную конфигурацию веб-сервера, которая подходит для большинства случаев.

Если вы хотите изменить её, нажмите кнопку **Generate**, чтобы загрузить настройки по умолчанию и внести необходимые изменения.

<ZoomableImage src="/docs/images/builds/packs/static/9.webp" alt="скриншот дашборда Coolify" />

::: warning ВНИМАНИЕ!
Вам необходимо нажать кнопку **Restart**, чтобы новая конфигурация вступила в силу.
:::
