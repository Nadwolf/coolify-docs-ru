---
title: "Собственные SSL-сертификаты"
description: "Используйте собственные SSL-сертификаты с прокси Traefik в Coolify: настройка самоподписанных сертификатов, Let's Encrypt и сертификатов от публичных удостоверяющих центров (CA)."
---

# Собственные SSL-сертификаты
Если вы хотите использовать собственные SSL-сертификаты в Traefik, выполните следующие шаги.

Для каждого сервера директория `/data/coolify/proxy` монтируется внутрь контейнера Coolify Proxy (Traefik).

Вы можете добавить свои сертификаты в директорию `/data/coolify/proxy/certs`.

1. **Создайте или запросите SSL-сертификат** для вашего домена. Это может быть самоподписанный сертификат, сертификат от публичного CA или от Let's Encrypt.

    Подробнее о certbot и Let's Encrypt можно прочитать [здесь](https://certbot.eff.org/instructions).

2. **Скопируйте файлы ключа и сертификата на сервер**, где запущен ресурс. Используйте `scp` или любой другой удобный способ.

    Файлы должны быть размещены в директории `/data/coolify/proxy`, например:
    
    ```bash
    scp /path/to/your/domain.cert root@your-server-ip:/data/coolify/proxy/certs/domain.cert
    scp /path/to/your/domain.key root@your-server-ip:/data/coolify/proxy/certs/domain.key
    ```

    ::: tip Совет
    Убедитесь, что директория `/data/coolify/proxy/certs` существует на сервере.
    :::

3. **Настройте Traefik** на использование этих сертификатов, добавив файл динамической конфигурации через интерфейс Coolify или создав его напрямую в `/data/coolify/proxy/dynamic`:

    ```yaml
    tls:
      certificates:
        - certFile: /traefik/certs/domain.cert
          keyFile: /traefik/certs/domain.key
        - certFile: /traefik/certs/domain2.cert
          keyFile: /traefik/certs/domain2.key
    ```

    ::: tip Совет
      `/traefik` — это директория внутри контейнера `coolify-proxy`, куда примонтирована папка `/data/coolify/proxy` с хоста.
    ::: 

    Traefik автоматически использует сертификат, если он соответствует домену входящего запроса.

Для получения дополнительной информации обратитесь к [официальной документации Traefik](https://doc.traefik.io/traefik/https/tls/).
