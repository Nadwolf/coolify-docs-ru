---
title: "Plausible Analytics"
description: "Разверните Plausible Analytics в Coolify: легковесная веб-аналитика без файлов cookie, соответствующая требованиям GDPR, с упором на конфиденциальный анализ посетителей (privacy-first visitor insights)."
---

<ZoomableImage src="/docs/images/services/plausible-logo.svg" alt="Дашборд Plausible" />

::: warning СЕРВИС СКРЫТ В COOLIFY
Этот сервис недоступен в виде развертывания в один клик (one-click deployment) в Coolify из-за юридических ограничений (товарный знак). Чтобы использовать его с Coolify, вам потребуется развернуть его вручную, следуя шагам установки ниже.
:::

## Что такое Plausible Analytics?

Plausible — это интуитивно понятное, легкое программное обеспечение для веб-аналитики с открытым исходным кодом. Оно не использует файлы cookie и полностью соответствует требованиям GDPR, CCPA и PECR.

## Как развернуть Plausible Analytics с помощью Coolify?

Из-за проблем с товарными знаками (trademark issues) мы не можем предоставить полностью автоматизированную установку сервиса Plausible Analytics в один клик. Но не волнуйтесь, установить его по-прежнему очень легко.

## Установка (Installation)

1. Добавьте новый ресурс (Add a New Resource) и выберите тип развертывания приложения `Docker Compose Empty`.
2. Скопируйте следующий [файл](https://raw.githubusercontent.com/coollabsio/coolify/v4.x/templates/compose/plausible.yaml) в поле ввода (вместе с комментариями).
3. Нажмите кнопку `Save` (Сохранить).
4. Перейдите на страницу настроек сервиса `Plausible` (кнопка `Settings` с правой стороны).
5. Добавьте ваш пользовательский домен в поле ввода `Domains` (вы также можете изменить домены, нажав на значок редактирования рядом с автоматически сгенерированным доменом).
6. Нажмите кнопку `Save` (Сохранить).
7. Нажмите кнопку `Deploy` (Развернуть) и дождитесь окончания развертывания.

## Ссылки

- [Официальный сайт](https://plausible.io/)
- [GitHub](https://github.com/plausible/analytics)
