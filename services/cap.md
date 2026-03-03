---
title: "Cap"
description: "Здесь вы найдете документацию по размещению Cap с помощью Coolify."
---

<ZoomableImage src="/docs/images/services/cap.svg" />

## Что такое Cap?

Cap — это open-source альтернатива Loom. Легковесный, мощный и кроссплатформенный инструмент. Записывайте и делитесь видео в считанные секунды.

## Как развернуть (Self-host)

Доступны два варианта хранения: вы можете хранить видеоданные в удаленном хранилище, например, S3 или R2, или же выбрать менее рекомендуемый вариант хранения непосредственно на локальном VPS (или другом VPS) через сервис MinIO.

### Вариант 1: Удаленное S3-совместимое хранилище (AWS S3, Cloudflare R2 и т.д.)

Установите следующие переменные окружения:

- `CAP_AWS_ACCESS_KEY`: Ваш S3/R2 ключ доступа (access key)
- `CAP_AWS_SECRET_KEY`: Ваш S3/R2 секретный ключ (secret key)
- `CAP_AWS_BUCKET`: Имя вашего S3/R2 бакета (bucket)
- `CAP_AWS_REGION`: Ваш S3/R2 регион (например: us-east-1, auto для R2)
- `CAP_AWS_ENDPOINT`: Ваш S3/R2 endpoint URL
- `S3_PUBLIC_ENDPOINT`: Публичный endpoint для вашего бакета (в большинстве случаев совпадает с CAP_AWS_ENDPOINT)
- `S3_INTERNAL_ENDPOINT`: Внутренний endpoint (в большинстве случаев совпадает с CAP_AWS_ENDPOINT)
- `S3_PATH_STYLE`: true для R2/большинства S3-совместимых хранилищ, false для AWS S3 virtual-hosted style

### Вариант 2: Локальное хранилище MinIO

Разверните MinIO как отдельный сервис в той же сети и укажите:

- `CAP_AWS_ACCESS_KEY`: Корневой пользователь (root user) MinIO
- `CAP_AWS_SECRET_KEY`: Пароль корневого пользователя (root password) MinIO
- `CAP_AWS_BUCKET`: Имя вашего бакета (например: capso)
- `CAP_AWS_REGION`: us-east-1 (или любой другой регион)
- `CAP_AWS_ENDPOINT`: http://minio:9000 (внутренний endpoint MinIO)
- `S3_PUBLIC_ENDPOINT`: http://your-minio-domain:9000 (публичный endpoint MinIO)
- `S3_INTERNAL_ENDPOINT`: http://minio:9000 (внутренний endpoint MinIO)
- `S3_PATH_STYLE`: true

## Ссылки для входа по электронной почте (Email Login Links)

Если переменные окружения `RESEND_API_KEY` и `RESEND_FROM_DOMAIN` не установлены, ссылки для входа будут записываться в логи сервера. Чтобы отправлять ссылки для входа по email, вам нужно настроить [Resend](https://resend.com):

1. Создайте аккаунт на [Resend](https://resend.com)
2. Подключите домен и задайте его как `RESEND_FROM_DOMAIN`
3. Сгенерируйте API-ключ и задайте его как `RESEND_API_KEY`

## Как снять лимиты (места в организации и записи)

<!-- Рекомендуемый метод из https://github.com/coollabsio/coolify/pull/6011#pullrequestreview-3337020957 -->
1. Откройте терминал MySQL-сервиса
2. Подключитесь к базе данных: `mysql -u root -p planetscale` и введите `MYSQL_ROOT_PASSWORD` при запросе пароля
3. Выполните приведенную ниже SQL-команду, заменив `your-user-id` на ваш фактический ID пользователя:
    ```sql
    UPDATE users SET inviteQuota = 100, stripeSubscriptionId = '12345', subscriptionStatus = 'active' WHERE id = 'your-user-id';
    ```
4. Вы можете проверить изменения, выполнив следующую команду:
    ```sql
    SELECT * FROM users WHERE id = 'your-user-id';
    ```

## Скриншоты

<ZoomableImage src="/docs/images/services/cap-app.webp" />

## Ссылки

- [Официальный сайт ›](https://cap.so/)
- [GitHub ›](https://github.com/CapSoftware/Cap)
