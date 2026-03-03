---
title: "OpenClaw"
description: "Разверните ИИ-помощника по написанию кода (AI-powered coding assistant) OpenClaw в Coolify с поддержкой нескольких провайдеров, автоматизацией браузера и интеграцией с чатами."
---

# OpenClaw

<ZoomableImage src="/docs/images/services/openclaw-logo.svg" alt="OpenClaw" />

## Что такое OpenClaw?

OpenClaw [Github](https://github.com/openclaw/openclaw?utm_source=coolify.io) — это ИИ-помощник (AI-powered coding assistant) для написания кода. Он поддерживает более 20 ИИ-провайдеров, включает встроенную автоматизацию браузера и интегрируется с платформами чатов, такими как Telegram, Discord, Slack и WhatsApp.

::: warning Требуется HTTPS (HTTPS Required)
Для корректной работы OpenClaw требуется HTTPS. Убедитесь, что ваше развертывание настроено с включенным HTTPS.
:::

## Аутентификация (Authentication)

OpenClaw использует HTTP Basic Auth. Переменные окружения `AUTH_USERNAME` и `AUTH_PASSWORD` автоматически генерируются Coolify во время развертывания.

Также генерируется токен шлюза (gateway token) (`OPENCLAW_GATEWAY_TOKEN`) для доступа к API.

## ИИ-провайдеры (AI Providers)

Требуется как минимум один API-ключ ИИ-провайдера. Установите соответствующую переменную окружения для вашего провайдера:

- **Anthropic** — `ANTHROPIC_API_KEY`
- **OpenAI** — `OPENAI_API_KEY`
- **Google Gemini** — `GEMINI_API_KEY`
- **OpenRouter** — `OPENROUTER_API_KEY`
- **Groq** — `GROQ_API_KEY`
- **Mistral** — `MISTRAL_API_KEY`
- **xAI** — `XAI_API_KEY`
- **Cerebras** — `CEREBRAS_API_KEY`
- **Amazon Bedrock** — `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`
- **Ollama (локальный)** — `OLLAMA_BASE_URL`

Используйте `OPENCLAW_PRIMARY_MODEL`, чтобы задать модель по умолчанию.

::: tip Именование моделей для провайдеров-прокси (Proxy Providers)
При использовании провайдера-прокси, такого как **OpenRouter** или **OpenCode**, вы должны указывать имя модели с префиксом пути провайдера. Например:

- **OpenRouter**: `OPENCLAW_PRIMARY_MODEL=openrouter/google/gemini-2.5-flash`
- **OpenCode**: `OPENCLAW_PRIMARY_MODEL=opencode/google/gemini-2.5-flash`

Использование просто `google/gemini-2.5-flash` без префикса провайдера работать не будет. Всегда используйте полный путь `provider/model`.
:::

### Аутентификация на основе подписки (Subscription-Based Authentication)

Если у вас есть подписка **Anthropic** (Claude) или **OpenAI** (Codex), вы можете пройти аутентификацию, используя процессы входа через их CLI, вместо API-ключей. Откройте терминал в вашем контейнере OpenClaw и выполните:

**Anthropic (Claude):**

```bash
openclaw models auth login --provider anthropic
```

**OpenAI (Codex):**

```bash
openclaw models auth login --provider openai
```

В качестве альтернативы, используйте мастер настройки (onboarding wizard) для интерактивной настройки аутентификации:

```bash
openclaw onboard
```

Вы можете проверить статус своей аутентификации с помощью команды:

```bash
openclaw models status
```

Полный список поддерживаемых провайдеров и параметров конфигурации смотрите в [репозитории GitHub](https://github.com/coollabsio/openclaw?utm_source=coolify.io).

## Браузер (Browser)

Конечная точка (endpoint) `/browser` открывает удаленный браузер, управляемый OpenClaw через Chrome DevTools Protocol (CDP). Это полезно для процессов OAuth, 2FA, решения капчи и аутентифицированного веб-скрапинга (authenticated web scraping).

Сессии браузера сохраняются между перезапусками через выделенный том (volume). Вы можете настроить браузер с помощью этих переменных окружения:

- `BROWSER_DEFAULT_PROFILE` — Имя профиля браузера (по умолчанию: `openclaw`)
- `BROWSER_SNAPSHOT_MODE` — Режим создания снимков (по умолчанию: `efficient`)
- `BROWSER_EVALUATE_ENABLED` — Включить оценку (evaluation) JavaScript (по умолчанию: `true`)

## Ссылки

- [GitHub](https://github.com/coollabsio/openclaw?utm_source=coolify.io)
