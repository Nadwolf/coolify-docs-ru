---
title: Ошибка скрипта установки Coolify
description: Диагностика и исправление ошибок скрипта установки Coolify с пошаговым руководством по проверке логов, Docker, конфликтов портов и проблем с контейнерами.
---

# Ошибка скрипта установки Coolify

Если скрипт установки Coolify завершился, но вы не можете получить доступ к панели управления или некоторые контейнеры отсутствуют, это руководство поможет вам найти и устранить причину.

## Типичные симптомы

- Скрипт установки завершается, но **URL для доступа не отображается**.
- Скрипт сообщает об успехе, но **веб-интерфейс Coolify недоступен** на порту 8000.
- **Контейнеры Docker отсутствуют** или не запущены.
- Установка кажется завершенной, но **что-то не работает**.

::: warning Важно
Перед использованием этого руководства убедитесь, что вы ознакомились с [предварительными требованиями для установки](/get-started/installation#before-you-begin), чтобы ваш сервер соответствовал всем системным требованиям.
:::

## Включение подробного режима (Verbose Mode) для отладки

Если у вас возникли проблемы при установке, вы можете запустить скрипт в **подробном режиме**, чтобы точно видеть, какие команды выполняются:

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh -o install.sh
bash -x install.sh 2>&1 | tee installation-debug.log
```

Это позволит:

- Видеть каждую команду в процессе выполнения (`bash -x`).
- Отображать как стандартный вывод (stdout), так и ошибки (stderr) (`2>&1`).
- Сохранить весь вывод в файл `installation-debug.log` для последующего анализа (`tee`).

::: tip Совет
Подробный режим крайне полезен для определения места, где именно произошел сбой. Приложите лог этого режима, если обращаетесь за помощью в Discord.
:::

## Шаг 1: Проверка логов установки

Скрипт установки создает лог-файлы, которые содержат ценную информацию о ходе процесса.

### Где найти логи

Процесс установки создает два лог-файла в директории `/data/coolify/source/`:

1. **Лог установки**: `installation-YYYYMMDD-HHMMSS.log`
2. **Лог обновления**: `upgrade-YYYY-MM-DD-HH-MM-SS.log`

::: tip Совет
Скрипт установки вызывает скрипт обновления внутренне, поэтому при первой установке создаются оба лога.
:::

### Просмотр логов

Найдите самые свежие файлы логов:

```bash
# Список всех логов, отсортированный по дате (новые сверху)
ls -lt /data/coolify/source/*.log | head -5
```

Просмотр лога установки:

```bash
# Замените дату/время на актуальные из вашего файла
tail -100 /data/coolify/source/installation-YYYYMMDD-HHMMSS.log

# Или просмотрите весь лог целиком
cat /data/coolify/source/installation-YYYYMMDD-HHMMSS.log
```

Просмотр лога обновления:

```bash
# Замените дату/время на актуальные из вашего файла
tail -100 /data/coolify/source/upgrade-YYYY-MM-DD-HH-MM-SS.log

# Или просмотрите весь лог целиком
cat /data/coolify/source/upgrade-YYYY-MM-DD-HH-MM-SS.log
```

### На что обратить внимание

Ищите сообщения об ошибках, содержащие:

- `ERROR:`
- `Failed to`
- `could not`
- `Connection refused`
- `Permission denied`
- `No such file or directory`

## Шаг 2: Проверка установки Docker

Проверьте, правильно ли установлен и запущен Docker:

```bash
# Проверка версии Docker
docker --version

# Проверка плагина Docker Compose
docker compose version

# Проверка статуса демона Docker
sudo systemctl status docker
```

**Ожидаемый вывод** для `docker --version`:

```
Docker version 27.0.x, build xxxxx
```

Если Docker не установлен или не запущен:

```bash
# Запуск службы Docker
sudo systemctl start docker

# Включение автозапуска Docker при загрузке
sudo systemctl enable docker
```

::: warning Docker через Snap не поддерживается
Если вы установили Docker через `snap`, необходимо удалить его и установить Docker правильно. Скрипт установки Coolify обнаружит и заблокирует установку на Docker-версию из snap.

```bash
# Удаление Docker из snap
sudo snap remove docker

# Затем снова запустите скрипт установки Coolify
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
```
:::

## Шаг 3: Проверка доступности портов

Для работы Coolify требуются определенные порты. Самым важным при первой установке является **порт 8000**.

### Проверка порта 8000 (веб-интерфейс Coolify)

::: danger Критический порт
Порт 8000 должен быть свободен для веб-интерфейса Coolify. Если этот порт занят другим приложением, установка завершится неудачей без явных сообщений.
:::

**В Linux с помощью `ss` (рекомендуется):**

```bash
sudo ss -tulpn | grep :8000
```

**В Linux с помощью `lsof`:**

```bash
sudo lsof -i :8000
```

**В Linux с помощью `netstat`:**

```bash
sudo netstat -tulpn | grep :8000
```

Если эти команды **ничего не выводят**, значит, порт свободен ✓

Если вывод есть, **порт 8000 чем-то занят**. Пример:

```
tcp   LISTEN  0  4096  *:8000  *:*  users:(("some-app",pid=1234,fd=3))
```

### Проверка других портов Coolify

```bash
# Порт 6001 (Soketi/Real-time)
sudo ss -tulpn | grep :6001

# Порт 5432 (PostgreSQL - обычно только внутренний)
sudo ss -tulpn | grep :5432

# Порт 6379 (Redis - обычно только внутренний)
sudo ss -tulpn | grep :6379
```

### Исправление конфликтов портов

Если порт 8000 занят, у вас есть два варианта:

**Вариант 1: Остановить конфликтующую службу**

```bash
# Найдите ID процесса (PID) из вывода ss/lsof
sudo kill <PID>

# Или остановите службу, если знаете её название
sudo systemctl stop <service-name>
```

**Вариант 2: Изменить порт Coolify** (для продвинутых пользователей)

Отредактируйте файл `/data/coolify/source/.env`, измените переменную `APP_PORT` и снова запустите скрипт установки.

## Шаг 4: Проверка контейнеров Docker

Проверьте, запущены ли все контейнеры Coolify:

```bash
# Список всех контейнеров (запущенных и остановленных)
docker ps -a

# Фильтр только по контейнерам Coolify
docker ps -a --filter "name=coolify"
```

### Ожидаемые контейнеры

Вы должны увидеть следующие контейнеры:

| Имя контейнера      | Статус | Назначение                  |
| ------------------ | ------ | --------------------------- |
| `coolify`          | Up     | Основное приложение Coolify |
| `coolify-realtime` | Up     | Обновления в реальном времени (Soketi) |
| `coolify-db`       | Up     | База данных PostgreSQL      |
| `coolify-redis`    | Up     | Кеш Redis                   |

::: info Примечание
Контейнер `coolify-proxy` НЕ создается во время установки. Он появляется позже, когда вы разворачиваете свое первое приложение или включаете прокси.
:::

### Проверка статуса контейнеров

Если контейнеры имеют статус **stopped (остановлен)** или **exited (завершен)**, проверьте их логи:

```bash
# Просмотр логов конкретного контейнера
docker logs coolify
docker logs coolify-realtime
docker logs coolify-db
docker logs coolify-redis

# Просмотр логов в режиме реального времени
docker logs -f coolify
```

### Перезапуск остановленных контейнеров

Если контейнеры остановлены, попробуйте их запустить:

```bash
# Запуск всех контейнеров Coolify
cd /data/coolify/source
docker compose --env-file .env -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Шаг 5: Проверка образов Docker

Убедитесь, что все необходимые образы Docker были успешно скачаны:

```bash
# Список образов, связанных с Coolify
docker images | grep coolify
docker images | grep ghcr.io/coollabsio
```

### Ожидаемые образы

Вы должны увидеть как минимум:

- `ghcr.io/coollabsio/coolify`
- `ghcr.io/coollabsio/coolify-helper`
- `ghcr.io/coollabsio/coolify-realtime`

### Отсутствующие образы

Если образы отсутствуют, возможно, возникла проблема с сетью во время установки. Попробуйте скачать их вручную:

```bash
# Скачивание последних образов Coolify
docker pull ghcr.io/coollabsio/coolify:latest
docker pull ghcr.io/coollabsio/coolify-helper:latest
docker pull ghcr.io/coollabsio/coolify-realtime:latest

# Затем перезапустите Coolify
cd /data/coolify/source
docker compose --env-file .env -f docker-compose.yml -f docker-compose.prod.yml up -d --force-recreate
```

::: tip Аутентификация в реестре
Если вы используете сторонний реестр Docker, требующий авторизации, сначала выполните `docker login`.
:::

## Шаг 6: Проверка сетей Docker

Убедитесь, что сеть Coolify в Docker существует:

```bash
# Список сетей Docker
docker network ls | grep coolify
```

**Ожидаемый вывод:**

```
<network-id>   coolify   bridge   local
```

Если сети нет, создайте её:

```bash
# Попробуйте сначала создать с поддержкой IPv6
docker network create --attachable --ipv6 coolify

# Если не получилось, создайте без IPv6
docker network create --attachable coolify
```

## Шаг 7: Проверка свободного места на диске

Проверьте наличие свободного места:

```bash
df -h /
```

Для работы Coolify требуется:

- **Минимум 30 ГБ общего места на диске**
- **Минимум 20 ГБ доступного места**

::: warning Мало места на диске
Если места меньше требуемого, установка может завершиться, но система будет работать со сбоями. Рекомендуется:

- Очистить неиспользуемые ресурсы Docker: `docker system prune -a`
- Увеличить объем диска/тома.
- Использовать сервер помощнее.
:::

## Распространенные проблемы и решения

### Проблема: Скрипт завершен, но URL для доступа не показан

**Симптомы:**
- Скрипт установки закончил работу.
- Сообщений об ошибках нет.
- Но URL вида `http://ваш-ip:8000` не отобразился.

**Возможные причины:**
1. Ошибка при создании контейнеров не была выведена.
2. Проблемы с сетью помешали получить публичный IP.
3. Образы Docker не скачались.

**Решение:**
```bash
# Проверьте, запущены ли контейнеры
docker ps --filter "name=coolify"

# Если контейнеров нет, проверьте лог обновления
cat /data/coolify/source/upgrade-*.log

# Найдите ошибки в логе, затем попробуйте запустить обновление вручную
cd /data/coolify/source
bash upgrade.sh latest latest ghcr.io false
```

### Проблема: Порт 8000 уже занят

**Симптомы:**
- Установка завершена.
- Контейнеры вроде бы запущены.
- Но веб-интерфейс Coolify недоступен.

**Решение:**
См. [Шаг 3: Проверка доступности портов](#шаг-3-проверка-доступности-портов).

### Проблема: Ошибки при скачивании образов Docker

**Симптомы:**
- Установка длится очень долго.
- Ошибки вроде "failed to pull image" или "manifest unknown".
- Некоторые образы Docker отсутствуют.

**Возможные причины:**
1. Проблемы с сетевым подключением.
2. Ошибки разрешения DNS.
3. Ограничения частоты запросов к реестру (rate limiting).

**Решение:**
```bash
# Проверьте сетевое соединение с GitHub Container Registry
curl -I https://ghcr.io

# Проверьте разрешение DNS
nslookup ghcr.io

# Попробуйте скачать образы вручную
docker pull ghcr.io/coollabsio/coolify:latest
```

### Проблема: Недостаточно прав

**Симптомы:**
- Ошибки "Permission denied" в логах.
- Невозможность создать директории или изменить файлы в `/data/coolify/`.

**Решение:**
Скрипт установки должен запускаться от имени **root** или через **sudo**:

```bash
# Перезапустите с sudo
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
```

### Проблема: Ошибки конфигурации SSH

**Симптомы:**
- Установка завершена.
- Coolify доступен, но не может подключиться к локальному серверу (localhost).
- Ошибки SSH в интерфейсе Coolify.

**Возможная причина:**
- Отключена опция `PermitRootLogin` в SSH.
- Ключи SSH настроены неправильно.

**Решение:**
Проверьте настройки SSH:
```bash
# Проверка настройки PermitRootLogin
sudo sshd -T | grep permitrootlogin
```
Должно отображаться:
- `permitrootlogin yes`, или
- `permitrootlogin prohibit-password`, или
- `permitrootlogin without-password`.

Если там `permitrootlogin no`, ознакомьтесь с [руководством по настройке OpenSSH](/knowledge-base/server/openssh).

## Чек-лист ручной проверки

Выполните эти команды для получения полного отчета о диагностике:

```bash
echo "=== ДИАГНОСТИКА УСТАНОВКИ COOLIFY ==="
echo ""

echo "1. Логи установки:"
ls -lt /data/coolify/source/*.log 2>/dev/null | head -5 || echo "Логи не найдены"
echo ""

echo "2. Версия Docker:"
docker --version
docker compose version
echo ""

echo "3. Статус службы Docker:"
sudo systemctl status docker --no-pager -l
echo ""

echo "4. Контейнеры Coolify:"
docker ps -a --filter "name=coolify" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo ""

echo "5. Образы Docker:"
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}" | grep -E "REPOSITORY|coolify"
echo ""

echo "6. Сети Docker:"
docker network ls | grep -E "NETWORK|coolify"
echo ""

echo "7. Статус порта 8000:"
sudo ss -tulpn | grep :8000 || echo "Порт 8000 свободен"
echo ""

echo "8. Место на диске:"
df -h /
echo ""

echo "9. Файл окружения (.env):"
ls -lh /data/coolify/source/.env 2>/dev/null || echo "Файл .env не найден"
echo ""
```

Скопируйте вывод этого скрипта при обращении за помощью.

## Действия по восстановлению

### Чистая переустановка

Если вы хотите полностью удалить Coolify и начать заново:

::: danger Внимание
Это удалит все данные Coolify, включая приложения, базы данных и настройки!
:::

Следуйте [руководству по удалению](/get-started/uninstallation), а затем снова запустите скрипт установки:

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
```

### Повторная установка без сброса данных

Если вы хотите повторить попытку без потери данных:

```bash
# Просто запустите скрипт установки еще раз
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
```

Скрипт разработан как **идемпотентный** (его безопасно запускать несколько раз).

### Использование ручной установки

Если автоматический скрипт продолжает давать сбои, попробуйте метод [ручной установки](/get-started/installation#manual-installation).

## Получение помощи

Если вы выполнили все шаги и проблема осталась, обратитесь за помощью в наше [Discord-сообщество](https://coolify.io/discord).

### Какую информацию предоставить

При обращении за помощью укажите:

1. **Данные вашей системы:**
   ```bash
   cat /etc/os-release
   uname -m
   ```
2. **Логи установки:** (последние 100 строк)
   ```bash
   tail -100 /data/coolify/source/installation-*.log
   tail -100 /data/coolify/source/upgrade-*.log
   ```
3. **Статус Docker:**
   ```bash
   docker ps -a --filter "name=coolify"
   docker images | grep coolify
   ```
4. **Тексты ошибок**, которые вы видите на экране или в логах.
5. **Что вы уже пробовали** сделать для решения.

Это поможет сообществу быстрее разобраться в вашей проблеме!

## Связанная документация

- [Руководство по установке](/get-started/installation)
- [Ручная установка](/get-started/installation#manual-installation)
- [Настройка брандмауэра](/knowledge-base/server/firewall)
- [Настройка OpenSSH](/knowledge-base/server/openssh)
- [Ошибка установки Docker](/troubleshoot/installation/docker-install-failed)
