---
title: Резервное копирование (Backups)
description: Настройте регулярное резервное копирование баз данных PostgreSQL, MySQL, MariaDB и MongoDB с использованием выражений cron и интеграцией с хранилищем S3.
---

# Резервное копирование

Запланированное резервное копирование можно настроить для PostgreSQL и для самой Coolify.

Это расписание основано на выражениях cron, поэтому вы можете настроить его работу так часто, как вам нужно.

Вы также можете использовать простые строки для cron:

```js
const VALID_CRON_STRINGS = [
    'every_minute' => '* * * * *',
    'hourly' => '0 * * * *',
    'daily' => '0 0 * * *',
    'weekly' => '0 0 * * 0',
    'monthly' => '0 0 1 * *',
    'yearly' => '0 0 1 1 *',
];
```

## PostgreSQL

Coolify создает полную резервную копию ваших баз данных PostgreSQL. Вы можете указать, какие базы данных копировать, перечислив их через запятую.

::: info Совет
Собственная база данных Coolify также копируется этим методом.
:::

### Команда резервного копирования

```bash
pg_dump --format=custom --no-acl --no-owner --username <username> <databaseName>
```

### Команда восстановления

Резервная копия имеет кастомный формат (custom format), поэтому её можно восстановить следующей командой (или любым эквивалентным инструментом):

```bash
pg_restore --verbose --clean -h localhost -U postgres -d postgres pg-dump-postgres-1697207547.dmp
```

## MySQL

```bash
mysqldump -u root -p <password> <datatabaseName>
```

## MariaDB

```bash
mariadb-dump -u root -p <password> <datatabaseName>
```

## MongoDB

```bash
mongodump --authenticationDatabase=admin --uri=<uri> --gzip --archive=<archive>
```

Или, если вы хотите исключить некоторые коллекции:

```bash
mongodump --authenticationDatabase=admin --uri=<uri> --gzip --archive=<archive> --excludeCollection=<collectionName> --excludeCollection=<collectionName>
```

## Бэкапы в S3

Вы также можете определить свое собственное [S3-совместимое](/knowledge-base/s3/introduction) хранилище для хранения ваших резервных копий.
