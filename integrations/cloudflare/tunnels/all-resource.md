---
title: "Доступ ко всем ресурсам через Cloudflare Tunnels"
description: "Безопасно открывайте доступ ко всем ресурсам Coolify через Cloudflare Tunnels без публичных IP или проброса портов, используя wildcard-домены и маршрутизацию через HTTP прокси."
---

# Доступ ко всем ресурсам через Cloudflare Tunnels

Доступ ко всем ресурсам, развернутым в Coolify, с помощью Cloudflare Tunnel позволяет безопасно обращаться к вашим приложениям, не раскрывая IP-адрес сервера и даже не имея публичного IP-адреса.

## Для кого это?

Эта настройка идеальна, если вы:

- Не имеете публичного IP для сервера (это может быть ноутбук, Raspberry Pi и т.д.).
- Не можете пробросить порты (например, при использовании домашнего интернета или в частной сети).
- Хотите сохранить IP-адрес сервера в тайне и избежать его публикации в интернете.
- Уже развернули ресурсы в Coolify и вам нужен безопасный способ внешнего доступа к ним.

## Требования для настройки

Для выполнения этого руководства вам понадобятся:

- Бесплатный аккаунт [Cloudflare](https://cloudflare.com).
- Домен, **DNS которого управляются через Cloudflare**.

## Перед началом

- Мы предполагаем, что Coolify уже запущен на вашем сервере.
- Если вашему приложению требуется HTTPS для работы таких функций, как куки или авторизация, вам нужно будет ознакомиться с [руководством по Full TLS HTTPS](/integrations/cloudflare/tunnels/full-tls) после выполнения этой инструкции. Это связано с тем, что здесь Cloudflare управляет HTTPS извне, в то время как внутри Coolify ваше приложение работает по HTTP.

## Как это работает?

Простая схема для визуального понимания процесса:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/all-resource/high-level-diagram.webp" />

---

### Быстрые ссылки на важные разделы:

- [Создание Cloudflare Tunnel](#_1-создание-cloudflare-tunnel)
- [Настройка режима шифрования в Cloudflare](#_2-настройка-режима-шифрования-в-cloudflare)
- [Настройка Cloudflare Tunnel в Coolify](#_3-настройка-cloudflare-tunnel-в-coolify)
- [Запуск прокси Coolify](#_4-запуск-прокси-coolify)
- [Настройка ресурса для использования домена туннеля](#_5-настройка-ресурса-для-использования-домена-туннеля)
- [Как использовать несколько разных доменов](#как-использовать-несколько-разных-доменов)
- [Известные проблемы и решения](#известные-проблемы-и-решения)

---

::: warning Пример данных
В этом руководстве используются следующие данные в качестве примера. Заменяйте их своими реальными данными:

- **Доменное имя:** example.com
:::

---

## 1. Создание Cloudflare Tunnel

Чтобы создать туннель, войдите в аккаунт Cloudflare и перейдите на страницу [Zero Trust](https://one.dash.cloudflare.com/).

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/all-resource/1.webp" />

1. На странице Zero Trust выберите **Networks** в боковом меню.
2. Нажмите на **Tunnels**.
3. Нажмите кнопку **Add a tunnel**.

Вам предложат выбрать тип туннеля. Нажмите **Select Cloudflared**.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/all-resource/2.webp" />

Введите название туннеля (любое на ваш вкус).

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/all-resource/3.webp" />

Далее вы увидите страницу конфигурации с вариантами установки cloudflared.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/all-resource/4.webp" />

Скопируйте команду установки, которая содержит токен вашего туннеля (токен начинается с «eyJ»). Обязательно сохраните только сам токен (убрав часть команды перед ним) в надежном месте — он понадобится нам позже.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/all-resource/5.webp" />

Прокрутите вниз до кнопки **Next** и нажмите её.

Затем вам будет предложено добавить имя хоста (hostname).

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/all-resource/6.webp" />

1. **Subdomain** - (Опционально) Вы можете сделать все ресурсы доступными на любом поддомене/домене. В этом руководстве мы используем wildcard (`*`).
2. **Domain** - Выберите домен, который хотите использовать для туннеля.
3. **Path** - Оставьте это поле пустым.
4. **Service Type** - Выберите **HTTP** (это очень важно).
5. **URL** - Введите **localhost:80** (это очень важно).
6. После заполнения нажмите кнопку **Save Tunnel**.

## 2. Настройка режима шифрования в Cloudflare

Для настройки шифрования выполните следующие действия:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/all-resource/15.webp" />

1. Перейдите в раздел **SSL/TLS** в Cloudflare.
2. Выберите **Overview**.
3. Нажмите кнопку **Configure**.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/all-resource/16.webp" />

Выберите режим **Full** в качестве метода шифрования.

## 3. Настройка Cloudflare Tunnel в Coolify

Чтобы настроить туннель на стороне Coolify:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/all-resource/7.webp" />

Перейдите в ваш проект в дашборде Coolify и нажмите кнопку **+ New**, чтобы создать новый ресурс.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/all-resource/8.webp" />

Вы увидите множество вариантов развертывания. Найдите **Cloudflared** и нажмите на него.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/all-resource/9.webp" />

Перейдите на страницу **Environment Variables**, введите ваш токен туннеля и разверните приложение Cloudflared. Этот токен вы скопировали на [Шаге 1](#_1-создание-cloudflare-tunnel).

## 4. Запуск прокси Coolify

Чтобы запустить прокси Coolify:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/all-resource/10.webp" />

1. В дашборде Coolify перейдите на страницу **Servers** в боковом меню.
2. Выберите сервер, на котором запущен Coolify, и перейдите на вкладку **Proxy**.
3. Откройте вкладку **General**.
4. Нажмите кнопку **Start Proxy**.

::: success Совет
Прокси Coolify используется для маршрутизации трафика к приложениям, работающим на вашем сервере. Это избавляет от необходимости создавать новые имена хостов в туннеле Cloudflare каждый раз, когда вы разворачиваете новое приложение.
:::

## 5. Настройка ресурса для использования домена туннеля

Введите домен, который вы хотите использовать для вашего ресурса/приложения, и запустите деплой.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/all-resource/11.webp" />

::: warning ВНИМАНИЕ!
Вы должны вводить домен с протоколом **HTTP**, так как Cloudflare берет на себя **HTTPS** и терминирование TLS. Если вы укажете **HTTPS** для вашего ресурса, вы можете столкнуться с ошибкой **TOO_MANY_REDIRECTS**.

Если вашему приложению ОБЯЗАТЕЛЬНО нужен **HTTPS** (например, для куки), следуйте [руководству по Full TLS HTTPS](/integrations/cloudflare/tunnels/full-tls) после завершения этой настройки.
:::

**Поздравляем**! Вы успешно настроили доступ к вашему ресурсу через интернет по вашему домену.

## Как использовать несколько разных доменов?

Вам не нужно создавать новые туннели для каждого домена. Просто создайте новое имя хоста (public hostname) с новым доменом в настройках туннеля Cloudflare и направьте его на `localhost:80`.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/all-resource/12.webp" />

## Известные проблемы и решения

Когда вы создаете новое публичное имя хоста на [Шаге 1](#_1-создание-cloudflare-tunnel), Cloudflare автоматически создает DNS-запись.

Однако, если DNS-запись для этого хоста уже существует, Cloudflare не сможет создать новую.

В этом случае ваше приложение не будет доступно. Чтобы это исправить:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/all-resource/13.webp" />

Сначала скопируйте ID вашего туннеля со страницы Tunnels в дашборде Cloudflare.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/all-resource/14.webp" />

Создайте новую DNS-запись вручную:

1. В дашборде Cloudflare перейдите в **DNS**.
2. Выберите **Records**.
3. Добавьте запись типа **CNAME**.
4. Введите имя: `*` (или имя вашего поддомена).
5. В поле **Target** введите ваш ID туннеля, добавив в конце `.cfargotunnel.com`.
6. Установите статус прокси в **Proxied**.

Теперь приложение должно быть доступно по вашему домену.
