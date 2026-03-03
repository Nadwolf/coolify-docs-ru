---
aside: false
outline: false
title: API
description: Подробный справочник по операциям API с параметрами запроса, схемами ответов, аутентификацией и интерактивными примерами кода на нескольких языках.
toc: false
---

<script setup lang="ts">
import { useData } from 'vitepress'
import { useTheme, generateCodeSample } from 'vitepress-openapi/client'

const { params } = useData()
const operation = params.value.operation

const themeConfig = {
    codeSamples: {
        langs: [
            'bruno',
            ...useTheme().getCodeSamplesLangs(),
        ],
        availableLanguages: [
            {
                lang: 'bruno',
                label: 'Bruno',
                highlighter: 'plaintext',
                icon: 'bruno',
            },
            ...useTheme().getCodeSamplesAvailableLanguages(),
        ],
        defaultLang: 'bruno',
        generator: async (lang, request) => {
            if (lang === 'bruno') {
                return generateBrunoRequest(request) || ''
            }
            return generateCodeSample(lang, request) || ''
        },
    }
}

function generateBrunoRequest(request) {
    if (!request) return ''
    const { method, url, headers, body } = request
    let brunoScript = `${method} ${url}\n`
    
    if (headers && Object.keys(headers).length) {
        brunoScript += '\nHeaders\n'
        for (const [key, value] of Object.entries(headers)) {
            brunoScript += `${key}: ${value}\n`
        }
    }

    if (body) {
        brunoScript += '\nBody\n'
        brunoScript += typeof body === 'string' ? body : JSON.stringify(body, null, 2)
    }

    return brunoScript
}

useTheme(themeConfig)
</script>

<OAOperation :operationId="operation" />
