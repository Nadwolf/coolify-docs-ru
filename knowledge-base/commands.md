---
title: Команды
description: "Основные CLI-команды Coolify для сброса пароля root, изменения email и удаления зависших сервисов через Docker exec и Artisan."
---

# Команды

## Сброс пароля root без SMTP
Вы можете использовать следующий метод для сброса пароля пользователя root, если вы его забыли и у вас не настроен SMTP-сервер (из-за чего вы не можете запросить восстановление пароля через почту).

Зайдите на ваш сервер через SSH и выполните следующую команду:

```bash
docker exec -ti coolify sh -c "php artisan root:reset-password"
```

## Изменение email root
Вы также можете изменить email пользователя root.

Зайдите на ваш сервер через SSH и выполните следующую команду:

```bash
docker exec -ti coolify sh -c "php artisan root:change-email"
```

## Удаление зависшего сервиса
Вы можете легко удалить зависший сервис.

Зайдите на ваш сервер через SSH и выполните следующую команду:

```bash
docker exec -ti coolify sh -c "php artisan services:delete"
```
