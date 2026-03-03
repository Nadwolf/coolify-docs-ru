---
title: Деплой проектов Webstudio на Hetzner с помощью Coolify
description: Полное руководство по развертыванию проектов Webstudio с Coolify на серверах Hetzner с использованием Docker, интеграции с GitHub и автоматического деплоя.
---

# Деплой проектов Webstudio с помощью Coolify
Coolify делает развертывание ваших проектов Webstudio на Hetzner максимально простым и эффективным.

В этом руководстве вы узнаете, как настроить проект, развернуть его на сервере Hetzner и полностью контролировать свою инфраструктуру за несколько простых шагов.

::: warning ВНИМАНИЕ!
В этом руководстве мы используем серверы от Hetzner.

Однако, если вы используете другого хостинг-провайдера, вы всё равно можете следовать этой инструкции — шаги для других серверов будут аналогичными.

Если вы предпочитаете видеоформат, посмотрите [обучающее видео](https://youtu.be/OnHLO2Plt2E?si=yDM77oK7Xd5UsRSP).
:::

## Что вам понадобится

Перед началом убедитесь, что у вас есть:

- Аккаунт на [GitHub](https://github.com?utm_source=coolify.io) для хранения кода.
- Аккаунт на [Hetzner](https://coolify.io/hetzner) для аренды сервера (или у любого другого провайдера).
- Установленный локально [Webstudio CLI](https://docs.webstudio.is/university/self-hosting/cli?utm_source=coolify.io) для экспорта проекта.

## 1. Создание репозитория на GitHub

Начните с [создания нового репозитория](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository) на GitHub, где вы будете хранить код вашего проекта Webstudio.

После создания [склонируйте репозиторий](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) на свой локальный компьютер.

## 2. Экспорт проекта Webstudio

Используя [CLI](https://docs.webstudio.is/university/self-hosting/cli) Webstudio, экспортируйте ваш проект, выбрав опцию "**Docker**".

Это подготовит ваш проект к деплою через Coolify без необходимости устанавливать дополнительные зависимости.

## 3. Пуш кода на GitHub

После экспорта проекта локально [отправьте ваш код](https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository) в созданный репозиторий GitHub. Теперь ваш проект готов к развертыванию.

## 4. Настройка сервера Hetzner

::: warning ВНИМАНИЕ!
Если у вас уже есть сервер, покупать новый не нужно.

**Webstudio рекомендует**, чтобы ваш сервер имел как минимум **1 CPU и 2 ГБ ОЗУ** для плавной работы.

Переходите к [Шагу 6](#6-настройка-проекта-в-coolify), если ваш сервер уже подключен к Coolify.
:::

Выполните следующие шаги для подготовки сервера Hetzner:

1. **Создайте новый сервер:** Войдите в [Hetzner Cloud Dashboard ↗](https://console.hetzner.cloud/) и создайте инстанс.
  <ZoomableImage src="/docs/images/knowledge-base/how-tos/webstudio-with-hetzner/1.webp" />

2. **Выберите регион:** Выберите регион, который лучше всего вам подходит.
  <ZoomableImage src="/docs/images/knowledge-base/how-tos/webstudio-with-hetzner/2.webp" />

3. **Выберите Ubuntu:** Выберите образ Ubuntu (убедитесь, что версия поддерживает Docker, см. [требования Docker к Ubuntu](https://docs.docker.com/engine/install/ubuntu/#os-requirements)).
  <ZoomableImage src="/docs/images/knowledge-base/how-tos/webstudio-with-hetzner/3.webp" />

4. **Настройте ресурсы:** Рекомендуется Shared CPU и минимум 2 ГБ оперативной памяти.
  <ZoomableImage src="/docs/images/knowledge-base/how-tos/webstudio-with-hetzner/4.webp" />

5. **Выделите IPv4 адрес:** Убедитесь, что у сервера есть выделенный IPv4 адрес.
  <ZoomableImage src="/docs/images/knowledge-base/how-tos/webstudio-with-hetzner/5.webp" />

6. **Завершите создание:** Нажмите **Create and Buy Now** и дождитесь активации сервера.

7. **Сохраните IP:** Скопируйте IPv4 адрес сервера, он понадобится в ближайшее время.

## 5. Подключение Coolify к вашему серверу

::: warning ВНИМАНИЕ!
Если ваш сервер уже подключен к Coolify, переходите к [следующему шагу](#6-настройка-проекта-в-coolify).
:::

1. **Добавьте приватный ключ:** Войдите в свой аккаунт Coolify и добавьте новый приватный ключ.
  <ZoomableImage src="/docs/images/knowledge-base/how-tos/webstudio-with-hetzner/6.webp" />
  <br />
  <ZoomableImage src="/docs/images/knowledge-base/how-tos/webstudio-with-hetzner/7.webp" />

2. **Добавьте сервер:** Перейдите во вкладку **Servers** и добавьте новый сервер, введя IPv4 адрес вашего сервера Hetzner.
  <ZoomableImage src="/docs/images/knowledge-base/how-tos/webstudio-with-hetzner/8.webp" />
  <br />
  <ZoomableImage src="/docs/images/knowledge-base/how-tos/webstudio-with-hetzner/9.webp" />

3. **Валидация сервера:** Нажмите **Validate Server & Install Docker Engine**. Coolify автоматически установит все необходимые компоненты.
  <ZoomableImage src="/docs/images/knowledge-base/how-tos/webstudio-with-hetzner/10.webp" />

4. **Проверьте статус:** После завершения вы должны увидеть зеленый статус **Proxy Running**, что означает готовность сервера.
  <ZoomableImage src="/docs/images/knowledge-base/how-tos/webstudio-with-hetzner/11.webp" />

## 6. Настройка проекта в Coolify
1. **Создайте новый проект:** Перейдите в раздел **Projects** и создайте проект.

2. **Добавьте ресурс:** Добавьте новый ресурс, выбрав ваш GitHub репозиторий в качестве источника.

3. **Подключите репозиторий:** Используйте интеграцию с GitHub App, чтобы предоставить доступ к репозиторию.
  <ZoomableImage src="/docs/images/knowledge-base/how-tos/webstudio-with-hetzner/12.webp" />

4. **Выберите Build Pack:** Измените тип сборки (Build Pack) на **Dockerfile** и нажмите "Continue".
  <ZoomableImage src="/docs/images/knowledge-base/how-tos/webstudio-with-hetzner/13.webp" />

5. **Настройте домены и деплой:** Введите ваш домен в соответствующее поле, нажмите **Deploy** и дождитесь завершения сборки.
  <ZoomableImage src="/docs/images/knowledge-base/how-tos/webstudio-with-hetzner/14.webp" />

6. **Успешный деплой:** Когда процесс завершится, вы увидите сообщение “Deployment is Finished”.

7. **Откройте сайт:** Используйте кнопку **links** в верхней части дашборда проекта, чтобы перейти на ваш работающий сайт.
  <ZoomableImage src="/docs/images/knowledge-base/how-tos/webstudio-with-hetzner/15.webp" />

8. **Опционально – внешние домены:** Если ваш проект загружает изображения со сторонних ресурсов, добавьте эти домены через запятую в переменную окружения `DOMAINS` (не забудьте перезапустить приложение после этого).
  <ZoomableImage src="/docs/images/knowledge-base/how-tos/webstudio-with-hetzner/16.webp" />

## 7. Обновление вашего сайта Webstudio

Чтобы публиковать обновления и поддерживать сайт в актуальном состоянии:

1. **Опубликуйте изменения:** В конструкторе Webstudio нажмите **Publish**, чтобы сгенерировать новые данные сборки.
2. **Синхронизация и сборка:** Выполните в терминале команды:
   ```bash
   webstudio sync
   webstudio build --template docker
   ```
3. **Пуш обновлений:** Закоммитьте и отправьте изменения в GitHub. Coolify обнаружит обновление и автоматически запустит новый деплой.

Теперь всё готово!
