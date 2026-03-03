---
title: "Sonatype Nexus"
description: "Запустите Nexus Repository в Coolify: управление артефактами, реестр Docker, хостинг пакетов npm, Maven, PyPI и хранилище зависимостей (dependency storage) DevOps."
---

<ZoomableImage src="/docs/images/services/nexus0.webp" alt="Дашборд Nexus" />

## Что такое Sonatype Nexus

Sonatype Nexus — это менеджер репозиториев (repository manager), который позволяет хранить, управлять и распространять артефакты программного обеспечения. Он поддерживает несколько форматов пакетов, включая Maven, npm, Docker, PyPI и другие.

## Доступные версии

Coolify предлагает две версии Nexus:

- **Nexus (Standard)**: Официальная версия для архитектуры x86_64
- **Nexus ARM**: Версия Community Edition для архитектуры ARM64, поддерживаемая и синхронизируемая с официальным репозиторием

## Настройка (Setup)

- Настройка основывается на запуске с пользователем по умолчанию "admin" с паролем "admin123".
- После запуска службы (service) войдите с учетными данными по умолчанию и измените пароль.
- После этого удалите строку `NEXUS_SECURITY_RANDOMPASSWORD=false` из файла compose и перезапустите службу, чтобы применить изменения.

Минимальные требования:

- 4 vCPU
- 3 ГБ ОЗУ (RAM)

## Скриншоты

<ZoomableImage src="/docs/images/services/nexus1.webp" alt="Дашборд Nexus" />
<ZoomableImage src="/docs/images/services/nexus2.webp" alt="Дашборд Nexus" />

## Ссылки

- [Официальный сайт](https://help.sonatype.com/en/sonatype-nexus-repository.html?utm_source=coolify.io)
- [GitHub](https://github.com/sonatype/docker-nexus3?utm_source=coolify.io)
