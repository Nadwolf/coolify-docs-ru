---
title: Участие в разработке ядра Coolify
description: Участвуйте в разработке Coolify (open-source) с помощью пошагового руководства по настройке среды, Docker, команд Spin и процесса создания pull-реквестов.
---

# Участие в разработке Coolify
> "Прежде всего, спасибо, что решили внести свой вклад в мой проект. Это очень много значит для меня!" - [@andrasbacsai](https://github.com/andrasbacsai)

Вы всегда можете попросить совета в нашем [сообществе Discord](https://coollabs.io/discord) в канале `#contribute`.

Чтобы разобраться в технологическом стеке, пожалуйста, ознакомьтесь с документом [Tech Stack](https://github.com/coollabsio/coolify/blob/main/TECH_STACK.md).


## Содержание
1. [Настройка среды разработки](#_1-настройка-среды-разработки)
2. [Проверка установки](#_2-проверка-установки-необязательно)
3. [Форк и настройка локального репозитория](#_3-форк-и-настройка-локального-репозитория)
4. [Настройка переменных окружения](#_4-настройка-переменных-окружения)
5. [Запуск Coolify](#_5-запуск-coolify)
6. [Начало разработки](#_6-начало-разработки)
7. [Создание Pull Request](#_7-создание-pull-request)
8. [Заметки по разработке](#заметки-по-разработке)
9. [Сброс среды разработки](#сброс-среды-разработки)
10. [Дополнительные рекомендации](#дополнительные-рекомендации)


## 1. Настройка среды разработки
Следуйте шагам для вашей операционной системы:

<details>
<summary><strong>Windows</strong></summary>

1. Установите `docker-ce`, Docker Desktop (или аналог):
   - Docker CE (рекомендуется):
     - Установите WSL2 (Windows Subsystem for Linux), следуя инструкции: [Установка WSL](https://learn.microsoft.com/en-us/windows/wsl/install?ref=coolify)
     - После установки WSL2 установите Docker CE для вашего дистрибутива Linux: [Установка Docker Engine](https://docs.docker.com/engine/install/?ref=coolify)
     - Убедитесь, что выбрали правильный дистрибутив (например, Ubuntu) при установке Docker.
   - Docker Desktop (проще):
     - Скачайте и установите [Docker Desktop для Windows](https://docs.docker.com/desktop/install/windows-install/?ref=coolify)
     - Убедитесь, что бэкенд WSL2 включен в настройках Docker Desktop.

2. Установите Spin:
   - Следуйте инструкциям по установке Spin на Windows из [документации Spin](https://serversideup.net/open-source/spin/docs/installation/install-windows#download-and-install-spin-into-wsl2?ref=coolify)

</details>

<details>
<summary><strong>MacOS</strong></summary>

1. Установите Orbstack, Docker Desktop (или аналог):
   - Orbstack (рекомендуется, так как это более быстрая и легкая альтернатива Docker Desktop):
     - Скачайте и установите [Orbstack](https://docs.orbstack.dev/quick-start#installation?ref=coolify)
   - Docker Desktop:
     - Скачайте и установите [Docker Desktop для Mac](https://docs.docker.com/desktop/install/mac-install/?ref=coolify)

2. Установите Spin:
   - Следуйте инструкциям по установке Spin на MacOS из [документации Spin](https://serversideup.net/open-source/spin/docs/installation/install-macos/#download-and-install-spin?ref=coolify)

</details>

<details>
<summary><strong>Linux</strong></summary>

1. Установите Docker Engine, Docker Desktop (или аналог):
   - Docker Engine (рекомендуется, нет накладных расходов на виртуальную машину):
     - Следуйте официальному [руководству по установке Docker Engine](https://docs.docker.com/engine/install/?ref=coolify) для вашего дистрибутива.
   - Docker Desktop:
     - Если вам нужен графический интерфейс, используйте [Docker Desktop для Linux](https://docs.docker.com/desktop/install/linux-install/?ref=coolify)

2. Установите Spin:
   - Следуйте инструкциям по установке Spin на Linux из [документации Spin](https://serversideup.net/open-source/spin/docs/installation/install-linux#configure-docker-permissions?ref=coolify)

</details>


## 2. Проверка установки (Необязательно)
После установки Docker (или Orbstack) и Spin проверьте их работу:

1. Откройте терминал.
2. Выполните команды:
   ```bash
   docker --version
   spin --version
   ```
   Вы должны увидеть информацию о версиях Docker и Spin.


## 3. Форк и настройка локального репозитория
1. Сделайте форк репозитория [Coolify](https://github.com/coollabsio/coolify) в свой аккаунт GitHub.

2. Установите редактор кода (на выбор):

   | Редактор | Платформа | Ссылка |
   |--------|----------|---------------|
   | Visual Studio Code (бесплатно) | Win/macOS/Linux | [Скачать](https://code.visualstudio.com/download?ref=coolify) |
   | Cursor (рекомендуется, платно) | Win/macOS/Linux | [Скачать](https://www.cursor.com/?ref=coolify) |
   | Zed (очень быстрый) | Win/macOS/Linux | [Скачать](https://zed.dev/download?ref=coolify) |

3. Клонируйте репозиторий из своего форка на локальную машину
   - Используйте `git clone` в терминале, или
   - Используйте GitHub Desktop (рекомендуется):
     - Скачайте с [https://desktop.github.com/](https://desktop.github.com/?ref=coolify)
     - Зайдите в аккаунт GitHub.
     - `File` -> `Clone Repository`, выберите свой форк Coolify и путь на диске.

4. Откройте склонированный проект в редакторе кода.


## 4. Настройка переменных окружения
1. В корне проекта найдите файл `.env.development.example`.
2. Скопируйте его и назовите `.env`.
3. Откройте `.env` и проверьте содержимое. Настройте переменные под свою среду, если нужно.
4. Если возникают ошибки при миграциях БД, проверьте настройки подключения. Используйте IP или хостнейм контейнера PostgreSQL (можно узнать через `docker ps` после запуска `spin up`).
5. Сохраните изменения.


## 5. Запуск Coolify
1. Откройте терминал в папке с проектом.
2. Запустите (не закрывайте терминал):
   ```bash
   spin up
   ```

::: warning Примечание: 
Вы можете увидеть ошибки в консоли, это нормально на данном этапе.
:::

3. Если возникают проблемы с правами (особенно на macOS), используйте:
   ```bash
   sudo spin up
   ```

::: warning Примечание:
Если вы измените `.env` или что-то сломается, нажмите Ctrl + C и запустите `spin up` снова.
:::


## 6. Начало разработки
1. Доступ к вашему экземпляру Coolify:
   - URL: `http://localhost:8000`
   - Логин: `test@example.com`
   - Пароль: `password`

2. Инструменты разработки:

| Инструмент | URL | Примечание |
|------|-----|------|
| Laravel Horizon | `http://localhost:8000/horizon` | Только для root пользователя |
| Mailpit (почта) | `http://localhost:8025` | Ловушка для писем |
| Telescope (отладка) | `http://localhost:8000/telescope` | Выключен по умолчанию |

::: info Совет:
Чтобы включить Telescope, добавьте в `.env`:
```yaml
TELESCOPE_ENABLED=true
```
:::


## 7. Создание Pull Request
1. После внесения изменений:
   - Сделайте коммит в свой форк.
   - Отправьте (push) изменения в GitHub.

2. Создание Pull Request (PR):
   - Перейдите в основной репозиторий Coolify.
   - Вкладка "Pull requests" -> кнопка "New pull request".
   - Выберите свой форк и ветку для сравнения.
   - Нажмите "Create pull request".

3. Детали PR:
   - Дайте описательный заголовок.
   - Заполните описание по шаблону (PR Template).

::: danger ВАЖНО
Всегда устанавливайте базовую ветку (base branch) вашего PR на ветку `next`, а не `v4.x`.
:::

4. Отправка:
   - Проверьте изменения еще раз.
   - Нажмите "Create pull request".

::: warning Примечание:
Выводите PR из режима черновика (draft), как только он будет готов. PR, висящие в черновиках слишком долго, могут быть закрыты мейнтейнерами.
:::

Мейнтейнеры проверят ваш вклад и могут попросить внести правки.


## Заметки по разработке
При работе с Coolify помните:

1. **Миграции БД**: После переключения веток или изменения структуры БД всегда запускайте:
```bash
docker exec -it coolify php artisan migrate
```

2. **Сброс среды**: Чтобы получить чистую БД со значениями по умолчанию:
```bash
docker exec -it coolify php artisan migrate:fresh --seed
```

3. **Устранение проблем**: Если что-то идет не так, убедитесь, что применены последние миграции.

::: danger ВАЖНО:
Забытые миграции — частая причина проблем. Возьмите за привычку запускать их после обновления кода или смены ветки.
:::


## Сброс среды разработки
Если вы зашли в тупик или сломали среду, выполните эти шаги (актуально для `v4.0.0-beta.342` и выше):

1. Остановите контейнеры: `Ctrl + C`.

2. Удалите все контейнеры Coolify:
```bash
docker rm coolify coolify-db coolify-redis coolify-realtime coolify-testing-host coolify-minio coolify-vite-1 coolify-mail
```

3. Удалите тома Docker (если префикс `coolify_dev_` отличается на вашей машине, подправьте команду):
```bash
docker volume rm coolify_dev_backups_data coolify_dev_postgres_data coolify_dev_redis_data coolify_dev_coolify_data coolify_dev_minio_data
```

4. Очистите неиспользуемые образы:
```bash
docker image prune -a
```

5. Запустите Coolify снова:
```bash
spin up
```

6. Запустите миграции и сидеры:
```bash
docker exec -it coolify php artisan migrate:fresh --seed
```

Теперь у вас чистая среда разработки.

::: danger ВАЖНО
Всегда запускайте миграции и сидеры после обновления кода, чтобы локальная БД соответствовала структуре проекта.
:::


## Дополнительные рекомендации
### Добавление нового сервиса
Чтобы добавить новый сервис в Coolify, обратитесь к руководству: [Добавление нового сервиса](/get-started/contribute/service)

### Участие в написании документации
Для помощи с документацией ознакомьтесь с этим разделом: [Участие в написании документации](/get-started/contribute/documentation)
