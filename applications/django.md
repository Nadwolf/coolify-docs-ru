---
title: Django
description: Развертывайте приложения Django в Coolify с использованием gunicorn, автоматическими сборками, переменными окружения и управлением пакетами Python.
---

# Django

Django — это высокоуровневый веб-фреймворк на языке Python, который способствует быстрой разработке и чистому, прагматичному дизайну.

## Требования

1. Установите базовую директорию (base directory), в которой расположены файлы `requirements.txt` и `manage.py`.

> В примере репозитория это `/coolify`.

2. Добавьте `gunicorn` в файл `requirements.txt` ([официальная документация](https://docs.gunicorn.org/en/stable/install.html)).
3. Добавьте `localhost` и ваш `домен` в список `ALLOWED_HOSTS` в файле `settings.py` ([официальная документация](https://docs.djangoproject.com/en/4.2/ref/settings/#allowed-hosts)).

> Значение `localhost` необходимо для корректной работы проверок состояния (health checks).
