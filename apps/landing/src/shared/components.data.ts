import { h, reactive } from 'vue'
import {
  // PREVIEWS compuestos o atómicos exportados por tu lib
  BuLoginCard, BuButton
} from '@bend-ui/vue'

export type Control =
  | { kind: 'select'; prop: string; label?: string; options: string[] }
  | { kind: 'boolean'; prop: string; label?: string }
  | { kind: 'text'; prop: string; label?: string; placeholder?: string }
  | { kind: 'number'; prop: string; label?: string; min?: number; max?: number; step?: number }

export type PropRow = { name: string; type: string; default?: string; description?: string; values?: string[] }

export type CatalogItem = {
  id: string
  name: string
  type: string
  description: string

  // Card preview (compacto)
  previewComponent: any

  // Página de detalle
  usage: string
  props?: PropRow[]

  source?: string

  // Playground dinámico (opcional)
  play?: {
    component: any
    initial: Record<string, any>
    controls: Control[]
    // plantillas de ejemplo para mostrar bajo el playground
    snippet?: (state: Record<string, any>) => string
  }
}

export const components: CatalogItem[] = [
  // 1) Login Card (componente compuesto de tu lib)
  {
    id: 'login-card',
    name: 'Login Card',
    type: 'Forms',
    description: 'Auth card with inputs, labels, actions and animated border. ',
    previewComponent: BuLoginCard,
    usage:
`<script setup lang="ts">
import {
  BuCard, BuCardHeader, BuCardTitle, BuCardDescription, BuCardContent, BuCardFooter,
  BuButton, BuInput, BuLabel, BuBorderBeam
} from '@bend-ui/vue'
</script>

<template>
  <BuCard class="relative w-[350px] overflow-hidden">
    <BuCardHeader>
      <BuCardTitle>Login</BuCardTitle>
      <BuCardDescription>Enter your credentials...</BuCardDescription>
    </BuCardHeader>

    <BuCardContent>
      <div class="grid gap-4">
        <div class="flex flex-col gap-1.5">
          <BuLabel for="email">Email</BuLabel>
          <BuInput id="email" type="email" placeholder="Enter your email" />
        </div>
        <div class="flex flex-col gap-1.5">
          <BuLabel for="password">Password</BuLabel>
          <BuInput id="password" type="password" placeholder="Enter your password" />
        </div>
      </div>
    </BuCardContent>

    <BuCardFooter class="flex justify-between">
      <BuButton variant="outline">Register</BuButton>
      <BuButton>Login</BuButton>
    </BuCardFooter>

    <BuBorderBeam :duration="8" :size="100" />
  </BuCard>
</template>`,
    source: `// fuente del componente si quieres mostrarla en Manual\n...`,
    props: [
      { name: 'duration', type: 'number', default: '8', description: 'Border beam rotation (s).' },
      { name: 'size', type: 'number', default: '100', description: 'Beam mask radius (px).' }
    ]
    // No playground (es un compuesto “cerrado”). Si quieres, puedes añadir play con BuBorderBeam.
  },

  // 2) Button (con playground editable)
  {
    id: 'button',
    name: 'Button',
    type: 'Buttons',
    description: 'Accessible button with default and outline variants.',
    previewComponent: {
      render() {
        return h('div', { class: 'flex gap-3' }, [
          h(BuButton, null, { default: () => 'Default' }),
          h(BuButton, { variant: 'outline' }, { default: () => 'Outline' })
        ])
      }
    },
    usage:
`<script setup lang="ts">
import { BuButton } from '@bend-ui/vue'
</script>

<template>
  <BuButton>Default</BuButton>
  <BuButton variant="outline">Outline</BuButton>
</template>`,
    source: `<script setup lang="ts">import { BuButton } from '@bend-ui/vue'</script>\n<template><BuButton>Default</BuButton></template>`,
    props: [
      { name: 'variant', type: `'default' | 'outline'`, default: `'default'`, description: 'Visual style.', values: ['default','outline'] }
    ],
    play: {
      component: BuButton,
      initial: reactive({ variant: 'default', label: 'Click me' }),
      controls: [
        { kind: 'select', prop: 'variant', label: 'Variant', options: ['default', 'outline'] },
        { kind: 'text', prop: 'label', label: 'Label', placeholder: 'Button text' }
      ],
      snippet: (s) =>
`<script setup lang="ts">
import { BuButton } from '@bend-ui/vue'
</script>

<template>
  <BuButton${s.variant && s.variant !== 'default' ? ` variant="${s.variant}"` : ''}>${s.label || 'Click me'}</BuButton>
</template>`
    }
  }

  
]
