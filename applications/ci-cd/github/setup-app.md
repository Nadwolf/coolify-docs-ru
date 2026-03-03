---
title: "Настройка GitHub App"
description: "Настройте GitHub App в Coolify для доступа и деплоя из приватных репозиториев GitHub, используя автоматический или ручной методы установки."
---

# GitHub App
Github App позволяет предоставить доступ к одному или нескольким приватным репозиториям из вашего личного аккаунта GitHub или организации.


### Зачем использовать GitHub App с Coolify?
**Разграничение доступа:** GitHub App позволяет предоставить Coolify доступ к конкретному репозиторию, выбранной группе репозиториев или ко всем репозиториям сразу. Это дает гибкость и лучший контроль над тем, к чему Coolify имеет доступ.

### Когда НЕ стоит использовать GitHub App с Coolify?
**Отсутствие прав:** если у вас нет необходимых прав для установки GitHub App или вы предпочитаете не устанавливать приложения, то лучше не использовать этот метод в Coolify.

## Методы установки
Существует два способа установить GitHub App в Coolify:
- [Автоматическая установка](/applications/ci-cd/github/setup-app#автоматическая-установка) (рекомендуется)
- [Ручная установка](/applications/ci-cd/github/setup-app#ручная-установка)

Мы настоятельно рекомендуем метод автоматической установки, так как он автоматизирует процесс и снижает вероятность ошибок.


::: info Пример данных
Следующие данные используются в качестве примера в этом руководстве. Замените их своими реальными данными при выполнении шагов:

- **Название GitHub App в Coolify:** `Github App Tutorial`
- **Название GitHub App на GitHub:** `coolify-github-app-tutorial`
- **Эндпоинт вебхука:** `https://coolboxy.shadowarcanist.internal`
:::


## Автоматическая установка
### 1. Создайте GitHub App в Coolify
<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/1.webp" />
1. В дашборде Coolify на боковой панели нажмите **Sources** (Источники).
2. Нажмите кнопку **+ Add**, чтобы создать новое приложение GitHub.

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/2.webp" />
3. Введите название для вашего приложения.
4. Введите название вашей организации GitHub (если вы добавляете приложение в личный аккаунт, оставьте это поле пустым) и нажмите **Continue**.

::: info 
1. Если вы используете Self-hosted или Enterprise версию GitHub, вы можете ввести свои данные в соответствующем разделе.
2. Опция «System wide» позволяет всем командам вашего инстанса Coolify использовать это приложение. Если вы хотите, чтобы только текущая команда имела к нему доступ, оставьте эту опцию выключенной.
  ::: warning
  Пользователи Coolify Cloud не увидят опцию «System wide», так как она открывает доступ всем пользователям облака. В облачной версии эта опция отключена.
  :::
  
### 2. Настройте эндпоинт вебхука
<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/3.webp" />

1. Выберите эндпоинт, на который GitHub будет отправлять вебхуки при возникновении событий (коммит, PR). Если этот адрес недоступен, автоматические деплои не будут работать. Если вы решите закрыть порт 8000 на сервере, установите адрес вашего дашборда Coolify в качестве эндпоинта.

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/4.webp" />
2. Предварительные развертывания (Preview deployments) включены по умолчанию, вы можете отключить их при желании.
3. Нажмите кнопку **Register now** (это перенаправит вас на GitHub).


### 3. Создайте GitHub App на стороне GitHub
<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/5.webp" />
1. Дайте вашему приложению название (оно будет отображаться в списке приложений GitHub, вы всегда сможете его изменить позже).
2. Нажмите кнопку **Create app** (это вернет вас в дашборд Coolify).

### 4. Разрешите GitHub App доступ к репозиториям
<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/6.webp" />
1. Нажмите кнопку **Install repositories on Github**.

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/7.webp" />
2. Выберите репозитории, к которым вы хотите предоставить доступ приложению (все или только конкретные).
3. Нажмите кнопку **Install** (это вернет вас в дашборд Coolify).

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/8.webp" />

### 5. Создайте новый ресурс в Coolify
<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/9.webp" />

1. Выберите свой проект в дашборде Coolify.
2. Нажмите кнопку **+ New**, чтобы создать новый ресурс.


### 6. Выберите тип ресурса Private Repository (with Github App)
<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/10.webp" />
Выберите **Private Repository (with Github App)** (Приватный репозиторий через Github App) из доступных типов ресурсов.


### 6. Выберите сервер
::: warning ВНИМАНИЕ!
Coolify автоматически выбирает сервер `localhost`, если у вас нет других подключенных серверов. В таких случаях переходите к следующему шагу.
:::

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/11.webp" />

Выберите сервер, на котором вы хотите развернуть приложение.


### 7. Выберите ваше GitHub App
<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/12.webp" />

Выберите созданное вами GitHub App из списка доступных.


### 8. Настройте приложение и разверните
<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/13.webp" />

1. Выберите репозиторий и нажмите кнопку **Load Repository**.

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/14.webp" />
2. После выбора репозитория настройте билдпак, порты и другие параметры. (Подробнее см. в нашем руководстве по [сборкам](/applications/build-packs/overview).)

После завершения настройки разверните ваше приложение.

Вот и всё! 

---

::: danger ВНИМАНИЕ!
**На этом руководство по автоматической установке заканчивается. Если вы выполнили шаги выше, вы уже можете использовать GitHub App. Инструкции ниже предназначены для тех, кто хочет настроить всё вручную.**
:::

## Ручная установка
### 1. Создайте GitHub App в Coolify
<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/15.webp" />
1. В дашборде Coolify на боковой панели нажмите **Sources** (Источники).
2. Нажмите кнопку **+ Add**, чтобы создать новое приложение GitHub.

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/16.webp" />
3. Введите название для вашего приложения.
4. Введите название вашей организации GitHub (если добавляете в личный аккаунт, оставьте пустым) и нажмите **Continue**.

::: info 
1. Если вы используете Self-hosted или Enterprise версию GitHub, вы можете ввести свои данные в соответствующем разделе.
2. Опция «System wide» позволяет всем командам вашего инстанса использовать этот источник.
  ::: warning
  Для пользователей Coolify Cloud опция «System wide» скрыта.
  :::
  
<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/17.webp" />
5. Нажмите кнопку **Continue**.
<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/18.webp" />
6. Сохраните **Source ID** вашего GitHub-приложения (это UUID, который вы видите в адресной строке после `/github/`).

Для настройки нам понадобятся следующие данные:
- App ID
- Installation ID
- Client ID
- Client Secret
- Webhook Secret
- SSH Key (Приватный ключ)

Мы получим их на следующих этапах.

### 2. Создайте приложение на GitHub
Процесс создания приложений на GitHub немного отличается для личных аккаунтов и организаций, выберите нужный вариант ниже:

:::tabs
== Личный аккаунт
<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/19.webp" />

1. Перейдите в настройки вашего аккаунта GitHub.
2. В боковом меню прокрутите вниз до **Developer settings** и нажмите на них.

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/20.webp" />
3. Нажмите кнопку **New GitHub App**.


== Организация
<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/21.webp" />

1. Перейдите в настройки вашей организации на GitHub.
2. Прокрутите вниз до **Developer settings**.
3. Нажмите на **GitHub Apps**.
4. Нажмите кнопку **New GitHub App**.

:::

### 3. Настройте GitHub App на GitHub
<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/22.webp" />
1. Укажите название приложения.
2. Введите URL домашней страницы (может быть любым).

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/23.webp" />
3. Прокрутите вниз до раздела **Post Installation**.
4. Введите **Setup URL**: `https://coolboxy.shadowarcanist.internal/webhooks/source/github/install?source=ВАШ_SOURCE_ID`

5. Включите опцию `Redirect on Update`.
6. Введите **Webhook URL**: `https://coolboxy.shadowarcanist.internal/webhooks/source/github/events`

::: info
  Замените `https://coolboxy.shadowarcanist.internal` на адрес вашего дашборда Coolify, а `ВАШ_SOURCE_ID` — на Идентификатор Источника из [Шага 1](#_1-создайте-github-app-в-coolify-1).
:::

7. Введите **Webhook Secret** (символьная строка, которую можно сгенерировать любым удобным способом).
8. Включите опцию `Enable SSL verification`.

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/24.webp" />
9. Прокрутите до раздела **Permissions** (Права доступа).
10. Установите `Read-only` для `Contents`.
11. Установите `Read and write` для `Pull Requests` (нужно только для превью-деплоев).
12. Установите `Read-only` для `Email addresses`.

::: warning ПРИМЕЧАНИЕ!
На скриншоте выше показаны только те права, которые необходимы для работы приложения с Coolify.
:::

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/25.webp" />
13. Прокрутите до раздела **Subscribe to events** (Подписка на события).
14. Включите `Push`.
15. Включите `Pull requests` (если нужны превью-деплои).
16. Выберите опцию `Only on this account` (чтобы другие не могли установить ваше приложение).
17. Нажмите кнопку **Create GitHub App**.

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/26.webp" />
18. Сохраните `App ID` и `Client ID` (их нужно будет ввести в Coolify).

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/27.webp" />
19. Нажмите кнопку **Generate a new client secret**.
20. Сохраните полученный `client secret`.

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/28.webp" />
21. Прокрутите до раздела **Private keys**.
22. Нажмите **Generate a private key** (приватный ключ скачается автоматически в файле `.pem`).

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/29.webp" />
23. Нажмите **Install App** в боковом меню.
24. Нажмите кнопку **Install**.

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/30.webp" />
25. Выберите репозитории для доступа.
26. Нажмите **Install**.

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/31.webp" />
27. Нажмите на иконку настроек (переход к приложениям аккаунта или организации).

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/32.webp" />
28. Сохраните **Installation ID** (число, которое вы видите в адресной строке после `/installations/`).


### 4. Добавьте приватный ключ в Coolify

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/33.webp" />
1. В дашборде Coolify на боковой панели нажмите **Keys & Tokens**.
2. Перейдите на вкладку **Private keys**.
3. Нажмите кнопку **+ Add**, чтобы добавить новый ключ.

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/34.webp" />
4. Дайте ключу название.
5. Вставьте содержимое файла `.pem`, который был скачан при создании приложения на GitHub.
6. Нажмите кнопку **Continue**.

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/35.webp" />
7. В дашборде Coolify нажмите **Sources** и выберите ваше GitHub App.
8. Введите сохраненные ранее данные (App ID, Installation ID и др.).
9. В поле «Private key» выберите только что добавленный в Coolify ключ.
10. Нажмите кнопку **Sync Name**. Если появилось сообщение об успехе — всё настроено верно!


### 5. Создайте новый ресурс в Coolify
<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/36.webp" />

1. Выберите свой проект в дашборде Coolify.
2. Нажмите кнопку **+ New**, чтобы создать новый ресурс.


### 6. Выберите тип ресурса Private Repository (with Github App)
<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/37.webp" />
Выберите **Private Repository (with Github App)** из доступных типов ресурсов.


### 6. Выберите сервер
::: warning ВНИМАНИЕ!
Coolify автоматически выбирает сервер `localhost`, если нет других. В этом случае переходите к следующему шагу.
:::

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/38.webp" />

Выберите сервер для деплоя.


### 7. Выберите ваше GitHub App
<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/39.webp" />

Выберите созданное GitHub App из списка.


### 8. Настройте приложение и разверните
<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/40.webp" />

1. Выберите репозиторий и нажмите **Load Repository**.

<ZoomableImage src="/docs/images/applications/ci-cd/github/setup-app/41.webp" />
2. Настройте билдпак, порты и всё остальное. (Подробнее см. в руководстве по [сборкам](/applications/build-packs/overview).)

После этого разверните приложение.

Вот и всё!