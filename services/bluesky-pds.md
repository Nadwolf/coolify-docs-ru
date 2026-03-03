---
title: "Bluesky PDS"
description: "Разверните персональный сервер данных (Personal Data Server) Bluesky с помощью Coolify"
---

# Bluesky PDS

<ZoomableImage src="/docs/images/services/bluesky.svg" alt="Логотип Bluesky" />

## Что такое Bluesky PDS?

Bluesky PDS (Personal Data Server) — это self-hosted сервер данных, на котором хранится ваша информация в сети AT Protocol. Он позволяет вам контролировать собственные данные и личность (identity) в социальных сетях, оставаясь при этом участником сети AT Protocol. PDS децентрализованно управляет учетными записями пользователей, постами, подписчиками и другими социальными данными.

## Настройка домена с HTTPS, если он еще не установлен

`pdsadmin` требует, чтобы в вашем Bluesky PDS был настроен HTTPS. Убедитесь, что вы задали домен с HTTPS в интерфейсе (UI) Coolify и проверьте переменные окружения, чтобы они соответствовали ему.

## Создание учетной записи на вашем PDS

Чтобы создать аккаунт и начать использовать ваш PDS, вы можете воспользоваться следующими командами `pdsadmin` на вкладке Terminal (Терминал) в интерфейсе Coolify:

```bash
pdsadmin create-invite-code
```

или

```bash
pdsadmin account create <email> <handle>
```

Чтобы посмотреть другие доступные команды в `pdsadmin`, просто выполните `pdsadmin`.

## Настройка почты (Mail)

Рассылка почты важна для Bluesky PDS: она нужна для подтверждения email и других вещей!

Вам нужно отредактировать 2 переменные окружения (environment variables) в интерфейсе Coolify. Перейдите на вкладку Environment Variables и найдите `PDS_EMAIL_FROM_ADDRESS`. То, что нужно указать здесь, вполне очевидно: это адрес электронной почты, который будет использоваться при отправке писем, например: `user@domain.com`

Следующая переменная окружения — `PDS_EMAIL_SMTP_URL`. Она не так очевидна, но вот как её заполнить:

Существует множество способов заполнить эту переменную, вот несколько примеров:

`smtps://user%40example.com:password@mail.example.com:465` (SMTP с SSL)

`smtp://user%40example.com:password@mail.example.com:587` (SMTP без SSL)

`smtps://resend:<ваш API-ключ Resend>@smtp.resend.com:465` (Resend)

Возможно, вам потребуется закодировать (URL-encode) ваше имя пользователя и пароль для того, чтобы настройка почты заработала (например `@` превращается в `%40`).

И это всё! Ваш PDS готов к использованию и будет работать как любой другой PDS!

## Ссылки

- [Официальный сайт](https://blueskyweb.xyz?utm_source=coolify.io)
- [GitHub](https://github.com/bluesky-social/pds?utm_source=coolify.io)
