---
title: Настройка бэкапа в AWS S3
description: "Настройте автоматическое резервное копирование Coolify в AWS S3: создание политик IAM, конфигурация бакета, настройка ключей доступа и правил жизненного цикла для экономии."
---

<ZoomableImage src="/docs/images/aws-s3/header.webp" alt="Заголовок Coolify" />

Coolify предлагает автоматическое резервное копирование вашего инстанса в бакет AWS S3, обеспечивая надежный и автономный способ защиты вашей конфигурации и данных.

### Зачем использовать AWS S3 с Coolify?
1. **Надежность и доступность корпоративного уровня:** S3 разработан с расчетом на надежность 99.999999999% и автоматическую репликацию между несколькими дата-центрами, поэтому ваши бэкапы всегда будут в безопасности и доступны.

2. **Оплата по факту использования:** вы платите только за реальный объем хранилища и количество запросов. Встроенные правила жизненного цикла (например, перенос в Glacier) позволяют оптимизировать расходы на долгосрочное хранение.

3. **Бесшовная интеграция:** планировщик бэкапов Coolify работает напрямую с API S3, что исключает необходимость в кастомных скриптах или сторонних инструментах.

### Когда НЕ стоит использовать AWS S3 с Coolify?
1. **Строгие требования к локализации данных:** если ваши правила требуют хранения бэкапов исключительно внутри частного дата-центра, модель публичного облака S3 может вам не подойти.

2. **Отсутствие доступа к внешней сети:** в средах, где заблокирован исходящий интернет-трафик, Coolify не сможет отправлять снимки данных на эндпоинт S3.

---

::: warning Пример данных
В этом руководстве используются следующие примеры. Замените их своими реальными данными при выполнении шагов:
  - **S3 Bucket Name:** envix-coolify-backups-s3
  - **IAM Policy Name:** EnvixCoolifyBackupS3Access
  - **IAM Username:** EnvixCoolifyBackupS3User
  - **Endpoint:** https://s3.ap-northeast-2.amazonaws.com
:::

---

::: details TLDR (краткое содержание)
1. Создайте бакет в консоли AWS.
2. Создайте кастомную политику (Policy) в консоли AWS со следующими правами:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:GetObjectAcl",
        "s3:PutObjectAcl",
        "s3:PutObject"
      ],
      "Resource": [
        "arn:aws:s3:::имя-вашего-бакета",
        "arn:aws:s3:::имя-вашего-бакета/*"
      ]
    }
  ]
}
```

3. Создайте пользователя IAM в консоли AWS и прикрепите к нему созданную политику.
4. В настройках пользователя создайте `Access Key`.
5. Добавьте `Access Key` и `Secret Key` в Coolify при создании нового источника S3.
   ::: success Совет
     Используйте HTTP-эндпоинт S3 без имени бакета, например: `https://s3.eu-central-1.amazonaws.com`.
   :::
:::

## 1. Создание бакета S3
Чтобы создать бакет S3, выполните следующие шаги:

Перейдите по адресу https://console.aws.amazon.com/s3 и нажмите кнопку **Create Bucket**.

<ZoomableImage src="/docs/images/aws-s3/1.webp" alt="Скриншот AWS" />

Вам будет предложено выбрать имя, владельца объектов и т.д.

<ZoomableImage src="/docs/images/aws-s3/2.webp" alt="Скриншот AWS" />

::: info Примечание
Оставьте остальные значения по умолчанию, если не уверены, что именно вы меняете.
:::

<ZoomableImage src="/docs/images/aws-s3/3.webp" alt="Скриншот AWS" />
<br />
<ZoomableImage src="/docs/images/aws-s3/4.webp" alt="Скриншот AWS" />
<br />
<ZoomableImage src="/docs/images/aws-s3/5.webp" alt="Скриншот AWS" />

Нажмите кнопку **Create Bucket**.

После создания бакета вы будете перенаправлены на эту страницу:
<ZoomableImage src="/docs/images/aws-s3/6.webp" alt="Скриншот AWS" />

## 2. Создание политики IAM
Чтобы создать политику IAM:

Перейдите в раздел https://console.aws.amazon.com/iam/home#/policies и нажмите кнопку **Create Policy**.
<ZoomableImage src="/docs/images/aws-s3/7.webp" alt="Скриншот AWS" />
<br />
<ZoomableImage src="/docs/images/aws-s3/8.webp" alt="Скриншот AWS" />

  - Выберите вкладку **JSON** и вставьте следующий код в редактор:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:GetObjectAcl",
        "s3:PutObjectAcl",
        "s3:PutObject"
      ],
      "Resource": [
        "arn:aws:s3:::envix-coolify-backups-s3",
        "arn:aws:s3:::envix-coolify-backups-s3/*"
      ]
    }
  ]
}
```
*(Не забудьте заменить `envix-coolify-backups-s3` на имя вашего бакета в обеих строках).*

Прокрутите вниз и нажмите кнопку **Continue**.

Затем укажите имя политики:
<ZoomableImage src="/docs/images/aws-s3/9.webp" alt="Скриншот AWS" />

После ввода имени прокрутите вниз и нажмите кнопку **Create policy**.

После создания политики вы увидите список:
<ZoomableImage src="/docs/images/aws-s3/10.webp" alt="Скриншот AWS" />
::: success Совет
Новая политика может не сразу появиться в списке, воспользуйтесь поиском по имени.
:::

## 3. Создание пользователя IAM
Чтобы создать пользователя IAM:

Перейдите по адресу https://console.aws.amazon.com/iam/home#/users и нажмите кнопку **Create user**.
<ZoomableImage src="/docs/images/aws-s3/11.webp" alt="Скриншот AWS" />

Укажите имя пользователя:
<ZoomableImage src="/docs/images/aws-s3/12.webp" alt="Скриншот AWS" />
  - Нажмите **Next** после ввода имени.

<ZoomableImage src="/docs/images/aws-s3/13.webp" alt="Скриншот AWS" />
1. Выберите опцию `Attach policies directly`.
2. Найдите и выберите политику, созданную на предыдущем шаге.
3. Нажмите кнопку **Next**.

<ZoomableImage src="/docs/images/aws-s3/14.webp" alt="Скриншот AWS" />
  - Нажмите кнопку **Create user** (на этой странице ничего менять не нужно).

После создания вы вернетесь к списку:
<ZoomableImage src="/docs/images/aws-s3/15.webp" alt="Скриншот AWS" />
  - Нажмите на имя пользователя, чтобы перейти к созданию ключа доступа.

## 4. Создание ключа доступа (Access Key)
На странице пользователя:
<ZoomableImage src="/docs/images/aws-s3/16.webp" alt="Скриншот AWS" />
  - Нажмите на вкладку **Security credentials** и выберите **Create access key**.

<ZoomableImage src="/docs/images/aws-s3/17.webp" alt="Скриншот AWS" />
  - Выберите вариант **Other** и нажмите **Next**.

<ZoomableImage src="/docs/images/aws-s3/18.webp" alt="Скриншот AWS" />
  - Нажмите на кнопку **Create access key**.

<ZoomableImage src="/docs/images/aws-s3/19.webp" alt="Скриншот AWS" />
  - Сохраните **Access Key** и **Secret Access Key** в надежном месте и нажмите **Done**.
  ::: warning Внимание
  Вы не сможете увидеть секретный ключ снова после нажатия кнопки **Done**, поэтому обязательно сохраните его сейчас.
  :::

## 5. Настройка S3 в Coolify

В дашборде Coolify:
<ZoomableImage src="/docs/images/aws-s3/20.webp" alt="Скриншот Coolify" />

1. Перейдите в раздел **Storage** в боковом меню.
2. Нажмите кнопку **Add**.

<ZoomableImage src="/docs/images/aws-s3/21.webp" alt="Скриншот Coolify" />

1. Укажите имя для хранилища S3 (любое).
2. Добавьте краткое описание (опционально).
3. Введите эндпоинт без имени бакета: `https://s3.ВАШ_РЕГИОН.amazonaws.com`.
4. Введите имя созданного бакета.
5. Укажите регион бакета.
6. Вставьте ваш **Access Key**.
7. Вставьте ваш **Secret Access Key**.
8. Нажмите кнопку **Validate Connection & Continue**.

После успешной валидации:
<ZoomableImage src="/docs/images/aws-s3/22.webp" alt="Скриншот Coolify" />

Затем перейдите в **Settings** и выберите **Backup**:
<ZoomableImage src="/docs/images/aws-s3/23.webp" alt="Скриншот Coolify" />
<br />
<ZoomableImage src="/docs/images/aws-s3/24.webp" alt="Скриншот Coolify" />

1. Включите S3.
2. Выберите созданное хранилище S3.
3. Укажите частоту бэкапов (в формате cron).
4. Настройте хранение бэкапов (retention).
5. Нажмите кнопку **Backup Now**, чтобы проверить работу.

Вы можете проверить логи выполнения бэкапов:
<ZoomableImage src="/docs/images/aws-s3/25.webp" alt="Скриншот Coolify" />

Готово! Теперь ваш Coolify настроен на автоматическое сохранение бэкапов в бакете AWS S3.
