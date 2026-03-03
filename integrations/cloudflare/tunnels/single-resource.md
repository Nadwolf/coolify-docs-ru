---
title: "Доступ к отдельному ресурсу через Cloudflare Tunnels"
description: "Безопасно обращайтесь к отдельным приложениям Coolify через Cloudflare Tunnels с помощью маппинга портов, настройки доменов и поддержки туннелирования нескольких ресурсов."
---

# Доступ к отдельному ресурсу через Cloudflare Tunnels

Доступ к ресурсу, развернутому в Coolify, с помощью Cloudflare Tunnel позволяет безопасно обращаться к вашему приложению, не раскрывая IP-адрес сервера и даже не имея публичного IP-адреса.

## Для кого это?

Эта настройка идеальна, если вы:

- Не имеете публичного IP для сервера (это может быть ноутбук, Raspberry Pi и т.д.).
- Не можете пробросить порты (например, при использовании домашнего интернета или в частной сети).
- Хотите сохранить IP-адрес сервера в тайне и избежать его публикации в интернете.
- Уже развернули приложение в Coolify и вам нужен безопасный способ внешнего доступа к нему.

## Требования для настройки

Для выполнения этого руководства вам понадобятся:

- Бесплатный аккаунт [Cloudflare](https://cloudflare.com).
- Домен, **DNS которого управляются через Cloudflare**.
- Ресурс, развернутый и управляемый через Coolify.

## Перед началом

- Мы предполагаем, что Coolify запущен и приложение уже развернуто.
- Если вашему приложению нужен HTTPS для работы (например, для куки или логина), следуйте [руководству по Full TLS HTTPS](/integrations/cloudflare/tunnels/full-tls) после выполнения этой инструкции. Это связано с тем, что здесь Cloudflare управляет HTTPS извне, а внутри Coolify приложение работает по HTTP.

## Как это работает?

Простая схема для визуального понимания процесса:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/single-resource/high-level-diagram.webp" />

---

### Быстрые ссылки на важные разделы:

- [Настройка приложения для туннелирования](#_1-настройка-приложения-для-туннелирования)
- [Создание Cloudflare Tunnel](#_2-создание-cloudflare-tunnel)
- [Настройка Cloudflare Tunnel в Coolify](#_3-настройка-cloudflare-tunnel-в-coolify)
- [Публикация нескольких ресурсов на разных доменах](#публикация-нескольких-ресурсов-на-разных-доменах)
- [Известные проблемы и решения](#известные-проблемы-и-решения)

---

::: warning Пример данных
В этом руководстве используются следующие данные в качестве примера. Заменяйте их своими реальными данными:

- **Доменное имя:** example.com
- **Открытые порты (Ports Exposed):** 80
- **Маппинг портов (Ports Mapping):** 4477:80
:::

---

## 1. Настройка приложения для туннелирования

Чтобы подготовить приложение:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/single-resource/1.webp" />

1. Удалите все домены из поля **Domains**.
2. Укажите правильный порт в **Ports Exposed** (порт, который использует ваше приложение).
3. Укажите правильные порты в **Port Mappings** (слева — порт хоста, справа — порт приложения).
4. Переразверните приложение, нажав кнопку **Deploy**.

## 2. Создание Cloudflare Tunnel

Войдите в аккаунт Cloudflare и перейдите на страницу [Zero Trust](https://one.dash.cloudflare.com/).

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/single-resource/2.webp" />

1. В разделе **Networks** выберите **Tunnels**.
2. Нажмите **Add a tunnel**.
3. Нажмите **Select Cloudflared**.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/single-resource/3.webp" />

Введите название туннеля.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/single-resource/4.webp" />

Далее вы увидите страницу конфигурации.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/single-resource/5.webp" />

Скопируйте команду установки. Вам нужен только токен (начинается с «eyJ»). Сохраните его.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/single-resource/6.webp" />

Нажмите **Next**. Вам будет предложено добавить имя хоста (hostname).

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/single-resource/7.webp" />

1. **Subdomain** - (Опционально) Укажите поддомен, если нужно.
2. **Domain** - Выберите ваш домен.
3. **Path** - Оставьте пустым.
4. **Service Type** - Выберите **HTTP** (важно).
5. **URL** - Введите **localhost:4477**. Порт 4477 — это тот, который мы пробросили на хост на [Шаге 1](#_1-настройка-приложения-для-туннелирования). Используйте свой порт.
6. Нажмите **Save Tunnel**.

## 3. Настройка Cloudflare Tunnel в Coolify

Чтобы запустить туннель в Coolify:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/single-resource/8.webp" />

Нажмите **+ New** в вашем проекте.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/single-resource/9.webp" />

Найдите **Cloudflared** и выберите его.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/single-resource/10.webp" />

В разделе **Environment Variables** введите токен туннеля (из [Шага 2](#_2-создание-cloudflare-tunnel)) и разверните приложение.

**Поздравляем**! Теперь ваше приложение доступно всему интернету по вашему домену.

::: danger ВНИМАНИЕ!
**Выше описано туннелирование одного ресурса. Ниже — информация о работе с несколькими ресурсами.**
:::

## Туннелирование нескольких ресурсов

Самый простой способ — следовать руководству [Туннелирование всех ресурсов](/integrations/cloudflare/tunnels/all-resource), которое использует встроенный прокси Coolify. Но если вы не хотите использовать прокси, есть альтернативы:

- [Туннелирование нескольких отдельных ресурсов](#туннелирование-нескольких-отдельных-ресурсов)
- [Туннелирование самого Coolify](#туннелирование-самого-coolify)

## Туннелирование нескольких отдельных ресурсов

Если вы хотите выставлять разные приложения индивидуально:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/single-resource/11.webp" />

1. Выполните [Шаг 1](#_1-настройка-приложения-для-туннелирования) для нового ресурса.
2. Добавьте новое публичное имя хоста (public hostname) в настройках того же туннеля в Cloudflare (как на [Шаге 2](#_2-создание-cloudflare-tunnel)).

Нет нужды создавать отдельный туннель для каждого ресурса — просто добавляйте хостнеймы и направляйте на нужные порты.

## Туннелирование самого Coolify

Чтобы сделать дашборд Coolify доступным через домен по туннелю, требуется ручная настройка:

### 1. Создание имен хостов в Cloudflare Tunnel

Создайте в туннеле хостнеймы для сервисов Coolify:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/single-resource/14.webp" />

- **Хостнеймы**:
  1. `app.example.com/terminal/ws` → `localhost:6002` (WebSocket терминал)
  2. `realtime.example.com` → `localhost:6001` (Realtime сервер)
  3. `app.example.com` → `localhost:8000` (Дашборд Coolify)

- **Тип**: HTTP.

::: warning ВАЖНО!
Порядок хостнеймов имеет значение! Соответствуйте схеме выше.
:::

---

### 2. Обновление файла `.env` в Coolify

Отредактируйте файл `/data/coolify/source/.env`, чтобы включить соединение с Realtime-сервером:

```bash
###########
# Добавьте эти строки
PUSHER_HOST=realtime.example.com
PUSHER_PORT=443
###########
```

### 3. Перезапуск Coolify

Выполните команду для применения изменений:

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

### 4. Проверка

1. Откройте дашборд по адресу `https://app.example.com`.
2. Проверьте Realtime по адресу `https://app.example.com/realtime` (должно прийти тестовое уведомление).

::: warning ВНИМАНИЕ!
Если используете файрволл, убедитесь, что порты `8000`, `6001`, `6002` открыты для внутренних соединений, но закрыты для внешних.
:::

## Известные проблемы и решения

Если при создании хостнейма на [Шаге 2](#_2-создание-cloudflare-tunnel) DNS-запись уже существует, туннель не заработает.

Чтобы исправить:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/single-resource/12.webp" />

Скопируйте ID вашего туннеля в дашборде Cloudflare.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/single-resource/13.webp" />

Создайте DNS-запись вручную:
1. Тип: **CNAME**.
2. Имя: `*` или ваш поддомен.
3. Target: `ВАШ_ID_ТУННЕЛЯ.cfargotunnel.com`.
4. Статус: **Proxied**.
