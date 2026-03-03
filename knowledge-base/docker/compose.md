---
title: "Docker Compose"
description: "Развертывайте многоконтейнерные стеки Docker Compose в Coolify с помощью магических переменных окружения, постоянных хранилищ, проверок состояния и предустановленных сетевых соединений."
---

# Docker Compose

Если вы используете развертывание на основе `Docker Compose`, вам необходимо понимать, как именно Docker Compose взаимодействует с Coolify.

Во всех случаях файл Docker Compose (`docker-compose.y[a]ml`) является единственным источником истины.
Это означает, что различные настройки, которые вы обычно настраиваете в интерфейсе Coolify (например, переменные окружения, хранилища и т.д.), должны быть определены в самом файле compose.

## Доступ к сервисам извне

Когда Coolify развертывает Docker Compose, он создает сеть для сервисов в этом стеке. Кроме того, он добавляет сервис прокси, чтобы сделать ваши сервисы доступными внутри этой новой сети.

Существует несколько способов сделать ваши сервисы доступными извне:

### Домены (Domains)

Как только Coolify загружает ваш файл compose, он находит список сервисов и позволяет назначить им домен. Если ваши сервисы слушают порт 80, назначения домена достаточно, чтобы прокси нашел их и направил трафик. Если они слушают другие порты, добавьте этот порт к домену.

Например, если ваше приложение слушает порт 80 (внутри контейнера) и вы хотите запустить его на `example.com`, введите `http://example.com` (или `https://`) в поле домена.

Если ваше приложение слушает порт 3000 (внутри контейнера), введите `http://example.com:3000` для соответствующего сервиса. Порт здесь указывает Coolify, куда именно отправлять трафик внутри контейнера; прокси же сделает этот сервис доступным на стандартном порту (в данном случае `http://example.com` на порту 80).

Для более тонкой настройки маршрутизации на основе доменов см. раздел [Магические переменные окружения Coolify](#магические-переменные-окружения-coolify) ниже.

### Маппинг портов сервиса (Service Port Mapping)

Если вы хотите сделать ваш сервис доступным через порт хост-машины (сервера), добавьте атрибут [ports](https://docs.docker.com/reference/compose-file/services/#ports) в ваш файл compose. Например, чтобы пробросить порт `3000` контейнера напрямую на сервер:

```yaml
services:
  backend:
    image: your-backend:latest
    ports:
      - "3000:3000"
```

Имейте в виду: если вы сделаете это, **ваш сервис будет доступен на сервере по порту 3000 в обход любых настроек прокси.** Это может быть не то, что вам нужно! Если вы используете один и тот же файл Docker Compose для разработки и деплоя, это может случайно открыть доступ к приватным сервисам.

Опционально вы можете указать IP-адрес, чтобы привязать порт к конкретному интерфейсу сервера:

```yaml
services:
  backend:
    image: your-backend:latest
    ports:
      - "127.0.0.1:3000:3000"
```

Это сделает сервис доступным только через `localhost:3000` вашего сервера.

### Приватные или внутренние сервисы

Если вы не настраиваете маппинг портов и не назначаете домен, Coolify не будет открывать ваш сервис за пределами приватной сети. В таком случае вы можете обращаться к нему стандартным для Docker Compose способом.

Например, если у вас есть два сервиса с такими именами:

```yaml
services:
  backend:
    image: your-backend:latest
  auth:
    image: your-auth:latest
```

Тогда сервис `backend` может подключиться к `auth` по адресу `http://auth:1234` (или любому другому порту). Аналогично, `auth` может подключиться к `backend` через `http://backend:3000`.

Для получения подробной информации обратитесь к документации [Docker Networking in Compose](https://docs.docker.com/compose/how-tos/networking/).

## Определение переменных окружения

Coolify автоматически обнаруживает переменные окружения, упомянутые в файле compose, и отображает их в интерфейсе. Например:

```yaml
services:
  myservice:
    environment:
      - SOME_HARDCODED_VALUE=hello # Передается в контейнер, но не отображается в UI Coolify
      - SOME_VARIABLE=${SOME_VARIABLE_IN_COOLIFY_UI} # Создает пустую переменную, редактируемую в UI
      - SOME_DEFAULT_VARIABLE=${OTHER_NAME_IN_COOLIFY:-hello} # Создает переменную со значением "hello", редактируемую в UI
```

<ZoomableImage src="/docs/images/knowledge-base/compose/1.webp" />

### Обязательные переменные окружения

Coolify поддерживает пометку переменных как обязательных, используя встроенный синтаксис Docker Compose. Это улучшает процесс деплоя, проверяя критически важные настройки перед запуском сервисов.
Используйте синтаксис `:?` для обязательных переменных. Они должны быть установлены перед деплоем, иначе в UI Coolify они будут подсвечены красной рамкой.

```yaml
services:
  myapp:
    environment:
      # Обязательные переменные - деплой не начнется, если они не заданы
      - DATABASE_URL=${DATABASE_URL:?}
      - API_KEY=${API_KEY:?}

      # Обязательные переменные со значениями по умолчанию - предзаполнены в UI, но можно изменить
      - PORT=${PORT:?3000}
      - LOG_LEVEL=${LOG_LEVEL:?info}

      # Опциональные переменные - стандартное поведение
      - DEBUG=${DEBUG:-false}
      - CACHE_TTL=${CACHE_TTL:-3600}
```

**Ключевые особенности:**

- **Обязательные переменные** (`${VAR:?}`) отображаются в начале списка и подсвечиваются красным, если они пусты.
- **Обязательные с дефолтом** (`${VAR:?default}`) предзаполнены значением по умолчанию, но остаются доступными для редактирования.
- **Опциональные переменные** (`${VAR:-default}`) используют стандартную логику Docker Compose.

Если обязательная переменная не задана в момент деплоя:

- Coolify подсветит пропущенную переменную в интерфейсе.
- Деплой будет заблокирован до тех пор, пока не будут предоставлены все обязательные значения.
- Четкие сообщения об ошибках помогут пользователю исправить конфигурацию.

Эта валидация происходит до создания контейнеров, что предотвращает частичные деплои и ошибки во время выполнения.

### Общие переменные окружения (Shared Environment Variables)

Coolify не обнаруживает **общие** переменные напрямую в файле compose, но на них можно ссылаться с помощью дополнительного шага.

1. Создайте общую переменную согласно [документации по общим переменным](/knowledge-base/environment-variables#shared-variables).

2. Определите переменные в вашем Docker Compose файле, например:

```yaml
services:
  myservice:
    environment:
      - HARD_CODED=dev # Передается в контейнер, но не видна в UI.
      - SOME_OPTIONAL_VARIABLE=${SOME_VARIABLE_IN_COOLIFY_UI} # Создает редактируемую переменную в UI.
    volumes:
      - data-persist:/var/data
  volumes:
    data-persist:
      device: /mnt/serverstorage/${SOME_VARIABLE_IN_COOLIFY_UI} # Повторное использование переменной
```

3. Явно определите переменную в разделе Environment Variables приложения, ссылаясь на общую переменную, созданную на шаге 1:

::: v-pre

В режиме `developer view` (вид для разработчика) вы можете ввести её так:

```
SOME_VARIABLE_IN_COOLIFY_UI={{environment.SOME_SHARED_VARIABLE}}
```

Или в обычном режиме: поле `Name` — это то, на что ссылается Docker Compose файл (`SOME_VARIABLE_IN_COOLIFY_UI`), а `Value` — это ссылка на общую переменную (`{{environment.SOME_SHARED_VARIABLE}}`). После сохранения вы увидите третье текстовое поле, в котором (если его раскрыть) будет видно реальное значение — например, `SOME_VALUE`.

:::

<ZoomableImage src="/docs/images/knowledge-base/compose/2.webp" />

### Магические переменные окружения Coolify

Coolify может генерировать динамические переменные окружения за вас, используя синтаксис: `SERVICE_<TYPE>_<IDENTIFIER>`. Тип может быть одним из следующих:

- **URL**: [Генерирует](/knowledge-base/server/introduction#wildcard-domain) URL для сервиса. Можно добавлять пути и порты.
- **FQDN**: Генерирует полное доменное имя (FQDN) на основе заданного URL. Можно добавлять пути и порты.
- **USER**: Генерирует случайную строку длиной 16 символов. Удобно использовать как имя пользователя.
- **PASSWORD**: Генерирует пароль. Используйте `PASSWORD_64` для пароля длиной 64 символа.
- **BASE64**: Генерирует случайную строку. Есть варианты `BASE64_64` и `BASE64_128`.

::: info Имена идентификаторов
Идентификаторы с подчеркиваниями (`_`) не могут использовать порты в переменных окружения. Используйте дефисы (`-`), чтобы избежать этого ограничения.

```
SERVICE_URL_APPWRITE_SERVICE_3000 ❌
SERVICE_URL_APPWRITE-SERVICE_3000 ✅
```

:::

Каждая сгенерированная переменная может быть использована повторно и всегда будет иметь одинаковое значение для всех сервисов. Все такие переменные отображаются в UI Coolify и могут быть отредактированы (кроме FQDN и URL).

Пример: приложение с UUID `vgsco4o`, использующее compose-файл для деплоя Appwrite на [wildcard](/knowledge-base/server/introduction#wildcard-domain) домен `http://example.com`.

Результат будет таким:

```yaml
services:
  appwrite:
    environment:
      # http://appwrite-vgsco4o.example.com
      - SERVICE_URL_APPWRITE
      # http://appwrite-vgsco4o.example.com/v1/realtime
      - SERVICE_URL_APPWRITE=/v1/realtime
      # _APP_URL получит значение FQDN
      - _APP_URL=$SERVICE_URL_APPWRITE
      # http://appwrite-vgsco4o.example.com/ будет проксироваться на порт 3000
      - SERVICE_URL_APPWRITE_3000
      # DOMAIN_NAME получит значение FQDN (appwrite-vgsco4o.example.com)
      - DOMAIN_NAME=${SERVICE_FQDN_APPWRITE}
      # http://api-vgsco4o.example.com/api будет проксироваться на порт 2000
      - SERVICE_URL_API_2000=/api
      # Coolify генерирует пароль и вставляет его как SERVICE_SPECIFIC_PASSWORD
      - SERVICE_SPECIFIC_PASSWORD=${SERVICE_PASSWORD_APPWRITE}
  not-appwrite:
    environment:
      # Повторное использование пароля из сервиса Appwrite
      - APPWRITE_PASSWORD=${SERVICE_PASSWORD_APPWRITE}
      # Так как SERVICE_URL_API отличается от SERVICE_URL_APPWRITE,
      # Coolify сгенерирует новый URL:
      # http://not-appwrite-vgsco4o.example.com/api
      - SERVICE_URL_API=/api
```

::: warning
Поддержка магических переменных в Compose-файлах на основе Git-источников требует Coolify версии v4.0.0-beta.411 и выше.
:::

## Хранилище (Storage)

Вы можете описывать хранилища стандартным для Compose способом, но есть несколько дополнительных опций для Coolify.

### Создание пустой директории

```yaml
# Определение директорий с привязкой к хосту
services:
  filebrowser:
    image: filebrowser/filebrowser:latest
    volumes:
      - type: bind
        source: ./srv
        target: /srv
        is_directory: true # Указывает Coolify создать директорию (этого нет в обычном docker-compose)
```

### Создание файла с содержимым

Здесь показано, как создать файл с контентом и динамическим значением из переменной окружения.

```yaml
services:
  filebrowser:
    image: filebrowser/firebrowser:latest
    environment:
      - POSTGRES_PASSWORD=password
    volumes:
      - type: bind
        source: ./srv/99-roles.sql
        target: /docker-entrypoint-initdb.d/init-scripts/99-roles.sql
        content: |  # Указывает Coolify создать файл (этого нет в обычном docker-compose)
          -- ПРИМЕЧАНИЕ: смените пароли для продакшн-окружений
           \set pgpass `echo "$POSTGRES_PASSWORD"`

           ALTER USER authenticator WITH PASSWORD :'pgpass';
           ALTER USER pgbouncer WITH PASSWORD :'pgpass';
```

Альтернативно, файлы конфигурации можно создавать с помощью элемента верхнего уровня `configs`:

```yaml
services:
  filebrowser:
    image: filebrowser/filebrowser:latest
    environment:
      - POSTGRES_PASSWORD=password
    configs:
      - source: roles
        target: /docker-entrypoint-initdb.d/init-scripts/99-roles.sql

configs:
  roles:
    content: |
      -- ПРИМЕЧАНИЕ: смените пароли для продакшн-окружений
        \set pgpass `echo "$POSTGRES_PASSWORD"`

        ALTER USER authenticator WITH PASSWORD :'pgpass';
        ALTER USER pgbouncer WITH PASSWORD :'pgpass';
```

## Исключение из проверок состояния (Healthchecks)

Если какой-то сервис не должен влиять на общий статус "здоровья" стека, вы можете исключить его, установив опцию `exclude_from_hc` в значение `true`.

::: success Совет
Это полезно, например, для сервисов миграций, которые запускаются один раз и затем останавливаются.
:::

```yaml
services:
  some-service:
    exclude_from_hc: true
    ...
```

## Подключение к предопределенным сетям (Predefined Networks)

По умолчанию каждый стек compose развертывается в отдельную сеть с именем, соответствующим UUID ресурса. Это позволяет сервисам внутри стека общаться друг с другом.

Но иногда нужно связаться с другими ресурсами в вашем аккаунте. Например, подключить приложение к базе данных, развернутой в другом стеке.

Для этого нужно включить опцию `Connect to Predefined Network` на странице стека сервисов. Учтите, что после этого внутренний Docker DNS может работать не так, как ожидалось.

Пример: у вас есть стек с БД `postgres` и приложение `laravel`. Coolify переименовывает ваш стек `postgres` в `postgres-<uuid>`, а `laravel` — в `laravel-<uuid>`, чтобы избежать конфликтов имен.

Если вы включите `Connect to Predefined Network` для стека `laravel`, приложение сможет подключиться к базе, но в качестве хоста БД вам нужно будет использовать `postgres-<uuid>`.

## Развертывание "сырого" Docker Compose (Raw Docker Compose)

Вы можете настроить проект так, чтобы деплоить файл compose напрямую без большей части "магии" Coolify. Это называется `Raw Compose Deployment`.

::: warning Осторожно
Эта функция предназначена для опытных пользователей. Если вы не знакомы с Docker Compose, мы не рекомендуем этот метод.
:::

### Метки (Labels)

Coolify все равно добавит следующие метки (если они не заданы) к вашему приложению:

```yaml
labels:
  - coolify.managed=true
  - coolify.applicationId=5
  - coolify.type=application
```

Чтобы использовать прокси Coolify (Traefik), вам нужно вручную добавить следующие метки:

```yaml
labels:
  - traefik.enable=true
  - "traefik.http.routers.<unique_router_name>.rule=Host(`coolify.io`) && PathPrefix(`/`)"
  - traefik.http.routers.<unique_router_name>.entryPoints=http
```
