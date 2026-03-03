---
title: "Mage AI"
description: "Создавайте, запускайте и управляйте конвейерами данных (data pipelines) для интеграции и преобразования данных."
---

<ZoomableImage src="/docs/images/services/mage-ai.svg" alt="Дашборд Mage AI" />

## Что такое Mage AI?

Mage AI (Mage OSS) — это среда разработки для самостоятельного хостинга (self-hosted), предназначенная для того, чтобы помочь командам с уверенностью создавать конвейеры данных (data pipelines) промышленного уровня (production-grade).

Идеально подходит для автоматизации задач ETL (извлечение, преобразование, загрузка), архитектуры потоков данных (data flow) или оркестрации преобразований — и все это в быстром интерфейсе в стиле блокнота (notebook), основанном на модульном коде.

## Учетные данные по умолчанию

При новом (свежем) развертывании вы можете войти в систему с помощью следующих данных:

```
USERNAME: admin@admin.com
PASSWORD: admin
```

## Проблема со старыми процессорами (Older CPUs)

Mage AI требует наличия современных функций процессора (CPU features). На старых устройствах вы можете увидеть ошибку:

```
The following required CPU features were not detected:
  sse4.2, popcnt, avx, avx2, fma, bmi1, bmi2, lzcnt, pclmulqdq
```

Для получения более подробной информации обратитесь к [следующему issue](https://github.com/pola-rs/polars/issues/15404).

## Ссылки

- [Официальный сайт](https://mage.ai/?utm_source=coolify.io)
- [GitHub](https://github.com/mage-ai/mage-ai?utm_source=coolify.io)
