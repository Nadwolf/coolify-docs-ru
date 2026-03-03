---
title: "GitHub Deploy Key"
description: "Развертывайте приложения из приватных репозиториев GitHub, используя ключи развертывания (deploy keys) в Coolify."
---

# GitHub Deploy Key
Ключи развертывания (Deploy keys) позволяют предоставить доступ только для чтения к одному приватному репозиторию GitHub без использования персонального токена доступа или SSH-ключа, привязанного к вашему аккаунту.

При использовании ключей развертывания Coolify может безопасно клонировать и развертывать приложения из приватных репозиториев, гарантируя доступ только к указанному проекту.


### Зачем использовать ключи развертывания с Coolify?
1. **Безопасный доступ:** предоставление доступа «только для чтения» к одному конкретному репозиторию без риска для остальных проектов.
2. **Ограниченная область действия:** ключи развертывания действуют только в рамках одного репозитория.
3. **Защита аккаунта:** предотвращает потенциальные риски безопасности в случае компрометации ключа.
4. **Невозможность установки Github App:** ключи развертывания можно использовать, если у вас нет разрешений на установку GitHub App в вашей организации.


### Когда НЕ стоит использовать ключи развертывания
1. **Несколько репозиториев:** если вам нужен доступ к нескольким приватным репозиториям, рассмотрите возможность использования GitHub App.

---

::: info Пример данных
Следующие данные используются в качестве примера в этом руководстве. Замените их своими реальными данными при выполнении шагов:

- **Владелец репозитория:** `ShadowArcanist`
- **Название репозитория:** `coolify-dev`
- **Название ключа развертывания:** `Deploy Key Tutorial`
- **SSH URL:** `git@github.com:ShadowArcanist/coolify-dev.git`
:::


## 1. Создайте приватный ключ в Coolify
<ZoomableImage src="/docs/images/applications/ci-cd/github/deploy-key/1.webp" />

1. В дашборде Coolify на боковой панели нажмите **Keys & Tokens**.
2. Перейдите на вкладку **Private keys**.
3. Нажмите кнопку **+ Add**, чтобы создать новый приватный ключ.

<ZoomableImage src="/docs/images/applications/ci-cd/github/deploy-key/2.webp" />

4. Нажмите **Generate new RSA SSH Key** или **Generate new ED25519 SSH Key**, чтобы создать пару ключей.

<ZoomableImage src="/docs/images/applications/ci-cd/github/deploy-key/3.webp" />

5. Скопируйте публичный ключ.
6. Нажмите **Continue**, чтобы сохранить ключи.

::: success ПОДСКАЗКА
Вы также можете сгенерировать ключ самостоятельно с помощью команды `ssh-keygen` и вставить приватный ключ в Coolify:

```sh
ssh-keygen -t rsa -b 4096 -C "coolify-deploy-key"
```

Затем скопируйте содержимое сгенерированного файла `.pub` для следующего шага.
:::


## 2. Добавьте ключ развертывания на GitHub
<ZoomableImage src="/docs/images/applications/ci-cd/github/deploy-key/4.webp" />

1. Перейдите в настройки вашего репозитория GitHub.
2. Откройте раздел **Deploy keys** в левом боковом меню.
3. Нажмите кнопку **Add deploy key**.

::: info ПОДСКАЗКА
Вы также можете перейти на страницу ключей развертывания напрямую: `https://github.com/ВАШ_ЛОГИН/ВАШ_РЕПОЗИТОРИЙ/settings/keys`
:::

<ZoomableImage src="/docs/images/applications/ci-cd/github/deploy-key/5.webp" />

4. Введите название для вашего ключа (например, `Coolify Deploy Key`).
5. Вставьте публичный ключ, который вы скопировали из Coolify.
6. Убедитесь, что галочка **Allow write access** (Разрешить доступ на запись) снята (ключи деплоя должны быть только для чтения).
7. Нажмите **Add key**, чтобы сохранить.

<ZoomableImage src="/docs/images/applications/ci-cd/github/deploy-key/6.webp" />

## 3. Скопируйте SSH URL репозитория
<ZoomableImage src="/docs/images/applications/ci-cd/github/deploy-key/7.webp" />

1. Перейдите к вашему репозиторию на GitHub.
2. Нажмите кнопку **Code**.
3. Перейдите во вкладку **Local**.
4. Выберите вкладку **SSH**.
5. Скопируйте SSH URL (например, `git@github.com:ShadowArcanist/coolify-dev.git`).


## 4. Создайте новый ресурс в Coolify
<ZoomableImage src="/docs/images/applications/ci-cd/github/deploy-key/8.webp" />

1. Выберите свой проект в дашборде Coolify.
2. Нажмите кнопку **+ New**, чтобы создать новый ресурс.


## 5. Выберите тип ресурса Private Repository (with Deploy Key)
<ZoomableImage src="/docs/images/applications/ci-cd/github/deploy-key/9.webp" />

Выберите **Private Repository (with Deploy Key)** из доступных типов ресурсов.


## 6. Выберите сервер
::: warning ВНИМАНИЕ!
Coolify автоматически выбирает сервер `localhost`, если нет других подключенных серверов. В таких случаях переходите к следующему шагу.
:::

<ZoomableImage src="/docs/images/applications/ci-cd/github/deploy-key/10.webp" />

Выберите сервер, на котором вы хотите развернуть приложение.


## 7. Выберите ваш ключ развертывания
<ZoomableImage src="/docs/images/applications/ci-cd/github/deploy-key/11.webp" />

Выберите созданный вами в Coolify приватный ключ из списка.


## 8. Настройте приложение и разверните
<ZoomableImage src="/docs/images/applications/ci-cd/github/deploy-key/12.webp" />

1. Вставьте SSH URL вашего репозитория (например, `git@github.com:ShadowArcanist/coolify-dev.git`).
2. После ввода ссылки настройте билдпак, порты и другие параметры. (Подробнее см. в нашем руководстве по [сборкам](/builds/introduction).)

После завершения настройки разверните приложение.

Вот и всё!
