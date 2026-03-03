---
title: "Защита от DDoS через Cloudflare"
description: "Узнайте, как настроить защиту от DDoS атак для приложений, развернутых с помощью Coolify, используя Cloudflare."
---

# Защита от DDoS через Cloudflare

Cloudflare предоставляет мощный уровень защиты от DDoS атак для вашего сервера и приложений.

При использовании проксирования (Proxy), CDN и функций безопасности Cloudflare, весь входящий трафик к вашим приложениям в Coolify проходит через глобальную сеть Cloudflare, что защищает их от вредоносных атак.

---

### Зачем использовать Cloudflare для защиты от DDoS в Coolify?

1. Блокирует вредоносный трафик до того, как он достигнет вашего сервера, снижая риски и нагрузку на систему.
2. Нет необходимости масштабировать ресурсы сервера во время DDoS-атак — Cloudflare берет удар на себя.
3. Минимальная конфигурация для включения надежной защиты от потенциально дорогостоящих атак.
4. Скрывает реальный IP-адрес вашего сервера, сопоставляя ваш домен с IP-адресами Cloudflare.

---

### Когда НЕ стоит использовать Cloudflare для защиты от DDoS

1. Вы предпочитаете не пропускать весь трафик через сеть Cloudflare.
2. Вопросы конфиденциальности: Cloudflare терминирует TLS, что означает, что они могут проверять входящие запросы.
3. Простои Cloudflare (хотя они крайне редки) могут повлиять на ваш сервис, если вы полностью полагаетесь на их защиту.
4. Вам нужен полный контроль над SSL/TLS сертификатами, выданными глобальными центрами сертификации.
5. Вам нужна бесплатная поддержка wildcard для глубоких поддоменов (более 1 уровня поддоменов, например `*.sub.domain.com`, что Cloudflare не предлагает бесплатно).

---

::: info Пример данных
В этом руководстве используются следующие данные в качестве примера. Заменяйте их своими реальными данными:

- **IPv4 адрес исходного сервера:** 203.0.113.1
- **Доменное имя:** example.com
- **Имя пользователя:** shadowarcanist
:::


## 1. Создание сертификата Origin (Origin Certificate)
Связь между вашим сервером и Cloudflare шифруется с помощью специального сертификата Cloudflare Origin (необходим при использовании проксирования Cloudflare).

<ZoomableImage src="/docs/images/integrations/cloudflare/ddos-protection/origin-cert-illustration.webp" />


Для создания сертификата Cloudflare Origin выполните следующие шаги:

<ZoomableImage src="/docs/images/integrations/cloudflare/ddos-protection/1.webp" />

1. В дашборде Cloudflare перейдите в раздел **SSL/TLS**.
2. Выберите **Origin Server**.
3. Нажмите кнопку **Create Certificate**.

Вам будет предложено выбрать тип приватного ключа, имена хостов и срок действия сертификата.

<ZoomableImage src="/docs/images/integrations/cloudflare/ddos-protection/2.webp" />

1. Выберите **RSA (2048)** в качестве типа ключа.
2. Добавьте имена хостов (hostnames), которые должен охватывать сертификат.

::: warning ВНИМАНИЕ!
  - **`example.com`** охватит только основной домен.
  - **`*.example.com`** охватит все поддомены первого уровня.
  
  На бесплатном тарифе Cloudflare wildcard-сертификаты охватывают только один уровень поддоменов.
  
  Например, это сработает для **`coolify.example.com`**, но не для **`www.coolify.example.com`**.
  
  Чтобы охватить несколько уровней, вам потребуется приобрести [Advanced Certificate Manager ↗](https://www.cloudflare.com/application-services/products/advanced-certificate-manager/).
:::

3. Установите срок действия сертификата на **15 лет**.

Сертификат будет сгенерирован.

<ZoomableImage src="/docs/images/integrations/cloudflare/ddos-protection/3.webp" />

1. Выберите **PEM** в качестве формата ключа.
2. Скопируйте ваш **Certificate**.
3. Скопируйте ваш **Private Key**.

Далее вы добавите их на свой сервер с Coolify и настроите прокси.


## 2. Добавление сертификата на сервер
Подключитесь к серверу по SSH (или используйте терминал в Coolify). В примере я использую SSH:
```sh
ssh shadowarcanist@203.0.113.1
```

Перейдите в директорию прокси Coolify:
```sh
$ cd /data/coolify/proxy
```

Процесс добавления сертификатов немного отличается для Caddy и Traefik, выберите нужный раздел ниже:

:::tabs

== Traefik
Создайте директорию `certs`:
```sh
$ mkdir certs
```

Проверьте создание:
```sh
$ ls
> acme.json  certs docker-compose.yml  dynamic
```

Перейдите в директорию **certs**:
```sh
$ cd certs
```

Создайте два файла для сертификата и ключа:
```sh
$ touch example.cert example.key
```

Откройте файл **example.cert** и вставьте сертификат из дашборда Cloudflare:
```sh
$ nano example.cert 
```
Сохраните и выйдете.

Сделайте то же самое для файла **example.key**, вставив приватный ключ:
```sh
$ nano example.key 
```
Сохраните и выйдете.

== Caddy
Создайте директорию `caddy/data/certs`:
```sh
$ mkdir -p caddy/data/certs
```

Перейдите в директорию **certs**:
```sh
$ cd caddy/data/certs
```

Создайте два файла для сертификата и ключа:
```sh
$ touch example.cert example.key
```

Откройте файл **example.cert** и вставьте сертификат из дашборда Cloudflare:
```sh
$ nano example.cert 
```
Сохраните и выйдете.

Сделайте то же самое для файла **example.key**, вставив приватный ключ:
```sh
$ nano example.key 
```
Сохраните и выйдете.

:::

Теперь сертификат Origin установлен на вашем сервере.


## 3. Настройка DNS и шифрования TLS
Чтобы сертификат заработал, настройте DNS-записи и включите TLS в Cloudflare:

<ZoomableImage src="/docs/images/integrations/cloudflare/ddos-protection/4.webp" />

1. В Cloudflare перейдите в **DNS**.
2. Выберите **Records**.
3. Добавьте 2 записи типа **A**:
4. В поле Name введите **`example.com`** и `*`.
5. В качестве контента для обеих записей укажите **IP-адрес** вашего сервера.
6. Установите статус прокси в режим **Proxied** (оранжевое облако) для обеих записей.

::: info
Включение опции «Proxied» для записей `example.com` и `*` будет проксировать основной домен и все поддомены первого уровня через wildcard.

Это необязательно, если вам нужно защитить только конкретный поддомен. В таком случае включите проксирование только для нужной записи.
:::

Далее настройте шифрование TLS:

<ZoomableImage src="/docs/images/integrations/cloudflare/ddos-protection/5.webp" />

1. Перейдите в **SSL/TLS** в Cloudflare.
2. Выберите **Overview**.
3. Нажмите кнопку **Configure**.
4. Выберите режим шифрования **Full (Strict)**.

<ZoomableImage src="/docs/images/integrations/cloudflare/ddos-protection/6.webp" />

Наконец, включите перенаправление с HTTP на HTTPS:

<ZoomableImage src="/docs/images/integrations/cloudflare/ddos-protection/7.webp" />

1. В Cloudflare перейдите в **SSL/TLS**.
2. Выберите **Edge Certificates**.
3. Включите **Always Use HTTPS**.


## 4. Настройка прокси Coolify для использования сертификата Origin
<ZoomableImage src="/docs/images/integrations/cloudflare/ddos-protection/8.webp" />

1. Перейдите в раздел **Server** в боковом меню.
2. Выберите **Proxy**.
3. Откройте страницу **Dynamic Configuration**.
4. Нажмите кнопку **Add**.

Теперь вам нужно ввести динамическую конфигурацию. Она отличается для Caddy и Traefik:

:::tabs

== Traefik

<ZoomableImage src="/docs/images/integrations/cloudflare/ddos-protection/9.webp" />

1. Выберите имя для конфигурации (должно заканчиваться на `.yaml`).
2. Введите следующие данные:
```yaml
tls:
  certificates:
    -
      certFile: /traefik/certs/example.cert
      keyFile: /traefik/certs/example.key
```

3. Сохраните конфигурацию.
---
Если нужно добавить несколько сертификатов:
```yaml
tls:
  certificates:
    -
      certFile: /traefik/certs/example1.cert
      keyFile: /traefik/certs/example1.key
    -
      certFile: /traefik/certs/example2.cert
      keyFile: /traefik/certs/example2.key
```

== Caddy
<ZoomableImage src="/docs/images/integrations/cloudflare/ddos-protection/10.webp" />

1. Выберите имя для конфигурации (должно заканчиваться на `.caddy`).
2. Введите следующие данные:
```caddy
*.example.com, example.com {
    tls /data/certs/example.cert /data/certs/example.key
}
```

> Примечание: Wildcard `*.example.com` охватывает все поддомены. Уберите его, если защищаете только один домен (`example.com`).

3. Сохраните конфигурацию.

---

Для нескольких сертификатов:
```caddy
*.example1.com, example1.com {
    tls /data/certs/example1.cert /data/certs/example1.key
}

*.example2.com, example2.com {
    tls /data/certs/example2.cert /data/certs/example2.key
}
```
:::


С этого момента Coolify будет использовать сертификат Origin для запросов, соответствующих имени хоста.

Готово! Ваш сервер настроен на работу с Cloudflare Origin Certificate, и весь трафик проксируется через сеть Cloudflare, что предотвращает атаки до того, как они достигнут вашего сервера.

::: danger ВНИМАНИЕ!!
**Все шаги ниже — опциональны. Cloudflare уже защищает ваши приложения. Следуйте им, если хотите запретить атакующим напрямую обращаться к вашему серверу по IP-адресу через порты 80 и 443.**
:::


## 5. Настройка Firewall (разрешить только трафик Cloudflare)
Настройте брандмауэр так, чтобы входящий трафик на порт **443** разрешался только из [диапазонов IP-адресов Cloudflare ↗](https://www.cloudflare.com/en-gb/ips/).

Заблокируйте весь остальной входящий трафик, кроме вашего порта SSH.

Это не позволит злоумышленникам обойти Cloudflare и атаковать ваш сервер напрямую по его IP.

Этот шаг не обязателен, но крайне рекомендован.


## Credits (Авторы ресурсов)
Иллюстрация origin-cert-illustration создана с использованием иконок от [Flaticon ↗](https://www.flaticon.com/). 
Ссылки на иконки:
- [Medal icon ↗](https://www.flaticon.com/free-icon/medal_14468558) - [Vlad Szirka ↗](https://www.flaticon.com/authors/vlad-szirka)
- [Award icon ↗](https://www.flaticon.com/free-icon/award_15218157) - [explanaicon ↗](https://www.flaticon.com/authors/explanaicon)
- [Worldwide icon ↗](https://www.flaticon.com/free-icon/worldwide_870169) - [Freepik ↗](https://www.flaticon.com/authors/freepik)
- [Lock icon ↗](https://www.flaticon.com/free-icon/lock_2089784) - [Those Icons ↗](https://www.flaticon.com/authors/those-icons)
- [Browser icon ↗](https://www.flaticon.com/free-icon/browser_331190) - [Alfredo Hernandez ↗](https://www.flaticon.com/authors/alfredo-hernandez)
- [Database icon ↗](https://www.flaticon.com/free-icon/database_8028666) - [Tanah Basah ↗](https://www.flaticon.com/authors/tanah-basah)