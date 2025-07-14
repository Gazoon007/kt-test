import { useChangeCase } from '@vueuse/integrations/useChangeCase'

export function toCapitalCase(str: string) {
  return useChangeCase(str, 'capitalCase').value
}
