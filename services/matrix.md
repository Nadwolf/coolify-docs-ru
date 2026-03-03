---
title: "Matrix"
description: "Запустите сервер Matrix Synapse в Coolify: децентрализованный чат, сквозное шифрование (end-to-end encryption), федерация (federation) и безопасная платформа для общения в реальном времени."
---

# Matrix (Synapse)

<ZoomableImage src="/docs/images/services/matrix-logo.svg" alt="Дашборд Matrix" />

## Что такое Matrix?

Matrix — это децентрализованный протокол связи с открытым исходным кодом, обеспечивающий безопасное общение в реальном времени. Он предоставляет обмен сообщениями со сквозным шифрованием (end-to-end encrypted messaging), голосовые и видеозвонки, обмен файлами и общение в комнатах (room-based conversations). Matrix служит отличной альтернативой проприетарным платформам вроде Slack или Discord, предлагая возможности федерации, которые позволяют различным серверам Matrix взаимодействовать друг с другом.

## Что такое Synapse?

Synapse — это [домашний сервер Matrix (Matrix homeserver)](https://matrix.org/ecosystem/servers/), написанный на Python/Twisted. Он [разрабатывается и поддерживается](https://github.com/element-hq/synapse) командой [Element](https://element.io/), создателями Matrix.

## Варианты развертывания

Сервер Synapse Matrix доступен в двух конфигурациях развертывания в Coolify:

### Synapse со SQlite

- **База данных:** SQLite (встроенная)
- **Сценарий использования:** Простые развертывания, тестирование или персональный хостинг Matrix
- **Компоненты:** Единый контейнер Synapse со встроенной базой данных SQLite

### Synapse с PostgreSQL (рекомендуется)

- **База данных:** PostgreSQL
- **Сценарий использования:** Prod-развертывания (production), требующие лучшей производительности и масштабируемости
- **Компоненты:**
  - Контейнер Synapse
  - Контейнер PostgreSQL
  - Автоматическая настройка базы данных и проверки работоспособности (health checks)

## Шаги установки

Шаги установки одинаковы для всех вариантов развертывания.

### Настройка домена Matrix (важно)

Matrix использует значение, называемое **именем сервера (server name)**, для генерации идентификаторов пользователей (user IDs) и псевдонимов комнат (room aliases).

- Имя сервера `example.org` приведет к:
  - `@user:example.org`
  - `#room:example.org`

Сам сервер Matrix может работать на другом домене, например
`matrix.example.org`.

### Рекомендуемая настройка

- Имя сервера Matrix: `example.org`
- Домен сервиса сервера Matrix Synapse: `matrix.example.org`

Это позволяет пользователям и комнатам использовать `:example.org` при размещении Synapse на поддомене.

### Конфигурация Coolify

#### Домены (Domains)

В конфигурации сервиса установите для домена значение `matrix.example.org:8008`

#### Переменные окружения (Environment variables)

Установите следующую переменную окружения:

- `SYNAPSE_SERVER_NAME=example.org`

### Делегирование (Delegation) (обязательно)

Поскольку Synapse работает на `matrix.example.org`, но идентифицирует себя как `example.org`, требуется [делегирование (delegation)](https://element-hq.github.io/synapse/latest/delegate.html).

На `https://example.org` предоставьте следующие ресурсы:

- `/.well-known/matrix/client` для делегирования сервера (server delegation)

```json
{
  "m.homeserver": {
    "base_url": "https://matrix.example.org"
  }
}
```

- `/.well-known/matrix/server` для обнаружения федерации (Federation discovery)

```json
{
  "m.server": "matrix.example.org:443"
}
```

## Ссылки

- [Официальный сайт](https://matrix.org?utm_source=coolify.io)
- [GitHub](https://github.com/matrix-org/synapse?utm_source=coolify.io)
- [Образ Docker](https://hub.docker.com/r/matrixdotorg/synapse?utm_source=coolify.io)
- [Тестер Федерации Matrix (Matrix Federation Tester)](https://federationtester.matrix.org?utm_source=coolify.io)
