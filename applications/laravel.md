---
title: Laravel
description: Развертывайте PHP-приложения Laravel в Coolify с использованием Nixpacks, воркеров очередей, планировщика, supervisor, интеграции с БД и Redis.
---

# Laravel

Laravel — это веб-фреймворк с выразительным и элегантным синтаксисом. Мы верим, что процесс разработки должен быть приятным и творческим.

Пример репозитория находится [здесь](https://github.com/coollabsio/coolify-examples/tree/main/laravel).

## Развертывание с Nixpacks

### Требования

- Установите `Build Pack` в значение `nixpacks`.
- Установите необходимые [переменные окружения](#переменные-окружения).
- Добавьте файл `nixpacks.toml` со следующей [конфигурацией](#контейнер-«все-в-одном»).
- Установите `Ports Exposes` (проброс портов) в значение `80`.

### Переменные окружения

Если вашему приложению требуется база данных или Redis, вы можете просто создать их заранее в дашборде Coolify.

Вы получите строки подключения, которые можно использовать в вашем приложении, установив их как переменные окружения:

```bash
DB_CONNECTION=mysql
DB_HOST=<DB_HOST>
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=

REDIS_HOST=<REDIS_HOST>
REDIS_PASSWORD=null
REDIS_PORT=6379
```


### Контейнер «все в одном»

Если вы хотите запустить воркер очередей, планировщик и т.д. внутри одного контейнера (рекомендуется), вы можете создать файл `nixpacks.toml` в корне вашего репозитория со следующим содержимым:


```toml
[phases.setup]
nixPkgs = ["...", "python311Packages.supervisor"]

[phases.build]
cmds = [
    "mkdir -p /etc/supervisor/conf.d/",
    "cp /assets/worker-*.conf /etc/supervisor/conf.d/",
    "cp /assets/supervisord.conf /etc/supervisord.conf",
    "chmod +x /assets/start.sh",
    "..."
]

[start]
cmd = '/assets/start.sh'

[staticAssets]
"start.sh" = '''
#!/bin/bash

# Преобразование конфигурации nginx
node /assets/scripts/prestart.mjs /assets/nginx.template.conf /etc/nginx.conf

# Запуск supervisor
supervisord -c /etc/supervisord.conf -n
'''

"supervisord.conf" = '''
[unix_http_server]
file=/assets/supervisor.sock

[supervisord]
logfile=/var/log/supervisord.log
logfile_maxbytes=50MB
logfile_backups=10
loglevel=info
pidfile=/assets/supervisord.pid
nodaemon=false
silent=false
minfds=1024
minprocs=200

[rpcinterface:supervisor]
supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface

[supervisorctl]
serverurl=unix:///assets/supervisor.sock

[include]
files = /etc/supervisor/conf.d/*.conf
'''

"worker-nginx.conf" = '''
[program:worker-nginx]
process_name=%(program_name)s_%(process_num)02d
command=nginx -c /etc/nginx.conf
autostart=true
autorestart=true
stdout_logfile=/var/log/worker-nginx.log
stderr_logfile=/var/log/worker-nginx.log
'''

"worker-phpfpm.conf" = '''
[program:worker-phpfpm]
process_name=%(program_name)s_%(process_num)02d
command=php-fpm -y /assets/php-fpm.conf -F
autostart=true
autorestart=true
stdout_logfile=/var/log/worker-phpfpm.log
stderr_logfile=/var/log/worker-phpfpm.log
'''

"worker-laravel.conf" = '''
[program:worker-laravel]
process_name=%(program_name)s_%(process_num)02d
command=bash -c 'exec php /app/artisan queue:work --sleep=3 --tries=3 --max-time=3600'
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
numprocs=12 # Для уменьшения потребления памяти/CPU измените на 2.
startsecs=0
stopwaitsecs=3600
stdout_logfile=/var/log/worker-laravel.log
stderr_logfile=/var/log/worker-laravel.log
'''

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
php_admin_value[post_max_size] = 35M
php_admin_value[upload_max_filesize] = 30M
'''

"nginx.template.conf" = '''
user www-data www-data;
worker_processes 5;
daemon off;

worker_rlimit_nofile 8192;

events {
  worker_connections  4096;  # По умолчанию: 1024
}

http {
    include    $!{nginx}/conf/mime.types;
    index    index.html index.htm index.php;

    default_type application/octet-stream;
    log_format   main '$remote_addr - $remote_user [$time_local]  $status '
        '"$request" $body_bytes_sent "$http_referer" '
        '"$http_user_agent" "$http_x_forwarded_for"';
    access_log /var/log/nginx-access.log;
    error_log /var/log/nginx-error.log;
    sendfile     on;
    tcp_nopush   on;
    server_names_hash_bucket_size 128; # требуется для некоторых vhosts

    server {
        listen ${PORT};
        listen [::]:${PORT};
        server_name localhost;

        $if(NIXPACKS_PHP_ROOT_DIR) (
            root ${NIXPACKS_PHP_ROOT_DIR};
        ) else (
            root /app;
        )

        add_header X-Content-Type-Options "nosniff";

        client_max_body_size 35M;
     
        index index.php;
     
        charset utf-8;
     

        $if(NIXPACKS_PHP_FALLBACK_PATH) (
            location / {
                try_files $uri $uri/ ${NIXPACKS_PHP_FALLBACK_PATH}?$query_string;
            }
        ) else (
          location / {
                try_files $uri $uri/ /index.php?$query_string;
           }
        )
     
        location = /favicon.ico { access_log off; log_not_found off; }
        location = /robots.txt  { access_log off; log_not_found off; }
     
        $if(IS_LARAVEL) (
            error_page 404 /index.php;
        ) else ()
     
        location ~ \.php$ {
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
            include $!{nginx}/conf/fastcgi_params;
            include $!{nginx}/conf/fastcgi.conf;
        }
     
        location ~ /\.(?!well-known).* {
            deny all;
        }
    }
}
'''
```

### С использованием Inertia.js

При использовании Laravel с [Inertia.js](https://inertiajs.com/) вам может потребоваться указать дополнительную конфигурацию в файле `nixpacks.toml`.


#### Увеличение размера буфера NGINX для запросов Inertia

Из-за [известной проблемы](https://github.com/inertiajs/inertia-laravel/issues/529) с Inertia.js и стандартной конфигурацией NGINX, вам может потребоваться увеличить размер буфера NGINX для корректной обработки запросов Inertia.


```diff toml
"nginx.template.conf" = '''
# ...
http {
    # ...
    server {
        # ...
        location ~ \.php$ {
+            fastcgi_buffer_size 8k;
            fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
            include $!{nginx}/conf/fastcgi_params;
            include $!{nginx}/conf/fastcgi.conf;

            # ...
        }
    }
}
```

#### Inertia SSR (Серверный рендеринг)

Если вы используете Inertia.js с [серверным рендерингом (SSR)](https://inertiajs.com/server-side-rendering), вам следует добавить еще один воркер в файл `nixpacks.toml` для автоматического запуска SSR-сервера.


```toml
"worker-inertia-ssr.conf" = '''
[program:inertia-ssr]
process_name=%(program_name)s_%(process_num)02d
command=bash -c 'exec php /app/artisan inertia:start-ssr'
autostart=true
autorestart=true
stderr_logfile=/var/log/worker-inertia-ssr.log
stdout_logfile=/var/log/worker-inertia-ssr.log
'''
```

> [!NOTE]
> По умолчанию Nixpacks выполняет команду `npm run build` для сборки вашего приложения во время развертывания. Убедитесь, что ваш скрипт `build` в `package.json` содержит необходимые команды для серверного рендеринга. Если вы используете один из официальных стартовых наборов с Inertia.js, измените свои скрипты следующим образом:
> ```diff
> "scripts": {
>-     "build": "vite build",
>+     "build": "vite build && vite build --ssr",
>     "build:ssr": "vite build && vite build --ssr",
> }
> ```
> Также, если вы не хотите менять стандартный скрипт `build` в `package.json`, вы можете добавить правильную команду сборки для SSR прямо в файл конфигурации `nixpacks.toml`.
>```diff
>[phases.build]
>cmds = [
>+    "npm run build:ssr",
>    "mkdir -p /etc/supervisor/conf.d/",
>    "cp /assets/worker-*.conf /etc/supervisor/conf.d/",
>    "cp /assets/supervisord.conf /etc/supervisord.conf",
>    "chmod +x /assets/start.sh",
>    "..."
> ]
>```

### Настройка php.ini

Если вы хотите изменить настройки в вашем файле `php.ini`, вы можете сделать это с помощью директивы `php_admin_value`, добавив их в файл `php-fpm.conf` следующим образом:

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

## Развертывание с Dockerfile и Nginx Unit

### Необходимые условия

1. Создайте новый ресурс из приватного или публичного репозитория.
2. Установите поле `Ports Exposes`, например, в значение `8000`.
3. Задайте переменные окружения по умолчанию, используя «Вид для разработчика» (`Developer view`) в разделе `Environment Variables`:

```sh
APP_DEBUG=false
APP_ENV=staging
APP_KEY= #ВашКлючПриложения
APP_MAINTENANCE_DRIVER=file
APP_NAME=Laravel
CACHE_STORE=file
DB_CONNECTION= #ВашеПодключениеКБД
DB_DATABASE= #ВашаБД
DB_HOST= #ВашХостБД
DB_PASSWORD= #ВашПарольБД
DB_PORT= #ВашПортБД
DB_USERNAME= #ВашПользовательБД
FILESYSTEM_DISK=public
MAIL_MAILER=log
SESSION_DRIVER=file
```

4. Создайте `Dockerfile` в корне проекта со следующим содержимым:

```Dockerfile
FROM unit:1.34.1-php8.3

RUN apt update && apt install -y \
    curl unzip git libicu-dev libzip-dev libpng-dev libjpeg-dev libfreetype6-dev libssl-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) pcntl opcache pdo pdo_mysql intl zip gd exif ftp bcmath \
    && pecl install redis \
    && docker-php-ext-enable redis

RUN echo "opcache.enable=1" > /usr/local/etc/php/conf.d/custom.ini \
    && echo "opcache.jit=tracing" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "opcache.jit_buffer_size=256M" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "memory_limit=512M" > /usr/local/etc/php/conf.d/custom.ini \        
    && echo "upload_max_filesize=64M" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "post_max_size=64M" >> /usr/local/etc/php/conf.d/custom.ini

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

WORKDIR /var/www/html

RUN mkdir -p /var/www/html/storage /var/www/html/bootstrap/cache

RUN chown -R unit:unit /var/www/html/storage bootstrap/cache && chmod -R 775 /var/www/html/storage

COPY . .

RUN chown -R unit:unit storage bootstrap/cache && chmod -R 775 storage bootstrap/cache

RUN composer install --prefer-dist --optimize-autoloader --no-interaction

COPY unit.json /docker-entrypoint.d/unit.json

EXPOSE 8000

CMD ["unitd", "--no-daemon"]
```

3. Создайте файл `unit.json` (в нижнем регистре) в корне вашего проекта со следующим содержимым:

```json
{
    "listeners": {
        "*:8000": {
            "pass": "routes",
            "forwarded": {
                "protocol": "X-Forwarded-Proto",
                "source": ["<IP балансировщика, подсеть и т.д.>"]
            }
        }
    },

    "routes": [
        {
            "match": {
                "uri": "!/index.php"
            },
            "action": {
                "share": "/var/www/html/public$uri",
                "fallback": {
                    "pass": "applications/laravel"
                }
            }
        }
    ],

    "applications": {
        "laravel": {
            "type": "php",
            "root": "/var/www/html/public/",
            "script": "index.php"
        }
    }
}
```
> [!NOTE]
> При использовании docker-compose для развертывания может возникнуть ошибка «Mixed content error», когда часть ресурсов запрашивается через `http://` вместо `https://`. Чтобы избежать этого, найдите IP-адрес или подсеть вашего балансировщика нагрузки/прокси и добавьте его в `unit.json`, чтобы явно указать Unit передавать правильные заголовки в Laravel. Laravel также должен быть настроен на доверие прокси. Подробнее об этом [здесь](https://laravel.com/docs/12.x/requests#configuring-trusted-proxies).
> ```json
> "listeners": {
>        "*:8000": {
>            "pass": "routes",
>            "forwarded": {
>                "protocol": "X-Forwarded-Proto",
>                "source": ["<IP балансировщика, подсеть и т.д.>"]
>            }
>        }
>    },
>```

4. Установите команду «После деплоя» (`Post-deployment script`):

```sh
php artisan optimize:clear && php artisan config:clear && php artisan route:clear && php artisan view:clear && php artisan optimize
```
