---
title: Pocket ID
description: "Разверните Pocket ID в Coolify: простой провайдер OIDC с аутентификацией без пароля с помощью ключей доступа (passkey authentication) для ваших сервисов на самостоятельном хостинге (self-hosted)."
---

# Pocket ID

<ZoomableImage src="/docs/images/services/pocket-id_screenshot.webp" alt="Баннер Pocket ID" />

## Что такое Pocket ID?

Pocket ID — это простой OIDC-провайдер для беспарольной аутентификации с использованием [ключей доступа (passkeys)](https://www.passkeys.io/). Он разработан так, чтобы быть простым и удобным в использовании. Он поддерживает исключительно аутентификацию по ключу доступа, позволяя вам использовать аппаратные ключи безопасности, такие как Yubikey, для безопасного входа в ваши self-hosted сервисы.

## Варианты развертывания

Pocket ID доступен в двух конфигурациях развертывания в Coolify:

### Pocket ID (По умолчанию)
- **База данных:** SQLite (встроенная)
- **Сценарий использования:** Простые развертывания, тестирование или персональный сервер аутентификации
- **Компоненты:** Единый контейнер Pocket ID со встроенной базой данных SQLite

### Pocket ID с PostgreSQL
- **База данных:** PostgreSQL
- **Сценарий использования:** Prod-развертывания (production), требующие лучшей производительности и надежности данных
- **Компоненты:**
  - Контейнер Pocket ID
  - Контейнер PostgreSQL
  - Автоматическая настройка базы данных и проверки работоспособности (health checks)

## Возможности (Features)

- **Беспарольная аутентификация (Passwordless Authentication)**: Использует ключи доступа (passkeys) вместо паролей для лучшей безопасности
- **OIDC Провайдер**: Интегрируется с приложениями, поддерживающими OpenID Connect
- **Простая установка**: Легко устанавливается и настраивается по сравнению со сложными альтернативами
- **Широкая совместимость**: Работает с [различными сервисами](https://pocket-id.org/docs/client-examples?utm_source=coolify.io), такими как Nextcloud, GitLab и другими
- **Поддержка Passkey**: Полная поддержка аппаратных ключей безопасности, таких как Yubikey
- **Самостоятельный хостинг (Self-Hosted)**: Сохраняйте полный контроль над вашей инфраструктурой аутентификации

## Начало работы (Getting Started)

После развертывания вы можете войти в систему с учетной записью администратора по адресу:

```
https://<your-app-url>/setup
```

Следуйте указаниям мастера настройки Pocket ID (setup wizard), чтобы настроить свой экземпляр и создать свой первый ключ доступа (passkey).

## Демо

Чтобы увидеть Pocket ID в действии, посетите [демо-версию](https://demo.pocket-id.org/).

:::info
Эта демо-версия не связана с Coolify.
:::

## Ссылки

- [Официальный сайт](https://pocket-id.org?utm_source=coolify.io)
- [Документация](https://pocket-id.org/docs/introduction?utm_source=coolify.io)
- [Руководство по установке](https://pocket-id.org/docs/setup/installation?utm_source=coolify.io)
- [GitHub](https://github.com/pocket-id/pocket-id?utm_source=coolify.io)

## Дополнительные ресурсы

- [Руководство по прокси-сервисам (Proxy Services Guide)](https://pocket-id.org/docs/guides/proxy-services?utm_source=coolify.io)
- [Примеры клиентов (Client Examples)](https://pocket-id.org/docs/client-examples?utm_source=coolify.io)