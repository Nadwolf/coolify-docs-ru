---
title: "Пользовательский Docker-реестр"
description: "Переключайтесь между Docker Hub и GitHub Container Registry (ghcr.io) для скачивания образов Coolify во время установки или работы."
---

# Пользовательский Docker-реестр

Если вы хотите получать образы Coolify из `docker.io` (Docker Hub) вместо стандартного `ghcr.io`, вы можете сделать это, установив переменную окружения `REGISTRY_URL` в значение `docker.io`.

## URL реестра (`REGISTRY_URL`)
- Допустимые значения: `docker.io` и `ghcr.io`.

## Автоматизированный метод установки

1. **Запустите команду установки**

   Выполните автоматизированный скрипт установки с указанной переменной:

   ```bash
   env REGISTRY_URL=docker.io bash -c 'curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash'
   ```
   > Посмотреть [исходный код скрипта](https://github.com/coollabsio/coolify/blob/main/scripts/install.sh)

::: info
  Скрипт установки должен запускаться от имени `root`. Если вы не под `root`, используйте `sudo` для повышения привилегий.
  ```bash
  sudo -E env REGISTRY_URL=docker.io bash -c 'curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash'
  ```
:::

## Ручной метод установки

1. **Настройте переменные окружения**

   Отредактируйте файл переменных окружения:

   ```bash
   nano /data/coolify/source/.env
   ```

   Добавьте следующую переменную:
   ```bash
   REGISTRY_URL=docker.io
   ```

## Переключение после установки

Если вы хотите сменить реестр уже после установки, выполните следующую команду:

```bash
env REGISTRY_URL=docker.io bash -c 'curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash'
```

::: info
  Скрипт установки должен запускаться от имени `root`. Если вы не под `root`, используйте `sudo` для повышения привилегий.
  ```bash
  sudo -E env REGISTRY_URL=docker.io bash -c 'curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash'
  ```
:::