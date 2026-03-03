---
title: "MinIO"
description: "Разверните объектное хранилище (object storage) MinIO в Coolify: высокопроизводительное S3-совместимое хранилище для резервных копий (backups), озер данных (data lakes) и облачных (cloud-native) приложений."
---

# MinIO Community Edition

![MinIO](https://coolify.io/docs/images/services/minio-logo.svg)

::: danger СЕРВИС УДАЛЕН ИЗ COOLIFY
Этот сервис был удален из каталога сервисов в один клик Coolify, поскольку он больше не получает официальных образов Docker и в настоящее время находится в режиме обслуживания (maintenance mode) оригинальным автором. Вы можете найти дополнительную информацию о статусе обслуживания проекта [здесь](https://github.com/minio/minio?tab=readme-ov-file#maintenance-mode).

Последний образ Docker, опубликованный оригинальным автором, не включает исправление следующей уязвимости безопасности: https://github.com/minio/minio/security/advisories/GHSA-jjjj-jwhf-8rgr

Мы рекомендуем использовать **поддерживаемый сообществом сервис MinIO (Community-maintained MinIO service) в Coolify**, который обеспечивает автоматические сборки Docker на основе официальной кодовой базы MinIO. Вы можете узнать больше об использовании версии Community [здесь](/services/minio-community-edition).
:::

## Что такое MinIO?

MinIO — это высокопроизводительная распределенная система хранения объектов (distributed object storage system), совместимая с API Amazon S3. Оно определяется программным обеспечением (software-defined), работает на стандартном оборудовании (industry-standard hardware) и на 100% является open source под лицензией AGPL v3.0. MinIO предоставляет высокопроизводительное, нативное для Kubernetes (Kubernetes-native) объектное хранилище, разработанное для масштабных рабочих нагрузок (workloads) в области AI/ML, озер данных (data lake) и баз данных.

## Ссылки

- [Официальный сайт](https://min.io?utm_source=coolify.io)
- [Документация](https://min.io/docs/minio/linux/index.html?utm_source=coolify.io)
- [GitHub](https://github.com/minio/minio?utm_source=coolify.io)
- [Информация о Community Edition](https://github.com/coollabsio/minio?utm_source=coolify.io)

## FAQ (Часто задаваемые вопросы)

### Недействительные учетные данные для входа (Invalid login credentials)

Вам нужно запустить MinIO по протоколу `https` (не самоподписанному (self-signed)), чтобы избежать этой проблемы. MinIO не поддерживает аутентификацию (authentication) на основе http.
