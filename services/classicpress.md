---
title: "ClassicPress"
description: "Запустите CMS ClassicPress в Coolify: альтернатива WordPress с классическим редактором без блоков (blocks) с фокусом на бизнес-сайты и традиционные публикации."
---

![ClassicPress](https://raw.githubusercontent.com/ClassicPress/ClassicPress/develop/src/wp-admin/images/classicpress-logo.png)

## Что такое ClassicPress?

ClassicPress — это система управления контентом (CMS) с открытым исходным кодом, разрабатываемая сообществом для авторов (creators). Это форк WordPress 6.2, в котором сохранён классический редактор TinyMCE в качестве опции по умолчанию. ClassicPress весит в два раза меньше, чем WordPress, содержит меньше "раздутого" кода (bloat), что повышает производительность, и в нем нет блочного редактора (Gutenberg / Full Site Editing).

## Варианты развертывания

ClassicPress доступен в двух конфигурациях развертывания в Coolify:

### ClassicPress с MariaDB
- **База данных:** MariaDB
- **Сценарий использования:** Prod-развертывания с предпочтением MariaDB (рекомендуется для большинства пользователей)
- **Компоненты:**
  - Контейнер ClassicPress
  - Контейнер MariaDB
  - Автоматическая настройка базы данных и проверки работоспособности (health checks)

### ClassicPress с MySQL
- **База данных:** MySQL
- **Сценарий использования:** Prod-развертывания с предпочтением MySQL
- **Компоненты:**
  - Контейнер ClassicPress
  - Контейнер MySQL
  - Автоматическая настройка базы данных и проверки работоспособности (health checks)

Оба варианта обеспечивают одинаковую функциональность — выбирайте тот, база данных которого вам больше подходит или зависит от имеющейся инфраструктуры.

Дополнительная информация:

- [Официальный сайт](https://www.classicpress.net?utm_source=coolify.io)
- [Документация ClassicPress](https://docs.classicpress.net?utm_source=coolify.io)
- [Управление (Governance) ClassicPress](https://www.classicpress.net/governance?utm_source=coolify.io)
- [Предложить функции (Suggest features)](https://github.com/ClassicPress/ClassicPress/issues?utm_source=coolify.io)
