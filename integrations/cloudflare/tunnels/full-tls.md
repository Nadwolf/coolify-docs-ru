---
title: "Полная настройка HTTPS/TLS для всех ресурсов"
description: "Настройте сквозное шифрование HTTPS для ресурсов Coolify через Cloudflare Tunnels с использованием сертификатов Origin, строгого режима TLS и правильной настройки доменов."
---

# Полная настройка HTTPS/TLS для всех ресурсов

При использовании туннелей Coolify через Cloudflare обычно Cloudflare берет на себя HTTPS и терминирование TLS, в то время как внутри Coolify ваши ресурсы работают по протоколу HTTP.

Такая настройка подходит большинству пользователей, но некоторые могут столкнуться с проблемами несоответствия URL, особенно в приложениях, которым требуется HTTPS непосредственно на стороне Coolify для выпуска JWT-токенов или корректной работы callback-адресов.

Это руководство поможет настроить ресурсы так, чтобы они работали полностью по HTTPS, обходя стандартную обработку HTTPS в Cloudflare и обеспечивая корректную работу вашего приложения с защищенными соединениями.

## Для кого это?

Это руководство идеально подходит для пользователей, которые:

- Уже настроили туннели по инструкциям [Туннелирование всех ресурсов](/integrations/cloudflare/tunnels/all-resource) или [Туннелирование отдельного ресурса](/integrations/cloudflare/tunnels/single-resource).
- Нуждаются в том, чтобы их ресурсы в Coolify работали по HTTPS (например, для выпуска JWT, работы OAuth callback и т.д.).

## Требования для настройки

Для выполнения этого руководства вам понадобятся:

- Работающий туннель Cloudflare, настроенный по предыдущим руководствам.
- Домен в Cloudflare, настроенный для обработки трафика и редиректа на HTTPS.

## Перед началом

- Если ваш экземпляр Coolify находится в том же туннеле, что и настраиваемый домен, убедитесь, что вы можете зайти в дашборд Coolify по IP сервера и порту (например, **203.0.113.1:8000**) перед началом шагов.
- Порт по умолчанию — **8000**, но если вы его изменили, убедитесь, что доступ есть или что порт **8000** временно открыт на сервере.

---

### Быстрые ссылки:

- [Создание сертификата Cloudflare Origin](#_1-создание-сертификата-cloudflare-origin)
- [Добавление сертификата Origin на сервер](#_2-добавление-сертификата-origin-на-сервер)
- [Настройка Coolify для использования сертификата Origin](#_3-настройка-coolify-для-использования-сертификата-origin)
- [Настройка режима шифрования в Cloudflare](#_4-настройка-режима-шифрования-в-cloudflare)
- [Настройка туннеля для использования HTTPS](#_5-настройка-туннеля-для-использования-https)
- [Принудительное использование HTTPS в Cloudflare](#_6-принудительное-использование-https-в-cloudflare)
- [Обновление URL с HTTP на HTTPS](#_7-обновление-url-с-http-на-https)

---

::: warning Пример данных
В этом руководстве используются следующие данные в качестве примера. Заменяйте их своими реальными данными:

- **IPv4 адрес исходного сервера:** 203.0.113.1
- **Доменное имя:** example.com
- **Имя пользователя:** shadowarcanist
:::

## 1. Создание сертификата Cloudflare Origin

Чтобы создать сертификат:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/full-tls/1.webp" />

1. В дашборде Cloudflare перейдите в **SSL/TLS**.
2. Выберите **Origin Server**.
3. Нажмите кнопку **Create Certificate**.

Вам предложат выбрать тип ключа, хостнеймы и срок действия.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/full-tls/2.webp" />

1. Выберите **RSA (2048)**.
2. Укажите хостнеймы (например, `example.com` и `*.example.com`).

::: warning ВНИМАНИЕ!
На бесплатном тарифе Cloudflare wildcard-сертификаты охватывают только один уровень поддоменов. Например, `coolify.example.com` — да, а `www.coolify.example.com` — нет.
:::

3. Установите срок действия **15 лет**.

Сертификат будет сгенерирован.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/full-tls/3.webp" />

1. Формат ключа: **PEM**.
2. Скопируйте **Certificate** и **Private Key**.

## 2. Добавление сертификата Origin на сервер

Подключитесь к серверу по SSH:

```sh
ssh shadowarcanist@203.0.113.1
```

Перейдите в директорию прокси Coolify:

```sh
$ cd /data/coolify/proxy
```

Выберите нужный раздел в зависимости от используемого прокси:

:::tabs

== Traefik
Создайте директорию `certs`:
```sh
$ mkdir certs
$ cd certs
$ touch example.cert example.key
```
Вставьте данные сертификата и ключа из дашборда Cloudflare в соответствующие файлы (можно через `nano`).

== Caddy
Создайте директорию `caddy/data/certs`:
```sh
$ mkdir -p caddy/data/certs
$ cd caddy/data/certs
$ touch example.cert example.key
```
Вставьте данные сертификата и ключа в файлы.

:::

Теперь сертификат на сервере.

## 3. Настройка Coolify для использования сертификата Origin

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/full-tls/14.webp" />

1. Перейдите в раздел **Server** > **Proxy**.
2. Откройте страницу **Dynamic Configuration**.
3. Нажмите **Add**.

Конфигурация для разных прокси:

:::tabs

== Traefik
1. Имя файла должно заканчиваться на `.yaml`.
2. Контент:
```yaml
tls:
  certificates:
    -
      certFile: /traefik/certs/example.cert
      keyFile: /traefik/certs/example.key
```

== Caddy
1. Имя файла должно заканчиваться на `.caddy`.
2. Контент:
```caddy
*.example.com, example.com {
    tls /data/certs/example.cert /data/certs/example.key
}
```
:::

После этого Coolify начнет использовать этот сертификат для указанных доменов.

## 4. Настройка режима шифрования в Cloudflare

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/full-tls/4.webp" />

1. В Cloudflare перейдите в **SSL/TLS** > **Overview**.
2. Нажмите **Configure**.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/full-tls/5.webp" />

Выберите режим **Full (Strict)**.

## 5. Настройка туннеля для использования HTTPS

Нужно изменить настройки хостнеймов в самом туннеле:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/full-tls/6.webp" />

1. Нажмите иконку с тремя точками у вашего туннеля.
2. Выберите **Edit**.

Отредактируйте записи:

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/full-tls/7.webp" />

1. Измените тип с **HTTP** на **HTTPS**.
2. Измените порт с **80** на **443**.

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/full-tls/8.webp" />

3. Нажмите **Additional Application Settings**.
4. Выберите **TLS**.
5. Укажите ваш основной домен в поле **Origin Server Name**.
6. Сохраните изменения (**Save Hostname**).

## 6. Принудительное использование HTTPS в Cloudflare

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/full-tls/9.webp" />

1. В Cloudflare перейдите в **SSL/TLS** > **Edge Certificates**.
2. Включите опцию **Always Use HTTPS**.

## 7. Обновление URL с HTTP на HTTPS

Теперь в самом Coolify измените протокол всех доменов с **HTTP** на **HTTPS** (в настройках приложений и самого инстанса Coolify).

<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/full-tls/10.webp" />
<ZoomableImage src="/docs/images/integrations/cloudflare/tunnels/full-tls/11.webp" />

**Поздравляем!** Теперь ваши ресурсы работают исключительно по HTTPS.
