---
title: "Superset"
description: "Разверните Superset в Coolify для современного исследования данных, интерактивных дашбордов, SQL-редактора и визуализации бизнес-аналитики (BI)."
---

# Superset

<ZoomableImage src="/docs/images/services/superset-logo.svg" alt="Логотип Superset" />

## Что такое Superset?

Superset — это современная платформа для исследования и визуализации данных. Superset может заменить или дополнить проприетарные инструменты бизнес-аналитики для многих команд. Superset отлично интегрируется с различными источниками данных.

## Неофициальный Docker-образ (Unofficial Docker Image)

По умолчанию Superset [не поддерживает использование docker-compose в продакшене](https://github.com/amancevice/docker-superset). Шаблон Superset в Coolify использует [сторонний неофициальный Docker-образ, созданный amancevice](https://github.com/amancevice/docker-superset).

## Использование (Usage)

### Первоначальная настройка

После развертывания шаблона вам потребуется инициализировать базу данных и создать пользователя-администратора. Это можно сделать следующим образом:

1. Откройте терминальную сессию в Docker-контейнере Superset.

2. Выполните одну из команд ниже (обратите внимание на символ `-`):

    ```bash
    # Базовая инициализация
    superset-init

    # Кроме того, чтобы также загрузить демонстрационные данные, используйте
    superset-demo
    ```

    Исходный код этих скриптов доступен [здесь](https://github.com/amancevice/docker-superset/tree/main/bin).

3. Ответьте на все вопросы в подсказках.

Видеоинструкции к этому процессу вы можете найти в [pull request #4891 в репозитории Coolify на GitHub](https://github.com/coollabsio/coolify/pull/4891).

### Подключение к другим базам данных в сети Coolify

Если вы хотите подключиться к базам данных, размещенным в Coolify, но находящимся вне шаблона сервиса Superset, вам нужно включить опцию: [Connect to Predefined Networks](https://coolify.io/docs/knowledge-base/docker/compose#connect-to-predefined-networks) (Подключение к предустановленным сетям).

### Настройка Superset

Пожалуйста, обратитесь к [официальной документации](https://superset.apache.org/docs/configuration/configuring-superset), чтобы узнать, как вы можете настроить свой файл `superset_config.py`.

Этот конфигурационный файл Python можно редактировать через интерфейс Coolify, перейдя в раздел [Persistent Storage](https://coolify.io/docs/knowledge-base/persistent-storage) (Постоянное хранилище) вашего сервиса на вкладке Configuration.

## Ссылки

- [Официальный сайт](https://superset.apache.org)
- [GitHub](https://github.com/apache/superset)
- [Неофициальный Docker-образ на GitHub](https://github.com/amancevice/docker-superset)
