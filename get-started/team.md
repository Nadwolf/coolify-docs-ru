---
layout: page
title: Команда coolLabs
description: Познакомьтесь с международной командой, разрабатывающей Coolify, включая основателя Андраша Бачая, ведущих разработчиков, руководителей сообщества и тех, кто работает над документацией.
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'


const coreMembers = [
  {
    avatar: '../images/team/andras.webp',
    name: 'Andras Bacsai',
    title: 'Основатель, ведущий разработчик',
    links: [
      { icon: 'github', link: 'https://github.com/andrasbacsai' },
      { icon: 'expedia', link: 'https://heyandras.dev' },
      { icon: 'x', link: 'https://x.com/heyandras' },
      { icon: 'bluesky', link: 'https://bsky.app/profile/heyandras.dev' }
    ]
  },
  {
    avatar: '../images/team/peak.webp',
    name: 'Peaklabs Dev',
    title: 'Основной разработчик',
    links: [
      { icon: 'github', link: 'https://github.com/peaklabs-dev' },
      { icon: 'x', link: 'https://x.com/peaklabs_dev' },
      { icon: 'bluesky', link: 'https://bsky.app/profile/peaklabs.dev' },
      { icon: 'mastodon', link: 'https://fosstodon.org/@peaklabs_dev' }
    ]
  },
  {
    avatar: '../images/team/shadowarcanist.webp',
    name: 'ShadowArcanist',
    title: 'Лидер сообщества, мейнтейнер документации',
    links: [
      { icon: 'github', link: 'https://github.com/shadowarcanist' },
      { icon: 'expedia', link: 'https://shadowarcanist.com' },
      { icon: 'x', link: 'https://x.com/shadowarcanist' }
    ]
  },
  {
    avatar: '../images/team/aditya.webp',
    name: 'Aditya Tripathi',
    title: 'Разработчик, модератор сообщества',
    links: [
      { icon: 'github', link: 'https://github.com/adiologydev' },
      { icon: 'expedia', link: 'https://adiology.dev' },
      { icon: 'x', link: 'https://x.com/AdityaTripathiD' }
    ]
  },
  {
    avatar: '../images/team/oren.webp',
    name: 'Oren Aksakal',
    title: 'Разработчик',
    links: [
      { icon: 'github', link: 'https://github.com/orenaksakal' },
      { icon: 'x', link: 'https://x.com/orenaksakal' }
    ]
  },
  {
    avatar: '../images/team/coollabs.webp',
    name: 'Вы?',
    title: 'Станете ли вы следующим?'
  }
]

</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Команда coolLabs
    </template>
    <template #lead>
      Разработкой Coolify руководит международная команда, часть которой представлена ниже.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers size="small" :members="coreMembers" />
</VPTeamPage>
