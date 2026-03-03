---
title: Symfony
description: Развертывайте PHP-приложения Symfony в Coolify с использованием Nixpacks, миграций Doctrine, подключений к БД и конфигурации доверенного прокси.
---

# Symfony

Symfony — это ведущий PHP-фреймворк для создания веб-сайтов и веб-приложений, построенный на базе компонентов Symfony.

## Требования

- Установите `Build Pack` в значение `nixpacks`.
- Установите `APP_ENV`.
- Установите `APP_SECRET`.
- Установите `NIXPACKS_PHP_FALLBACK_PATH` в значение `/index.php`.
- Установите `NIXPACKS_PHP_ROOT_DIR` в значение `/app/public`.
- Установите `Ports Exposes` (проброс портов) в значение `80`.

### Миграции базы данных

Если вы используете Doctrine, вы можете добавить следующий «скрипт после деплоя» (`Post-deployment script`):

`php bin/console doctrine:migrations:migrate --all-or-nothing --no-interaction`

### Другие компоненты

Если вашему приложению требуется база данных или Redis, вы можете просто создать их заранее в дашборде Coolify.

Вы получите строки подключения, которые можно использовать в вашем приложении, установив их как переменные окружения:

```bash
DATABASE_URL=postgresql://app:!ChangeMe!@127.0.0.1:5432/app?serverVersion=16&charset=utf8

REDIS_HOST=<REDIS_HOST>
REDIS_PASSWORD=null
REDIS_PORT=6379
```

### Доверенный прокси (Trusted proxy)

Возможно, вам потребуется настроить [доверенный прокси](https://symfony.com/doc/current/deployment/proxies.html):

- Установите переменную окружения `TRUSTED_PROXIES` с IP-адресом вашего сервера.
- Добавьте следующую конфигурацию Symfony:

```yaml
# config/packages/framework.yaml

framework:
    trusted_proxies: "%env(TRUSTED_PROXIES)%"
    trusted_headers: ['x-forwarded-for', 'x-forwarded-host', 'x-forwarded-proto', 'x-forwarded-port', 'x-forwarded-prefix']
```

### Настройка php.ini

Если вы хотите изменить настройки из вашего файла `php.ini`, вы можете легко сделать это с помощью директивы `php_admin_value`, добавив их в файл `php-fpm.conf` следующим образом:

```toml
"php-fpm.conf" = '''
[www]
listen = 127.0.0.1:9000
user = www-data
group = www-data
listen.owner = www-data
listen.group = www-data
pm = dynamic
pm.max_children = 50
pm.min_spare_servers = 4
pm.max_spare_servers = 32
pm.start_servers = 18
clear_env = no

php_admin_value[memory_limit] = 512M
php_admin_value[max_execution_time] = 60
php_admin_value[max_input_time] = 60
php_admin_value[post_max_size] = 256M
'''
```
