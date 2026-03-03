---
title: "Ente"
description: "Здесь вы найдете документацию по размещению Ente с помощью Coolify."
---

# Ente

![Ente](https://coolify.io/docs/images/services/ente-logo.webp)

## Что такое Ente?

Ente — это сервис, предоставляющий полностью открытую (open-source) платформу со сквозным шифрованием (end-to-end encrypted) для хранения ваших данных в облаке без необходимости доверять поставщику услуг. На базе этой платформы Ente на данный момент создал два приложения: Ente Photos (альтернатива Apple и Google Photos) и Ente Auth (альтернатива устаревшему Authy для двухфакторной аутентификации - 2FA).

Узнайте больше на [help.ente.io](https://help.ente.io/).

## Настройка хранилища объектов (Object Store)

- После выбора сервиса вам потребуется настроить несколько переменных окружения (environment variables) для вашего S3-бакета (bucket) или его заменителя, такого как MinIO.

### 1. Удаленный S3-бакет

- Для AWS S3 вы можете создать бакет и разрешить доступ через IAM Roles/User Permissions (Роли IAM / Разрешения пользователя). Это сгенерирует ключ доступа (access key) и секретный ключ (secret key) для вашего S3-бакета.

- Для S3-бакета примените следующую политику CORS для правильного управления доступом со стороны сервиса `museum`.

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD", "POST", "PUT", "DELETE"],
    "MaxAgeSeconds": 3000,
    "ExposeHeaders": ["Etag"]
  }
]
```

- Заполните учетные данные (credentials), такие как `endpoint`, `region`, `bucket`, `access key`, `secret key`.

- Разверните сервис, и все готово к работе.

### 2. Бакет Minio в Coolify.

- Ожидается, что Minio будет доступен по HTTPS и требует SSL/TLS, поэтому убедитесь, что ваши прокси-серверы настроены правильно. Вот полезная [ссылка](https://selfhostschool.com/minio-self-hosted-s3-storage-guide/) для установки и настройки.

- После развертывания сервиса Minio из Coolify вы можете войти в сервис по URL консоли (console URL) и использовать те же логин и пароль, что заданы в переменных окружения. Используйте URL API (API URL) для бекенда или сценариев использования на основе оболочки (shell).

```bash
# Set Alias
mc alias set <alias> <API_ENDPOINT> <ACCESS_KEY> <SECRET_KEY>

# List buckets (same us used in coolify to validate S3)
minio/mc ls myminio
```

- После входа в систему создайте бакет для использования в Ente.

- Регион по умолчанию для Minio — `us-east-1`, вы можете использовать его же.

- Используйте URL-адрес конечной точки API (API endpoint) в качестве endpoint'а бакета в конфигурации Ente.

**Примечание**: Дополнительные сведения доступны [здесь](https://help.ente.io/self-hosting/administration/object-storage).

## Переменные окружения (Environment Variables)

| Имя переменной (Variable Name)        | Сервис (Service)| Описание (Description)                                                                      | Значение по умолчанию | Обязательно | Предзаполнено |
| ------------------------------------- | -------- | ------------------------------------------------------------------------------------------- | ------------------ | -------- | --------- |
| `SERVICE_URL_MUSEUM_8080`             | museum   | URL для сервиса museum на порту 8080                                                        | -                  | Да       | Да        |
| `ENTE_HTTP_USE_TLS`                   | museum   | Включить/выключить TLS для HTTP соединений                                                  | `false`            | Нет      | Да        |
| `SERVICE_URL_WEB_3002`                | museum   | URL для веб-сервиса albums                                                                  | -                  | Да       | Да        |
| `SERVICE_URL_WEB_3004`                | museum   | URL для веб-сервиса cast                                                                    | -                  | Да       | Да        |
| `SERVICE_URL_WEB_3001`                | museum   | URL для веб-сервиса accounts                                                                | -                  | Да       | Да        |
| `ENTE_DB_HOST`                        | museum   | Хост базы данных PostgreSQL                                                                 | `postgres`         | Нет      | Да        |
| `ENTE_DB_PORT`                        | museum   | Порт базы данных PostgreSQL                                                                 | `5432`             | Нет      | Да        |
| `ENTE_DB_NAME`                        | museum   | Имя базы данных PostgreSQL                                                                  | `ente_db`          | Нет      | Да        |
| `SERVICE_USER_POSTGRES`               | museum   | Имя пользователя базы данных PostgreSQL                                                     | `pguser`           | Нет      | Да        |
| `SERVICE_PASSWORD_POSTGRES`           | museum   | Пароль базы данных PostgreSQL                                                               | -                  | Да       | Да        |
| `SERVICE_REALBASE64_ENCRYPTION`       | museum   | Ключ шифрования (encryption key) в кодировке Base64                                         | -                  | Да       | Да        |
| `SERVICE_REALBASE64_64_HASH`          | museum   | Хэш-ключ (hash key) в кодировке Base64                                                      | -                  | Да       | Да        |
| `SERVICE_REALBASE64_JWT`              | museum   | Секрет JWT (JWT secret) в кодировке Base64                                                  | -                  | Да       | Да        |
| `ENTE_INTERNAL_ADMIN`                 | museum   | ID внутреннего пользователя-администратора (Internal admin user ID)                         | `1580559962386438` | Нет      | Да        |
| `ENTE_INTERNAL_DISABLE_REGISTRATION`  | museum   | Отключить регистрацию пользователей                                                         | `false`            | Нет      | Да        |
| `PRIMARY_STORAGE_ARE_LOCAL_BUCKETS`   | museum   | Использовать локальные бакеты для основного хранилища (false, если вы не подключаетесь к бакету по http) | `false`            | Нет      | Да        |
| `PRIMARY_STORAGE_USE_PATH_STYLE_URLS` | museum   | Использовать path-style URL-адреса для хранилища                                            | `true`             | Нет      | Да        |
| `S3_STORAGE_KEY`                      | museum   | Ключ доступа к хранилищу S3 (S3 storage access key)                                         | -                  | Да       | Нет       |
| `S3_STORAGE_SECRET`                   | museum   | Секретный ключ к хранилищу S3 (S3 storage secret key)                                       | -                  | Да       | Нет       |
| `S3_STORAGE_ENDPOINT`                 | museum   | URL конечной точки хранилища S3 (S3 storage endpoint URL)                                   | -                  | Да       | Нет       |
| `S3_STORAGE_REGION`                   | museum   | Регион хранилища S3 (S3 storage region)                                                     | `us-east-1`        | Нет      | Да        |
| `S3_STORAGE_BUCKET`                   | museum   | Имя бакета хранилища S3 (S3 storage bucket name)                                            | -                  | Да       | Нет       |
| `SERVICE_URL_WEB_3000`                | web      | URL для основного веб-сервиса (main web service)                                            | -                  | Да       | Да        |
| `SERVICE_URL_MUSEUM`                  | web      | URL для сервиса museum                                                                      | -                  | Да       | Да        |
| `SERVICE_URL_WEB_3002`                | web      | URL для сервиса albums                                                                      | -                  | Да       | Да        |
| `SERVICE_USER_POSTGRES`               | postgres | Имя пользователя PostgreSQL                                                                 | `pguser`           | Нет      | Да        |
| `SERVICE_PASSWORD_POSTGRES`           | postgres | Пароль PostgreSQL                                                                           | -                  | Да       | Да        |
| `SERVICE_DB_NAME`                     | postgres | Имя базы данных PostgreSQL                                                                  | `ente_db`          | Нет      | Да        |

## Ссылки

- [Официальный сайт](https://ente.io?utm_source=coolify.io)
- [Документация](https://help.ente.io?utm_source=coolify.io)
- [GitHub](https://github.com/ente-io/ente?utm_source=coolify.io)
