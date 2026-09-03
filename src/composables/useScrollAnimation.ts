import { onMounted, onUnmounted, ref, type Ref } from 'vue'

interface UseScrollAnimationReturn {
  elementRef: Ref<HTMLElement | null>
  isVisible: Ref<boolean>
}

/**
 * Observa quando o elemento entra na viewport e liga isVisible - a
 * classe CSS não é mais mutada direto no DOM (como no hook React
 * original), o template reage ao estado.
 */
export function useScrollAnimation(options: IntersectionObserverInit = {}): UseScrollAnimationReturn {
  const elementRef = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const element = elementRef.value
    if (!element) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer?.unobserve(element)
        }
      },
      { threshold: 0.1, ...options },
    )

    observer.observe(element)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { elementRef, isVisible }
}

// Classes Tailwind do padrão de reveal-on-scroll, compartilhadas por toda seção.
export const REVEAL_TRANSITION = 'transition-[opacity,transform] duration-[650ms] ease-reveal'
export const REVEAL_HIDDEN = 'opacity-0 translate-y-7'
export const REVEAL_VISIBLE = 'opacity-100 translate-y-0'
