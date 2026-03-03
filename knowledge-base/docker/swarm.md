---
title: "Docker Swarm"
description: "Развертывайте ресурсы Coolify в кластерах Docker Swarm: требования к внешнему реестру, настройка менеджеров и воркеров, а также конфигурация постоянного хранилища."
---

# Docker Swarm

::: danger ВНИМАНИЕ!
***Это экспериментальная функция.***
:::

## Настройка в Coolify

Если вы хотите использовать Swarm для развертывания ресурсов, вам необходимо добавить `Swarm Manager` (менеджер Swarm) в Coolify.

Опционально вы можете добавить `Swarm Workers` (рабочие узлы Swarm) в Coolify. Это позволит Coolify выполнять очистку и другие задачи на рабочих узлах кластера.

### Реестр Docker (Docker Registry)

Для использования Swarm вам необходим внешний реестр Docker, так как все рабочие узлы (workers) должны иметь возможность скачивать (pull) образы, собранные в Coolify.

- Менеджер Swarm (Swarm Manager) должен пушить образ в реестр.
- Рабочие узлы Swarm (Swarm Workers) должны скачивать образ из реестра.

Настройте учетные данные Docker соответствующим образом. Подробнее [здесь](/knowledge-base/docker/registry).

## Установка кластера Swarm

> В РАЗРАБОТКЕ (WIP)
> Это краткое руководство по установке простого кластера Docker Swarm. Для получения более подробной информации обратитесь к [официальной документации](https://docs.docker.com/engine/swarm/).

### Предварительные условия

- В этом руководстве я буду использовать [Hetzner](https://coolify.io/hetzner) (реферальная ссылка). Вы можете использовать любого другого провайдера.
- Вам понадобится как минимум 3 сервера с одинаковой архитектурой (ARM или AMD64) для создания кластера.
- 1 сервер для узла-менеджера (manager node).
- 2 сервера для рабочих узлов (worker nodes). Вы можете добавить больше воркеров при необходимости.
- По возможности настройте частную сеть (private networking) между всеми серверами.

### Установка Docker

Установите Docker на все серверы. Вы можете следовать [официальной документации](https://docs.docker.com/engine/install/) или использовать скрипты:

1. Установка через скрипт Rancher:

```bash
curl https://releases.rancher.com/install-docker/24.0.sh | sh
```

2. Установка через официальный скрипт Docker:

```bash
curl https://get.docker.com | sh -s -- --version 24.0
```

> Используйте только одну из этих команд.

### Настройка Docker

На **всех серверах** выполните следующие команды, чтобы запустить Docker:

```bash
systemctl start docker
systemctl enable docker
```

::: warning Осторожно
Специфическая настройка для Hetzner: серверы Hetzner используют MTU 1450. Вам необходимо настроить Docker на использование такого же MTU.

На **менеджере** выполните следующие команды:

```bash
mkdir -p /etc/docker
cat <<EOF > /etc/docker/daemon.json
{
  "default-network-opts": {
    "overlay": {
      "com.docker.network.driver.mtu": "1450"
    }
  }
}
EOF
systemctl restart docker
```
:::

### Создание кластера Swarm

На **узле-менеджере** выполните следующую команду для создания нового кластера:

```bash
# MANAGER_IP = IP узла-менеджера. Если у вас есть частная сеть, используйте частный IP (например, 10.0.0.x).
docker swarm init --advertise-addr <MANAGER_IP>
```

Эта команда выведет строку, которую нужно запустить на **рабочих узлах** для присоединения к кластеру.

Она будет выглядеть примерно так:

```bash
# НЕ ЗАПУСКАЙТЕ ЭТУ КОМАНДУ, ЭТО ПРОСТО ПРИМЕР!
docker swarm join --token SWMTKN-1-24zvxeydjarchy7z68mdawichvf684qvf8zalx3rmwfgi6pzm3-4ftqn9n8v98kx3phfqjimtkzx 10.0.0.2:2377
```

### Проверка кластера

Запустите команду на узле-менеджере, чтобы убедиться, что кластер работает:

```bash
docker node ls
```

Вы должны увидеть что-то подобное:

```bash
ID                            HOSTNAME        STATUS    AVAILABILITY   MANAGER STATUS   ENGINE VERSION
ua38ijktbid70em257ymxufif *   swarm-manager   Ready     Active         Leader           24.0.2
7rss9rvaqpe9fddt5ol1xucmu     swarm-worker    Ready     Active                          24.0.2
12239rvaqp43gddtgfsdxucm2     swarm-worker    Ready     Active                          24.0.2
```

## Деплой с постоянным хранилищем

Чтобы развернуть сервис с постоянным хранилищем, вам понадобится общий том (shared volume) на всех узлах `swarm-workers`. Это позволит службе Swarm перемещать ресурсы между узлами без потери данных.

Для этого можно использовать такие сервисы, как AWS EFS, NFS, GlusterFS и другие.

> В РАЗРАБОТКЕ (WIP)
