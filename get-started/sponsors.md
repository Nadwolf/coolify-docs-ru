---
layout: page
title: Спонсоры Coolify
description: Познакомьтесь с компаниями и организациями, спонсирующими разработку Coolify, включая Hetzner, Logto, Tolgee и других технологических партнеров.
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'


const sponsors = [
  {
    avatar: '../images/sponsors/hetzner.webp',
    name: 'Hetzner',
    title: 'Серверные, облачные, хостинговые решения и дата-центры',
    links: [
      { icon: 'expedia', link: 'http://htznr.li/CoolifyXHetzner' }
    ]
  },
  {
    avatar: '../images/sponsors/logto.webp',
    name: 'Logto',
    title: 'Улучшенная инфраструктура идентификации для разработчиков',
    links: [
      { icon: 'expedia', link: 'https://logto.io/?ref=coolify' }
    ]
  },
  {
    avatar: '../images/sponsors/tolgee.webp',
    name: 'Tolgee',
    title: 'Платформа локализации с открытым исходным кодом',
    links: [
      { icon: 'expedia', link: 'https://tolgee.io/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/bc.webp',
    name: 'Best Consultant',
    title: 'Ваш надежный партнер в области технологического консалтинга',
    links: [
      { icon: 'expedia', link: 'https://bc.direct/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/quant.webp',
    name: 'QuantCDN',
    title: 'Сеть доставки контента корпоративного уровня',
    links: [
      { icon: 'expedia', link: 'https://www.quantcdn.io/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/arcjet.webp',
    name: 'Arcjet',
    title: 'Передовые решения для веб-безопасности и производительности',
    links: [
      { icon: 'expedia', link: 'https://arcjet.com/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/supaguide.webp',
    name: 'SupaGuide',
    title: 'Ваше исчерпывающее руководство по Supabase',
    links: [
      { icon: 'expedia', link: 'https://supa.guide/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/coderabbit.webp',
    name: 'CodeRabbit',
    title: 'Сократите время код-ревью и количество багов вдвое',
    links: [
      { icon: 'expedia', link: 'https://coderabbit.ai/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/convex.webp',
    name: 'Convex',
    title: 'Реактивная БД с открытым кодом для веб-разработчиков',
    links: [
      { icon: 'expedia', link: 'https://convex.link/coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/goldenvm.webp',
    name: 'GoldenVM',
    title: 'Премиальные решения для хостинга виртуальных машин',
    links: [
      { icon: 'expedia', link: 'https://billing.goldenvm.com/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/tigris.webp',
    name: 'Tigris',
    title: 'Современная платформа данных для разработчиков',
    links: [
      { icon: 'expedia', link: 'https://www.tigrisdata.com/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/cloudify.webp',
    name: 'Cloudify',
    title: 'Решения для облачного хостинга',
    links: [
      { icon: 'expedia', link: 'https://cloudify.ro/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/trieve.webp',
    name: 'Trieve',
    title: 'Поиск и аналитика на базе ИИ',
    links: [
      { icon: 'expedia', link: 'https://trieve.ai/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/blacksmith.webp',
    name: 'Blacksmith',
    title: 'Платформа автоматизации инфраструктуры',
    links: [
      { icon: 'expedia', link: 'https://blacksmith.sh/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/comit.webp',
    name: 'Comit International',
    title: 'Подрядчик, удостоенный премии New York Times!',
    links: [
      { icon: 'expedia', link: 'https://comit.international/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/branddev.webp',
    name: 'Brand.dev',
    title: 'Brand API №1 для B2B стартапов',
    links: [
      { icon: 'expedia', link: 'https://brand.dev/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/syntax.webp',
    name: 'Syntax.fm',
    title: 'Подкаст для веб-разработчиков',
    links: [
      { icon: 'expedia', link: 'https://syntax.fm?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/jobscollider.webp',
    name: 'Jobs Collider',
    title: 'Более 30 000 удаленных вакансий для разработчиков',
    links: [
      { icon: 'expedia', link: 'https://jobscollider.com/remote-jobs?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/hostinger.webp',
    name: 'Hostinger',
    title: 'Веб-хостинг и VPS-решения',
    links: [
      { icon: 'expedia', link: 'https://www.hostinger.com/vps/coolify-hosting?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/glueops.webp',
    name: 'GlueOps',
    title: 'Автоматизация DevOps и управление инфраструктурой',
    links: [
      { icon: 'expedia', link: 'https://www.glueops.dev/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/ubicloud.webp',
    name: 'Ubicloud',
    title: 'Облачная платформа с открытым исходным кодом',
    links: [
      { icon: 'expedia', link: 'https://www.ubicloud.com/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/pfglabs.webp',
    name: 'Pfglabs',
    title: 'Создание реальных проектов на Golang',
    links: [
      { icon: 'expedia', link: 'https://pfglabs.com/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/juxtdigital.webp',
    name: 'JuxtDigital',
    title: 'Цифровая трансформация и веб-решения',
    links: [
      { icon: 'expedia', link: 'https://juxtdigital.com/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/saasykit.webp',
    name: 'SaasyKit',
    title: 'Полный SaaS стартер-кит для разработчиков',
    links: [
      { icon: 'expedia', link: 'https://saasykit.com/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/massivegrid.webp',
    name: 'MassiveGrid',
    title: 'Корпоративные решения для облачного хостинга',
    links: [
      { icon: 'expedia', link: 'https://massivegrid.com/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/americancloud.webp',
    name: 'American Cloud',
    title: 'Американская облачная инфраструктура',
    links: [
      { icon: 'expedia', link: 'https://americancloud.com/?utm_source=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/algora.webp',
    name: 'Algora',
    title: 'Платформа для контрибьюторов open source',
    links: [
      { icon: 'expedia', link: 'https://algora.io/?utm_source=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/liquidweb.webp',
    name: 'LiquidWeb',
    title: 'Премиальные решения для управляемого хостинга',
    links: [
      { icon: 'expedia', link: 'https://liquidweb.com/?utm_source=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/yaak.webp',
    name: 'Yaak',
    title: 'API-клиент для современных разработчиков',
    links: [
      { icon: 'expedia', link: 'https://yaak.app/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/comp.webp',
    name: 'Comp AI',
    title: 'Платформа с открытым кодом для автоматизации комплаенса',
    links: [
      { icon: 'expedia', link: 'https://www.trycomp.ai/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/darweb.webp',
    name: 'Darweb',
    title: 'Дизайн. Разработка. Доставка. 3D CPQ решения для электронной коммерции',
    links: [
      { icon: 'expedia', link: 'https://darweb.nl/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/wzit.webp',
    name: 'WZ-IT',
    title: 'Немецкое агентство облачных решений, миграции и управляемых сервисов',
    links: [
      { icon: 'expedia', link: 'https://wz-it.com/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/supadata.webp',
    name: 'Supadata',
    title: 'Парсинг YouTube, веба и файлов для получения чистых данных для ИИ',
    links: [
      { icon: 'expedia', link: 'https://supadata.ai/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/gozunga.webp',
    name: 'Gozunga',
    title: 'По-настоящему простая облачная инфраструктура',
    links: [
      { icon: 'expedia', link: 'https://gozunga.com/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/sponsors/macarne.webp',
    name: 'Macarne',
    title: 'Лучшие IP Transit и Carrier Ethernet решения для связи',
    links: [
      { icon: 'expedia', link: 'https://macarne.com/?ref=coolify.io' }
    ]
  },
  {
    avatar: '../images/team/coollabs-logo-smaller.webp',
    name: 'Ваша компания?',
    title: 'Станет ли ваша компания следующей?'
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Спонсоры Coolify
    </template>
    <template #lead>
      У нас есть замечательные спонсоры, которые поддерживают разработку Coolify.
    </template>
  </VPTeamPageTitle>
<VPTeamMembers size="small" :members="sponsors" />
</VPTeamPage>
