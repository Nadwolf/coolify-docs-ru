---
title: Миграция приложений
description: Пошаговое руководство по переносу приложений, баз данных и Docker-томов с одного сервера Coolify на другой с использованием скриптов бэкапа и восстановления.
---

# Миграция приложений на другой сервер Coolify

В Coolify нет встроенной кнопки "мигрировать" для переноса приложения с одного сервера на другой.

Вам необходимо вручную развернуть приложение на новом сервере, а затем перенести базы данных и тома (volumes). Это руководство проведет вас через весь процесс по шагам.

::: info Примечание
  Мы предполагаем, что на целевом сервере уже установлен Coolify и вы готовы начать миграцию.
::: 

## 1. Понимание постоянного хранения данных
В Coolify данные приложений живут в одном из двух мест:

<ZoomableImage src="/docs/images/knowledge-base/how-tos/migrate-apps-different-host/1.webp" alt="Скриншот миграции приложений" />

### Bind mounts (Привязка директорий)
  - Хостовая директория или файл маппится (пробрасывается) в контейнер.
  - Любые изменения в папке на сервере сразу отражаются внутри контейнера.
  - Для бэкапа просто скопируйте папку или файл на новый сервер и обновите путь в настройках приложения.

### Volume mounts (Docker-тома)
  - Создается Docker Volume (обычно это делает Coolify, но можно и вручную).
  - Данные хранятся в специальной директории Docker, обычно это `/var/lib/docker/volumes/<ИМЯ_ТОМА>`.
  - Эту папку нельзя просто скопировать. Docker рекомендует безопасный метод бэкапа и восстановления через временный контейнер.

::: info Примечание
  Так как миграция bind mounts тривиальна (простое копирование файлов), это руководство фокусируется на бэкапе и восстановлении **Docker-томов (volumes)**.
:::

## 2. Обзор процесса бэкапа и восстановления
[Рекомендованный Docker процесс](https://docs.docker.com/engine/storage/volumes/#back-up-restore-or-migrate-data-volumes) миграции томов выглядит так:

<ZoomableImage src="/docs/images/knowledge-base/how-tos/migrate-apps-different-host/2.webp" alt="Схема процесса миграции" />

1. **Монтирование** тома во временный контейнер.
2. **Архивация** содержимого тома в tar-архив.
3. **Копирование** архива из контейнера на хост и удаление контейнера.
4. **Перенос** архива на новый сервер.
5. **Создание** чистого тома на новом сервере.
6. **Монтирование** архива во временный контейнер на новом сервере.
7. **Распаковка** архива в новый том.

Ниже приведены готовые скрипты для этих действий.

---

::: info Примечание
  Приведенные скрипты интерактивны: они запрашивают подтверждения и проверяют существование томов, чтобы вы случайно ничего не сломали.
:::

## 3. Резервное копирование тома (Backup)

1. **Зайдите по SSH** на сервер, где находится Docker-том.
2. **Создайте скрипт** `backup.sh`:
    ```sh
    touch backup.sh && chmod +x backup.sh
    ```
3. **Вставьте** в него следующий код:

    ```sh title="backup.sh"
    #!/bin/bash
    
    # === ВВОД ДАННЫХ ===
    read -p "[ Backup Agent ] [ INPUT ] Введите имя Docker volume для бэкапа: " VOLUME_NAME
    
    echo "[ Backup Agent ] [ INFO ] Выбран том: $VOLUME_NAME"
    
    # Проверка существования тома
    if ! docker volume ls --quiet | grep -q "^$VOLUME_NAME$"; then
        echo "[ Backup Agent ] [ ERROR ] Том '$VOLUME_NAME' не существует. Отмена."
        echo "[ Backup Agent ] [ ERROR ] Бэкап не удался!"
        exit 1
    else
        echo "[ Backup Agent ] [ INFO ] Том найден, приступаем..."
    fi
    
    # Директория для сохранения
    read -p "[ Backup Agent ] [ INPUT ] Введите папку для бэкапа (по умолчанию ./volume-backup): " BACKUP_DIR
    BACKUP_DIR=${BACKUP_DIR:-./volume-backup}
    
    echo "[ Backup Agent ] [ INFO ] Папка для бэкапа: $BACKUP_DIR"
    
    BACKUP_FILE="${VOLUME_NAME}-backup.tar.gz"
    echo "[ Backup Agent ] [ INFO ] Имя файла: $BACKUP_FILE"
    
    # === ВЫПОЛНЕНИЕ ===
    if [ -d "$BACKUP_DIR" ]; then
        echo "[ Backup Agent ] [ INFO ] Папка '$BACKUP_DIR' уже существует."
    else
        echo "[ Backup Agent ] [ INFO ] Создаем папку '$BACKUP_DIR'..."
        mkdir -p "$BACKUP_DIR" || { 
            echo "[ Backup Agent ] [ ERROR ] Ошибка при создании папки, отмена."
            exit 1
        }
    fi
    
    echo "[ Backup Agent ] [ INFO ] Запуск процесса архивации..."
    
    docker run --rm \
      -v "$VOLUME_NAME":/volume \
      -v "$(pwd)/$BACKUP_DIR":/backup \
      busybox \
      tar czf /backup/"$BACKUP_FILE" -C /volume . || { 
        echo "[ Backup Agent ] [ ERROR ] Ошибка при создании архива."
        exit 1
    }
    
    echo "[ Backup Agent ] [ SUCCESS ] Бэкап завершен!"
    ```

4. **Найдите имя тома** через консоль:
   ```sh
   docker volume ls
   ```
   Или в Coolify на странице **Persistent Storage**.
   <ZoomableImage src="/docs/images/knowledge-base/how-tos/migrate-apps-different-host/3.webp" alt="Скриншот томов в Coolify" />

5. **Остановите ваше приложение** для создания чистого бэкапа.
6. **Запустите скрипт**:
   ```sh
   ./backup.sh
   ```
   - Вставьте имя тома по запросу.
   - Нажмите **Enter** для выбора папки по умолчанию.
7. **Убедитесь**, что файл `<ИМЯ_ТОМА>-backup.tar.gz` появился в папке `volume-backup`.

---

## 4. Перенос бэкапа на новый сервер
::: success Совет
  Если вы умеете переносить файлы через SCP вручную, можете пропустить этот шаг.
:::

1. **Создайте** скрипт `transfer.sh`:
   ```sh
   touch transfer.sh && chmod +x transfer.sh
   ```
2. **Вставьте** следующий код:

    ```sh title="transfer.sh"
    #!/bin/bash
    
    # =============== НАСТРОЙКИ ===============
    SSH_PORT=22
    SSH_USER="root"
    SSH_IP="192.168.1.222" # IP нового сервера
    SSH_KEY="$HOME/.ssh/id_rsa" # Путь к вашему SSH-ключу
    SOURCE_PATH="./volume-backup"
    DESTINATION_PATH="/root/backups/volume-backup"
    MAX_RETRIES=3
    
    echo "[ Transfer Agent ] [ INFO ] Начинаем перенос..."
    echo "[ Transfer Agent ] [ INFO ] Ключ: $SSH_KEY"
    echo "[ Transfer Agent ] [ INFO ] Откуда: $SOURCE_PATH"
    echo "[ Transfer Agent ] [ INFO ] Куда: $SSH_USER@$SSH_IP:$DESTINATION_PATH"
    
    # Проверка ключа
    if [ ! -f "$SSH_KEY" ]; then
      echo "[ Transfer Agent ] [ WARN ] Ключ не найден, используем аутентификацию по паролю."
      SSH_KEY=""
    fi
    
    # Проверка наличия expect для пароля
    if [ -z "$SSH_KEY" ] && ! command -v expect >/dev/null 2>&1; then
      echo "[ Transfer Agent ] [ ERROR ] Пакет 'expect' нужен для ввода пароля, но он не установлен. Установите его или используйте SSH-ключ."
      exit 1
    fi
    
    # Функция проверки пароля
    test_password() {
      local PW="$1"
      expect -c "
        log_user 0
        set timeout 15
        spawn ssh -o StrictHostKeyChecking=no -p $SSH_PORT $SSH_USER@$SSH_IP exit
        expect {
          \"*?assword:\" {
            send -- \"$PW\r\"
            expect {
              \"Permission denied\" { exit 1 }
              eof { exit [lindex [wait] 3] }
            }
          }
          eof { exit [lindex [wait] 3] }
        }
      " >/dev/null 2>&1
      return $?
    }
    
    # Запрос пароля
    get_password() {
      local retries=0
      while [ $retries -lt $MAX_RETRIES ]; do
        read -s -p "[ Transfer Agent ] [ INPUT ] Введите SSH пароль для $SSH_USER@$SSH_IP: " SSHPASS
        echo ""
        test_password "$SSHPASS"
        if [ $? -eq 0 ]; then return 0; fi
        echo "[ Transfer Agent ] [ ERROR ] Неверный пароль."
        retries=$((retries + 1))
      done
      exit 1
    }
    
    # Попытка входа по ключу
    if [ -n "$SSH_KEY" ]; then
      ssh -i "$SSH_KEY" -o BatchMode=yes -o StrictHostKeyChecking=no -p "$SSH_PORT" "$SSH_USER@$SSH_IP" exit >/dev/null 2>&1
      if [ $? -eq 0 ]; then
        echo "[ Transfer Agent ] [ INFO ] Ключ валиден!"
        USING_KEY=true
      else
        echo "[ Transfer Agent ] [ WARN ] Вход по ключу не удался. Переходим к паролю."
        SSH_KEY=""
        USING_KEY=false
      fi
    else
      USING_KEY=false
    fi
    
    if [ "$USING_KEY" = false ]; then
      get_password
      echo "[ Transfer Agent ] [ INFO ] Пароль принят!"
    fi
    
    # Создание папки на новом сервере
    echo "[ Transfer Agent ] [ INFO ] Создаем папку на удаленном сервере..."
    if [ -n "$SSH_KEY" ]; then
      ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no -p "$SSH_PORT" "$SSH_USER@$SSH_IP" "mkdir -p $DESTINATION_PATH"
    else
      expect -c "
        spawn ssh -o StrictHostKeyChecking=no -p $SSH_PORT $SSH_USER@$SSH_IP mkdir -p $DESTINATION_PATH
        expect \"*?assword:\" { send -- \"$SSHPASS\r\"; exp_continue }
      " >/dev/null 2>&1
    fi
    
    # Копирование файлов
    echo "[ Transfer Agent ] [ INFO ] Запуск копирования файлов..."
    if [ -n "$SSH_KEY" ]; then
      scp -i "$SSH_KEY" -o StrictHostKeyChecking=no -P "$SSH_PORT" -r "$SOURCE_PATH"/. "$SSH_USER@$SSH_IP:$DESTINATION_PATH"
    else
      expect -c "
        spawn scp -o StrictHostKeyChecking=no -P $SSH_PORT -r $SOURCE_PATH/. $SSH_USER@$SSH_IP:$DESTINATION_PATH
        expect \"*?assword:\" { send -- \"$SSHPASS\r\"; exp_continue }
      "
    fi
    
    if [ $? -eq 0 ]; then
      echo "[ Transfer Agent ] [ SUCCESS ] Перенос завершен."
    else
      echo "[ Transfer Agent ] [ ERROR ] Ошибка при переносе."
      exit 1
    fi
    ```
    
3. **Настройте переменные** в начале скрипта (`SSH_IP`, `SSH_USER` и т.д.).
4. **Запустите перенос**:
   ```sh
   ./transfer.sh
   ```

---

## 5. Восстановление на новом сервере

1. **Разверните приложение** в Coolify на новом сервере, затем **остановите его**, чтобы тома были созданы, но не заняты.
2. **Зайдите по SSH** на новый сервер и создайте `restore.sh`:
   ```sh
   touch restore.sh && chmod +x restore.sh
   ```
3. **Вставьте код**:
    ```sh title="restore.sh"
    #!/bin/bash
    
    # === ВВОД ДАННЫХ ===
    read -p "[ Restore Agent ] [ INPUT ] Введите имя целевого тома (target volume): " TARGET_VOLUME
    
    # Проверка
    if ! docker volume ls --quiet | grep -q "^$TARGET_VOLUME$"; then
      echo "[ Restore Agent ] [ ERROR ] Том '$TARGET_VOLUME' не существует."
      read -p "[ Restore Agent ] [ INPUT ] Создать новый том с именем '$TARGET_VOLUME'? (y/N): " create_volume
      if [[ "$create_volume" == "y" ]]; then
        docker volume create "$TARGET_VOLUME"
      else
        exit 1
      fi
    fi
    
    read -p "[ Restore Agent ] [ INPUT ] Папка с бэкапами (по умолчанию ./volume-backup): " BACKUP_DIR
    BACKUP_DIR=${BACKUP_DIR:-./volume-backup}
    
    if [[ ! -d "$BACKUP_DIR" ]]; then
      echo "[ Restore Agent ] [ ERROR ] Папка не найдена."
      exit 1
    fi
    
    read -p "[ Restore Agent ] [ INPUT ] Имя файла архива (например, myapp-backup.tar.gz): " BACKUP_FILE
    
    if [[ ! -f "$BACKUP_DIR/$BACKUP_FILE" ]]; then
      echo "[ Restore Agent ] [ ERROR ] Файл не найден."
      exit 1
    fi
    
    # Подтверждение
    echo "[ Restore Agent ] [ INFO ] УБЕДИТЕСЬ, что контейнеры, использующие '$TARGET_VOLUME', ОСТАНОВЛЕНЫ!"
    read -p "[ Restore Agent ] [ INPUT ] Продолжить? (y/N): " confirm
    if [[ "$confirm" != "y" ]]; then exit 1; fi
    
    # === ВОССТАНОВЛЕНИЕ ===
    echo "[ Restore Agent ] [ INFO ] Восстановление $BACKUP_FILE в том: $TARGET_VOLUME"
    
    docker run --rm \
      -v "$TARGET_VOLUME":/volume \
      -v "$(pwd)/$BACKUP_DIR":/backup \
      busybox \
      sh -c "cd /volume && tar xzf /backup/$BACKUP_FILE" || { 
        echo "[ Restore Agent ] [ ERROR ] Сбой процесса восстановления."
        exit 1
    }
    
    echo "[ Restore Agent ] [ SUCCESS ] Восстановление завершено!"
    ```

4. **Запустите скрипт**:
   ```sh
   ./restore.sh
   ```
   - Укажите имя тома (можно узнать через `docker volume ls`).
   - Укажите путь к папке и имя файла архива.

---

## 6. Запуск приложения
После завершения процесса зайдите в дашборд Coolify и нажмите **Deploy**.

Приложение должно запуститься с уже перенесенными данными. Если возникли ошибки, проверьте логи — возможно, файлы распаковались неправильно или не в ту директорию.

::: warning Примечание
  Если на новом сервере отличаются учетные данные базы данных (пользователь, имя БД или пароль), обновите их в настройках Coolify, чтобы они соответствовали тем, что были на старом сервере.
  
  <ZoomableImage src="/docs/images/knowledge-base/how-tos/migrate-apps-different-host/4.webp" alt="Скриншот настроек в Coolify" />
:::
