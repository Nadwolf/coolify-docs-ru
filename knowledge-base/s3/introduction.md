---
title: "Введение"
description: "Настройка S3-совместимого хранилища для бэкапов Coolify: AWS, DigitalOcean Spaces, MinIO, Cloudflare R2, Backblaze B2 и Scaleway Object Storage."
---

# Введение в S3
На данный момент поддерживаются следующие S3-совместимые хранилища:

- AWS (см. [руководство по AWS](/knowledge-base/s3/aws) для получения подробных инструкций).
- DigitalOcean Spaces.
- MinIO.
- Cloudflare R2.
- Backblaze B2.
- Scaleway Object Storage.
- Hetzner S3 Storage (бета).
- Wasabi hot cloud storage.
- Vultr.
- CloudPe Object Storage.

Другие хранилища тоже могут работать, но они еще не тестировались. Если вы проверите работу с другим провайдером, пожалуйста, дайте нам знать.

## S3 Клиент

Для копирования файлов бэкапов в ваше S3-совместимое хранилище Coolify использует клиент MinIO, который называется [`mc`](https://min.io/docs/minio/linux/reference/minio-mc.html).

## Верификация

Чтобы использовать ваше S3-совместимое хранилище, его нужно сначала верифицировать (проверить). Верификация выполняется с помощью запроса `ListObjectsV2` к указанному вами бакету (bucket).

Поэтому сначала создайте бакет, а затем приступайте к верификации в Coolify.
