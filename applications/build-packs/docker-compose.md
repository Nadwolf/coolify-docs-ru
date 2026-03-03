---
title: Docker Compose Build Packs
description: Развертывайте многоконтейнерные приложения с Docker Compose, используя собственные домены, «магические» переменные окружения, тома и сетевое взаимодействие сервисов.
---

<ZoomableImage src="/docs/images/builds/packs/compose/banner.webp" alt="Coolify banner" />
<br />

Docker Compose позволяет развертывать несколько Docker-контейнеров и легко настраивать их.

С билдпаком Docker Compose вы можете использовать свой собственный файл Docker Compose (например, `docker-compose.yaml`) как единственный источник истины, получая полный контроль над тем, как ваше приложение собирается и развертывается в Coolify.

## Как использовать Docker Compose?

### 1. Создайте новый ресурс в Coolify

В дашборде Coolify откройте свой проект и нажмите кнопку **Create New Resource**.

<ZoomableImage src="/docs/images/builds/packs/compose/1.webp" alt="скриншот дашборда Coolify" />

### 2. Выберите вариант развертывания

<ZoomableImage src="/docs/images/builds/packs/compose/2.webp" alt="скриншот дашборда Coolify" />

**A.** Если ваш Git-репозиторий публичный, выберите вариант **Public Repository**.

**B.** Если ваш репозиторий приватный, вы можете выбрать **Github App** или **Deploy Key**. (Эти методы требуют дополнительной настройки. Вы можете ознакомиться с руководствами по настройке [Github App](/applications/ci-cd/github/integration#with-github-app-recommended) или [Deploy Key](/applications/ci-cd/github/integration#with-deploy-keys).)

### 3. Выберите ваш Git-репозиторий

Если вы используете публичный репозиторий, вставьте URL вашего репозитория GitHub при появлении запроса. Шаги практически одинаковы для всех остальных вариантов.

<ZoomableImage src="/docs/images/builds/packs/compose/3.webp" alt="скриншот дашборда Coolify" />

### 4. Выберите билдпак

Coolify по умолчанию предлагает использовать Nixpacks. Нажмите на опцию Nixpacks и выберите **Docker Compose** в качестве билдпака из выпадающего меню.

<ZoomableImage src="/docs/images/builds/packs/compose/4.webp" alt="скриншот дашборда Coolify" />

### 5. Настройте билдпак

<ZoomableImage src="/docs/images/builds/packs/compose/5.webp" alt="скриншот дашборда Coolify" />

- **Branch (Ветка):** Coolify автоматически определит ветку в вашем репозитории.
- **Base Directory (Базовая директория):** введите директорию, которую Coolify должна использовать как корень. Используйте `/`, если ваши файлы находятся в корне, или укажите путь к подпапке (например, `/backend` для монорепозитория).
- **Docker Compose Location (Расположение Docker Compose):** введите путь к вашему файлу Docker Compose. Этот путь комбинируется с базовой директорией. Убедитесь, что расширение файла совпадает точно, иначе Coolify не сможет его загрузить.

Нажмите кнопку **Continue**, когда все параметры будут настроены верно.

## Открытие сервисов для внешнего мира

Подробнее об [открытии сервисов в интернет](/knowledge-base/docker/compose#exposing-services-to-the-internet) читайте в Базе знаний.

## Продвинутые настройки

### Использование переменных окружения и общих переменных

В Coolify вы можете легко настроить их, следуя инструкциям в [Базе знаний для Docker Compose](/knowledge-base/docker/compose#defining-environment-and-shared-variables).

### Хранилище (Storage)

Вы можете настроить хранилище в вашем файле compose с некоторыми дополнительными опциями для Coolify.

#### Создание пустой директории

Определите директории с привязкой к хосту (host binding) и укажите Coolify создать их:

```yaml
services:
  filebrowser:
    image: filebrowser/filebrowser:latest
    volumes:
      - type: bind
        source: ./srv
        target: /srv
        is_directory: true # Указывает Coolify создать директорию.
```

#### Создание файла с содержимым

Вы можете указать файл с заранее определенным содержимым и даже включить динамическое значение из переменной окружения:

```yaml
services:
  filebrowser:
    image: filebrowser/filebrowser:latest
    environment:
      - POSTGRES_PASSWORD=password
    volumes:
      - type: bind
        source: ./srv/99-roles.sql
        target: /docker-entrypoint-initdb.d/init-scripts/99-roles.sql
        content: |
          -- ПРИМЕЧАНИЕ: Измените эти пароли для продакшена!
           \set pgpass `echo "$POSTGRES_PASSWORD"`

           ALTER USER authenticator WITH PASSWORD :'pgpass';
           ALTER USER pgbouncer WITH PASSWORD :'pgpass';
```

### Исключение из проверок состояния (Healthchecks)

Если сервис не должен участвовать в общих проверках состояния (например, сервис одноразовой миграции), установите параметр `exclude_from_hc` в значение `true`:

```yaml
services:
  some-service:
    exclude_from_hc: true
    ...
```

### Подключение к предопределенным сетям

По умолчанию каждый стек compose развертывается в отдельной сети, названной в честь UUID вашего ресурса. Это позволяет сервисам внутри стека взаимодействовать друг с другом.

Если вы хотите связать сервисы из разных стеков (например, подключить приложение к отдельной базе данных), включите опцию **Connect to Predefined Network** на странице вашего стека сервисов.

<ZoomableImage src="/docs/images/builds/packs/compose/6.webp" />

Обратите внимание, что при обращении к сервису в другом стеке вы должны использовать полное имя (например, `postgres-<uuid>`).

### Прямой деплой Docker Compose (Raw Docker Compose Deployment)

Для продвинутых пользователей Coolify предлагает режим «Raw Compose Deployment». Эта опция позволяет развернуть файл Docker Compose напрямую без множества дополнительных настроек Coolify.

<ZoomableImage src="/docs/images/builds/packs/compose/7.webp" />

::: danger ВНИМАНИЕ
Этот режим предназначен для продвинутых пользователей, хорошо знакомых с Docker Compose.
:::

### Метки (Labels)

Coolify автоматически добавляет эти метки к вашему приложению (если они еще не установлены):

```yaml
labels:
  - coolify.managed=true
  - coolify.applicationId=5
  - coolify.type=application
```

Чтобы включить прокси Coolify (Traefik), также добавьте следующие метки:

```yaml
labels:
  - traefik.enable=true
  - "traefik.http.routers.<unique_router_name>.rule=Host(`shadowarcanist.com`) && PathPrefix(`/`)"
  - traefik.http.routers.<unique_router_name>.entryPoints=http
```

### Аргументы сборки (Build Arguments)

При сборке образов с помощью Docker Compose Coolify может внедрять аргументы сборки в процесс. Вы можете настроить это в меню **Advanced** вашего приложения.

#### Внедрение Build Args в Dockerfile

Управляет тем, будет ли Coolify автоматически внедрять аргументы сборки. Отключите это в меню Advanced, если хотите полностью контролировать аргументы `ARG` в вашем Dockerfile вручную.

- **Enabled (по умолчанию):** Coolify автоматически внедряет аргументы сборки.
- **Disabled:** вы сами управляете инструкциями `ARG` в Dockerfile.

#### Включение хеша коммита (Source Commit) в сборку

Управляет тем, будет ли переменная `SOURCE_COMMIT` (хеш Git-коммита) включена в сборку. Отключено по умолчанию для сохранения кэша сборки Docker между коммитами. Вы можете включить это в меню Advanced, если ваш процесс сборки требует хеша коммита.

- **Disabled (по умолчанию):** `SOURCE_COMMIT` не включается, что улучшает использование кэша.
- **Enabled:** `SOURCE_COMMIT` включается как аргумент сборки.

::: warning Оптимизация кэша сборки
Если кэш сборки не сохраняется между развертываниями, убедитесь, что опция «Include Source Commit in Build» отключена. Значение `SOURCE_COMMIT` меняется при каждом коммите и будет сбрасывать кэш.
:::

## Известные проблемы и решения

::: details 1. При переходе по домену приложения отображается «No Available Server»
Если вы видите ошибку «No Available Server» при посещении сайта, это скорее всего связано с проверкой состояния (health check) вашего контейнера.

Запустите `docker ps` в терминале сервера, чтобы проверить, не является ли статус контейнера «unhealthy» или он всё еще запускается.

Чтобы решить эту проблему, исправьте причину, по которой контейнер не проходит проверку состояния, или отключите проверки состояния (health checks).
:::
