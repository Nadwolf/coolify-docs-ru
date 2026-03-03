---
title: "Mediawiki"
description: "Запустите MediaWiki в Coolify для документации в стиле Википедии, баз знаний, совместного редактирования и структурированного управления контентом вики."
---

![Mediawiki](https://www.mediawiki.org/static/images/icons/mediawikiwiki.svg)

## Что такое Mediawiki?

Бесплатное и open-source пространство для совместной работы по управлению знаниями и обмену ими.

## Шаги установки

1. Закомментируйте (comment out) общий том (shared volume) для LocalSettings в вашей конфигурации.
2. Запустите контейнер.
3. Перейдите на `http(s)://your-domain`, чтобы получить доступ к мастеру установки (installation wizard) MediaWiki.
4. Настройте MediaWiki в соответствии с вашими потребностями с помощью мастера.
5. Скачайте сгенерированный файл `LocalSettings.php`.
6. Остановите контейнер.
7. Переместите скачанный файл `LocalSettings.php` по указанному пути монтирования файла (file mount path) на вашем сервере.
8. Раскомментируйте конфигурацию общего тома, чтобы смонтировать файл `LocalSettings.php` в указанный путь монтирования файла на вашем сервере.
9. Перезапустите контейнер.

## Ссылки

- [Официальный сайт](https://www.mediawiki.org/wiki/MediaWiki)
- [GitHub](https://github.com/wikimedia/mediawiki)
