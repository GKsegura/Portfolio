<script setup lang="ts">
import IconEnvelope from '@components/icons/IconEnvelope.vue'
import IconWhatsapp from '@components/icons/IconWhatsapp.vue'
import {
  REVEAL_HIDDEN,
  REVEAL_TRANSITION,
  REVEAL_VISIBLE,
  useScrollAnimation,
} from '@composables/useScrollAnimation'

const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })

const phone = '5514988198485'
const message = 'Olá, José! Vi seu portfólio e gostaria de conversar!'
const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
</script>

<template>
  <section
    id="contato"
    ref="elementRef"
    class="w-full max-w-[1200px] p-8 text-left [scroll-margin-top:clamp(4rem,10vh,5rem)]"
    :class="[REVEAL_TRANSITION, isVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN]"
  >
    <h1 class="text-4xl font-bold text-text">
      Entre em contato
    </h1>
    <p class="text-lg text-text-muted max-w-[560px] mb-8">
      Se você tem uma ideia ou precisa de ajuda com um projeto, entre em contato comigo! Estou sempre aberto a novas
      oportunidades e desafios.
    </p>

    <div class="flex flex-wrap gap-4">
      <a
        href="mailto:jose.segura.ms@gmail.com"
        class="inline-flex items-center gap-2.5 rounded border border-transparent bg-primary px-6 py-3 text-base font-semibold text-text-inverted no-underline transition-all duration-normal ease-spring hover:-translate-y-[3px] hover:border-primary hover:bg-primary-hover hover:text-text-inverted active:translate-y-px active:duration-100 active:ease-in"
      >
        <IconEnvelope /> Enviar e-mail
      </a>
      <a
        :href="whatsappLink"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2.5 rounded border border-secondary/45 px-6 py-3 text-base font-semibold text-secondary no-underline transition-all duration-normal hover:border-secondary hover:bg-secondary/10"
      >
        <IconWhatsapp /> Falar no WhatsApp
      </a>
    </div>
  </section>
</template>
