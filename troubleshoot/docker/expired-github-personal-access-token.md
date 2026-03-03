---
title: Истекший персональный токен доступа GitHub (PAT)
description: Исправьте ошибки аутентификации в GitHub Container Registry, выйдя из ghcr.io или обновив истекшие персональные токены GitHub PAT для Docker-развертываний.
---

# Истекший персональный токен доступа GitHub (PAT)

Если вы столкнулись со следующими ошибками, это означает, что Docker не может пройти аутентификацию в GitHub Container Registry (ghcr.io):

## Ошибка

```sh
  Error response from daemon: Head "https://ghcr.io/v2/coollabsio/coolify-helper/manifests/1.0.1": unauthorized: authentication required
```
> или

```sh
  Unable to find image 'ghcr.io/coollabsio/coolify-helper:latest' locally
  docker: Error response from daemon: Head "https://ghcr.io/v2/coollabsio/coolify-helper/manifests/latest": denied: denied
```

## Решение
У вас есть два варианта:

- Выйти из GitHub Container Registry (ghcr.io), выполнив команду:
  ```sh
    docker logout ghcr.io
  ```
- Обновить ваш персональный токен доступа GitHub (PAT), если вам требуется аутентифицированный доступ для развертываний.
