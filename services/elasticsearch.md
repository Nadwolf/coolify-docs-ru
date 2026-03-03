---
title: "Elasticsearch"
description: "Здесь вы найдете документацию по размещению Elasticsearch с помощью Coolify."
---

# Elasticsearch

![ElasticSearch](https://coolify.io/docs/images/services/elasticsearch-logo.svg)

## Что такое Elasticsearch?

Elasticsearch — это поисковая и аналитическая система (search and analytics engine) с открытым исходным кодом, предназначенная для быстрого и масштабируемого извлечения данных, идеально подходящая для обработки больших объемов как структурированных, так и неструктурированных данных.

## Как развернуть Elasticsearch в Coolify

Существует два способа развернуть Elasticsearch в Coolify:

- **Elasticsearch как самостоятельный сервис (standalone service)** (без графического интерфейса пользователя - GUI)
- **Elasticsearch с Kibana** (с GUI)

---

## Elasticsearch как самостоятельный сервис

1. Создайте новый ресурс в Coolify и выберите **Elasticsearch with Kibana** из списка сервисов.
2. Нажмите кнопку **Deploy** (Развернуть), чтобы загрузить (pull) образы Docker и запустить контейнеры.
3. Как только служба `Elasticsearch` станет работоспособной (healthy), вы сможете получить к ней доступ через назначенный ей домен.
   > ⚠️ Примечание: В этой версии нет графического интерфейса (GUI) — вам придется взаимодействовать с ней с помощью инструментов CLI или API.

---

## Развертывание Elasticsearch с Kibana

1. Создайте новый ресурс в Coolify и выберите **Elasticsearch with Kibana** из списка сервисов.
2. Нажмите кнопку **Deploy**, чтобы загрузить образы Docker и запустить контейнеры.
3. Как только служба `Elasticsearch` будет запущена, а служба `Kibana Token Generator` покажет статус **exited** (завершена):
   - Откройте логи (logs) службы `Kibana Token Generator`.
   - Скопируйте **Service Token** (Токен службы) из логов.
   - Вставьте токен в переменную окружения (environment variable) `ELASTICSEARCH_SERVICEACCOUNTTOKEN`.
   - Перезапустите службу (нажмите кнопку **Restart**).
4. После того как службы `Elasticsearch` и `Kibana` будут запущены и станут работоспособными (healthy), перейдите на домен, назначенный службе.
   - Вы увидите страницу входа Elastic.
   - **Имя пользователя (Username):** `elastic`  
     **Пароль (Password):** значение переменной окружения `SERVICE_PASSWORD_ELASTICSEARCH`.

Если какие-либо из вышеописанных шагов непонятны, вы можете обратиться к [этому Pull Request](https://github.com/coollabsio/coolify/pull/6470), который включает видеоруководство (video walkthrough) по всему процессу развертывания.

---

### Примечания для Elasticsearch с Kibana

1. Полный запуск всех сервисов может занять более **2 минут** (в зависимости от производительности вашего сервера).
2. Размер кучи JVM (JVM heap size) по умолчанию установлен в **512MB**, чтобы Elasticsearch не исчерпал память сервера.
   > Чтобы увеличить это значение, измените переменную окружения:  
   > `ES_JAVA_OPTS=-Xms512m -Xmx512m` в файле Docker Compose.
3. Служба `Kibana Token Generator` разработана так, чтобы **выполниться один раз и затем завершиться (exit)**. Это ожидаемое поведение и не влияет на работоспособность (health) служб Elastic или Kibana.
4. Кластеризация (Clustering) **отключена по умолчанию** с помощью переменной окружения `discovery.type=single-node`.
   > Обновите этот параметр, если требуется кластеризация.

---

## Полезные ссылки

- [Официальный сайт](https://www.elastic.co/?utm_source=coolify.io)
- [Официальная документация](https://www.elastic.co/docs/deploy-manage/deploy/self-managed/install-kibana-with-docker?utm_source=coolify.io)
