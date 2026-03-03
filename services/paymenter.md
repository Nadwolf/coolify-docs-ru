---
title: "Paymenter"
description: "Разверните биллинг Paymenter в Coolify: выставление счетов (invoicing) за веб-хостинг, управление клиентами, автоматическое предоставление услуг (automated provisioning) и администрирование."
---

<ZoomableImage src="/docs/images/services/paymenter-logo.svg" alt="Дашборд Paymenter" />

## Что такое Paymenter?

Paymenter — это биллинговая (billing) платформа с открытым исходным кодом, созданная специально для хостинговых (hosting) компаний. Она упрощает управление услугами хостинга, обеспечивая беспроблемный (seamless) опыт как для провайдеров, так и для клиентов. Созданный на основе современных веб-технологий, Paymenter предлагает гибкое и надежное решение для нужд вашего хостинг-бизнеса.

## Как настроить Paymenter с помощью Coolify

1. Создайте новый ресурс (resource), используя сервис **Paymenter**.
2. Запустите ресурс.
3. Установите правильный URL приложения через терминал:

Выберите контейнер Paymenter и выполните следующую команду:

```bash
php artisan app:init
```

4. Создайте первого пользователя-администратора:
   ```bash
   php artisan app:user:create
   ```

## Ссылки

- [Официальный сайт](https://paymenter.org/)
- [GitHub](https://github.com/Paymenter/Paymenter)
- [Демо](https://demo.paymenter.org/)
