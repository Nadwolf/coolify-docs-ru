---
title: Keycloak
description: "Разверните Keycloak в Coolify для управления идентификацией и доступом (IAM): SSO, OAuth2, SAML, федерация пользователей (user federation) и централизованная аутентификация."
---

# Keycloak

<ZoomableImage src="/docs/images/services/keycloak-logo.svg" alt="Дашборд Keycloak" />

## Что такое Keycloak

Keycloak — это open-source инструмент для управления идентификацией и доступом (Identity and Access Management).

## Варианты развертывания

Keycloak доступен в двух конфигурациях развертывания в Coolify:

### Keycloak (По умолчанию)
- **База данных:** Встроенная H2 (разработка)
- **Сценарий использования:** Разработка (development), тестирование или ознакомление
- **Компоненты:** Единый контейнер Keycloak со встроенной базой данных H2

### Keycloak с PostgreSQL
- **База данных:** PostgreSQL
- **Сценарий использования:** Prod-развертывания (production), требующие надежности, производительности и постоянного хранения данных (data persistence)
- **Компоненты:**
  - Контейнер Keycloak
  - Контейнер PostgreSQL
  - Автоматическая настройка базы данных и проверки работоспособности (health checks)

## Ссылки

- [Официальная документация](https://www.keycloak.org?utm_source=coolify.io)
