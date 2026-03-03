---
title: Ручное отключение 2FA
description: Отключите двухфакторную аутентификацию в Coolify вручную через SSH, Docker exec и Laravel Tinker, если вы потеряли доступ к устройству или кодам.
---

# Ручное отключение 2FA

Если вы потеряли доступ к устройству с 2FA или у вас возникли другие проблемы, вы можете отключить двухфакторную аутентификацию вручную, если у вас есть доступ к серверу по SSH.

## 1. Войдите на сервер через SSH

```bash
ssh IP_ВАШЕГО_СЕРВЕРА
```

## 2. Войдите в контейнер Coolify

Выполните команду:

```bash
docker exec -it coolify sh
```

## 3. Запустите Tinker

```bash
php artisan tinker
```

## 4. Найдите ID пользователя

> Для пользователя `root` ID всегда равен `0`.

> Таким образом: `$user_id = 0`;

> Для любого другого пользователя используйте следующую команду, чтобы узнать его ID:

```php
$user_id = User::whereEmail('your-email@example.com')->first()->id;
```

## 5. Отключите 2FA

Выполните в консоли Tinker:

```php
User::find($user_id)->update([
  'two_factor_secret' => null,
  'two_factor_recovery_codes' => null,
  'two_factor_confirmed_at' => null
]);
```