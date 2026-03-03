---
title: Proxyscotch
description: "Запустите свой собственный CORS-прокси в Coolify. Работает как автономно (standalone), так и с Hoppscotch."
---

# Proxyscotch

<ZoomableImage src="/docs/images/services/proxyscotch.png" alt="Логотип Proxyscotch (hoppscotch)" />

## Что такое Proxyscotch

Крошечный open-source CORS-прокси (CORS proxy), созданный Hoppscotch.
> Отлично работает с Hoppscotch, но может использоваться и автономно.


## Инструкции по настройке
> Это необходимо только при настройке Proxyscotch для экземпляра (instance) Hoppscotch на самостоятельном хостинге (selfhosted).

Если вы защищаете свой прокси-сервер ***(рекомендуется и включено по умолчанию)***, вам потребуется установить некоторые переменные окружения (ENV vars) для вашего экземпляра Hoppscotch.

##### После того как вы настроите свой экземпляр Proxyscotch:

- Найдите токен, который сгенерировал для вас Coolify.
- В настройках вашего экземпляра Hoppscotch в Coolify перейдите в **Environment Variables** (Переменные окружения).
- Добавьте новую переменную под названием `VITE_PROXYSCOTCH_ACCESS_TOKEN` и установите для нее значение токена, который вы нашли ранее.
- Перезапустите экземпляр Hoppscotch.

- После перезапуска загрузите веб-интерфейс (webui) и перейдите в **Settings > Interceptors** (Настройки > Перехватчики). - Затем прокрутите вниз до **Proxy**.
- Введите URL-адрес вашего прокси-сервера (Proxy URL)
> Возможно, вам сначала придется включить (enable) Proxy с помощью переключателя на панели управления (dashboard), прежде чем вы сможете изменить URL.

Теперь ваш Hoppscotch должен быть настроен и работать с вашим собственным CORS-прокси!

## Ссылки

- [Официальная документация](https://github.com/hoppscotch/proxyscotch?utm_source=coolify.io)
