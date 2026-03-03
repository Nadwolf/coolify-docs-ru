---
title: "MinIO"
description: "Разверните объектное хранилище (object storage) MinIO в Coolify: высокопроизводительное S3-совместимое хранилище для резервных копий (backups), озер данных (data lakes) и облачных (cloud-native) приложений."
---

# MinIO Community Edition
![MinIO](https://coolify.io/docs/images/services/minio-logo.svg)

::: info ПРИМЕЧАНИЕ
Команда MinIO прекратила предоставлять предварительно собранные (pre-built) образы Docker для новых релизов, [этот репозиторий](https://github.com/coollabsio/minio) от команды Coolify автоматически собирает и публикует их в реестр контейнеров GitHub (GitHub Container Registry) и Docker Hub на основе официальной кодовой базы MinIO на [GitHub](https://github.com/minio/minio?utm_source=coolify.io).
:::

## Что такое MinIO?
MinIO — это высокопроизводительная распределенная система хранения объектов (distributed object storage system), совместимая с API Amazon S3. Оно определяется программным обеспечением (software-defined), работает на стандартном оборудовании (industry-standard hardware) и на 100% является open source под лицензией AGPL v3.0. MinIO предоставляет высокопроизводительное, нативное для Kubernetes (Kubernetes-native) объектное хранилище, разработанное для масштабных рабочих нагрузок (workloads) в области AI/ML, озер данных (data lake) и баз данных.

## Ссылки

- [Официальный сайт](https://min.io?utm_source=coolify.io)
- [MinIO GitHub](https://github.com/minio/minio?utm_source=coolify.io)
- [Community Edition Github](https://github.com/coollabsio/minio?utm_source=coolify.io)

## FAQ (Часто задаваемые вопросы)

### Недействительные учетные данные для входа (Invalid login credentials)

Вам нужно запустить MinIO по протоколу `https` (не самоподписанному (self-signed)), чтобы избежать этой проблемы. MinIO не поддерживает аутентификацию (authentication) на основе http.
