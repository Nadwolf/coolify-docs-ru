---
title: ClickHouse
description: Развертывайте ClickHouse в Coolify — колоночную СУБД для OLAP, аналитику в реальном времени, бэкапы в S3 и исключительную производительность запросов.
---

# Clickhouse

 <ZoomableImage src="/docs/images/database-logos/clickhouse.webp" alt="Coolify clickhouse" />

## Что такое ClickHouse

ClickHouse — это колоночная система управления базами данных с открытым исходным кодом, предназначенная для онлайн-аналитической обработки запросов (OLAP).

Она известна своей исключительной производительностью при выполнении запросов к большим наборам данных, что делает её идеальной для аналитики в реальном времени и приложений хранилищ данных.

ClickHouse использует колоночный формат хранения данных и применяет различные оптимизации, такие как векторизованное выполнение запросов, для достижения высокой производительности.

Она поддерживает SQL с расширениями и может обрабатывать как пакетную, так и потоковую загрузку данных, что делает её универсальной для различных аналитических нагрузок.

## Руководство по резервному копированию и восстановлению

В настоящее время Coolify не поддерживает изменение конфигураций ClickHouse, что означает невозможность использования некоторых нативных вариантов резервного копирования (например, резервное копирование на локальный диск или использование `ALTER TABLE ... FREEZE PARTITION ...`). Вместо этого рекомендуется использовать S3 для бэкапов.

### Как сделать бэкап ClickHouse

Для резервного копирования таблицы или всей базы данных используйте следующую SQL-команду:

- **Бэкап таблицы:**

```sql
BACKUP TABLE <table_name> TO S3('<your_s3_endpoint_com>/<unique_folder_for_table_backup>', '<s3_access_key>', '<s3_secret_key>')
```

- **Бэкап базы данных:**
  Замените `TABLE` на `DATABASE`, чтобы сделать бэкап всей базы данных:

```sql
BACKUP DATABASE <database_name> TO S3('<your_s3_endpoint_com>/<unique_folder_for_database_backup>', '<s3_access_key>', '<s3_secret_key>')
```

### Как восстановить ClickHouse

Чтобы восстановить таблицу или базу данных из бэкапа в S3, используйте соответствующую команду RESTORE:

- **Восстановление таблицы:**

```sql
RESTORE TABLE <table_name> FROM S3('<your_s3_endpoint_com>/<unique_folder_from_table_backup>', '<s3_access_key>', '<s3_secret_key>')
```

- **Восстановление базы данных:**
  Замените `TABLE` на `DATABASE`, чтобы восстановить всю базу данных:

```sql
RESTORE DATABASE <database_name> FROM S3('<your_s3_endpoint_com>/<unique_folder_from_database_backup>', '<s3_access_key>', '<s3_secret_key>')
```

### Что не работает

- **Бэкапы на диск (Disk Backups):**

```sql
BACKUP TABLE test.table TO Disk('backups', '1.zip')
```

Не работает из-за того, что Coolify не позволяет изменять конфигурации ClickHouse.

- **Нативная «заморозка» партиций (Partition Freezes):**

```sql
ALTER TABLE ... FREEZE PARTITION ...
```

Может не работать из-за ограничений в структуре файлов Docker/Coolify.

- **Инструмент clickhouse-backup:**
  Внешние инструменты, такие как [clickhouse-backup](https://github.com/Altinity/clickhouse-backup?utm_source=coolify.io), могут функционировать некорректно внутри связки Docker/Coolify из-за аналогичных ограничений конфигурации.

### Примечания по производительности

Участник сообщества поделился, что резервное копирование базы данных объемом 145 ГБ заняло около 12 минут, а её восстановление — примерно 17 минут.

## Ссылки

- [Официальный сайт](https://clickhouse.com/?utm_source=coolify.io)
- [GitHub](https://github.com/ClickHouse/ClickHouse?utm_source=coolify.io)
