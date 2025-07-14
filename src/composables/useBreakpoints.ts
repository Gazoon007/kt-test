import { onMounted, onUnmounted, ref } from 'vue'

export function useBreakpoints() {
  // Default to desktop for initial render
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(true)

  // Tailwind default breakpoints
  const breakpoints = {
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280,
    '2xl': 1536,
  }

  // Check if we're in browser environment
  const isBrowser = typeof window !== 'undefined'

  const updateBreakpoints = () => {
    if (!isBrowser)
      return

    const width = window.innerWidth
    isMobile.value = width < breakpoints.md
    isTablet.value = width >= breakpoints.md && width < breakpoints.lg
    isDesktop.value = width >= breakpoints.lg
  }

  if (isBrowser) {
    // Set initial values
    updateBreakpoints()

    // Setup event listeners
    onMounted(() => {
      window.addEventListener('resize', updateBreakpoints)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateBreakpoints)
    })
  }

  return {
    isMobile,
    isTablet,
    isDesktop,
    breakpoints,
  }
}
