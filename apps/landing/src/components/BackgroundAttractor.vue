<template>
  <div
    ref="host"
    class="pointer-events-none absolute left-0 right-0 -z-10 overflow-visible"
    :style="{ top: '-80vh', bottom: '-105vh' }"
    aria-hidden="true"
  >
    <canvas ref="canvas" class="block w-full h-full"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const props = defineProps<{
  anchor?: string
  particles?: number
  flow?: 'in' | 'out' | 'both'
  speed?: number
}>()

const host = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let raf = 0

let cx = 0, cy = 0
let W = 0, H = 0, DPR = Math.max(1, window.devicePixelRatio || 1)
const N = Math.max(100, Math.min(props.particles ?? 900, 2000))
const FLOW = props.flow ?? 'both'
const SPEED = props.speed ?? 1

type P = { r:number; t:number; vr:number; w:number; x:number; y:number; a:number; size:number; life:number; maxLife:number; dir:1|-1 }
let particles: P[] = []
let rMin = 40, rMax = 0

const isDark = () => document.documentElement.classList.contains('dark')

function locateCenter() {
  const sel = props.anchor ?? '#hero-anchor'
  const anchor = document.querySelector(sel) as HTMLElement | null
  const h = host.value
  if (!anchor || !h) return
  const ar = anchor.getBoundingClientRect()
  const hr = h.getBoundingClientRect()
  cx = ((ar.left + ar.right) / 2 - hr.left) * DPR
  cy = ((ar.top + ar.bottom) / 2 - hr.top) * DPR
}

function resize() {
  if (!canvas.value || !host.value) return
  DPR = Math.max(1, window.devicePixelRatio || 1)
  const cw = host.value.clientWidth
  const ch = host.value.clientHeight
  W = Math.floor(cw * DPR)
  H = Math.floor(ch * DPR)
  canvas.value.width = W
  canvas.value.height = H
  rMax = Math.hypot(W, H) * 0.55
  rMin = 40 * DPR
  locateCenter()
}

function dirForFlow(): 1 | -1 {
  if (FLOW === 'in') return -1
  if (FLOW === 'out') return 1
  return Math.random() < 0.5 ? -1 : 1
}

function spawn(p?: P) {
  const rr = rMin + Math.random() * (rMax - rMin)
  const tt = Math.random() * Math.PI * 2
  const d = dirForFlow()
  const baseVr = (0.15 + Math.random() * 0.25) * d * DPR * SPEED
  const baseW = (0.004 + Math.random() * 0.01) * SPEED
  const s = Math.max(0.6 * DPR, Math.random() * (2.2 * DPR))
  const life = Math.random() * 1500 + 900
  const a = 0.4 + Math.random() * 0.6
  const x = cx + rr * Math.cos(tt)
  const y = cy + rr * Math.sin(tt)
  if (p) { p.r=rr; p.t=tt; p.vr=baseVr; p.w=baseW; p.size=s; p.life=life; p.maxLife=life; p.a=a; p.dir=d; p.x=x; p.y=y; return p }
  return { r:rr, t:tt, vr:baseVr, w:baseW, x, y, a, size:s, life, maxLife:life, dir:d }
}

function initParticles() {
  particles = []
  for (let i = 0; i < N; i++) particles.push(spawn())
}

function frame() {
  if (!ctx) return
  raf = requestAnimationFrame(frame)
  ctx.clearRect(0, 0, W, H)

  const dark = isDark()
  const R = Math.max(W, H) * 0.9
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R)
  if (dark) { g.addColorStop(0, 'rgba(255,255,255,0.1)'); g.addColorStop(1, 'rgba(0,0,0,0.0)') }
  else      { g.addColorStop(0, 'rgba(255,255,255,0.5)'); g.addColorStop(1, 'rgba(255,255,255.0)') }
  g.addColorStop(1, 'transparent')
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)

  ctx.globalCompositeOperation = 'lighter'
  const color = dark ? '#ffffff' : '#000000'
  for (const p of particles) {
    const k = 1 / Math.sqrt(Math.max(p.r, 1))
    const jitterVr = (Math.random() - 0.5) * 0.06 * DPR * SPEED
    const jitterW  = (Math.random() - 0.5) * 0.0008 * SPEED
    p.vr = (p.vr * 0.98) + jitterVr
    p.w  = (p.w  * 0.995) + jitterW + 0.006 * k * SPEED
    p.t += p.w
    p.r += p.vr
    p.x = cx + p.r * Math.cos(p.t)
    p.y = cy + p.r * Math.sin(p.t)
    p.life -= 10

    const lifeT = p.life / p.maxLife
    let a = p.a * (lifeT >= 0.5 ? 1 - lifeT : lifeT)
    a *= Math.min(1, Math.max(0.2, (p.r - rMin) / (rMax - rMin)))
    a = Math.min(0.9, Math.max(0, a))

    ctx.globalAlpha = a
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fill()

    if (p.life <= 0 || p.r < rMin || p.r > rMax) spawn(p)
  }
  ctx.globalAlpha = 1
}

onMounted(() => {
  if (!canvas.value) return
  ctx = canvas.value.getContext('2d')
  resize()
  initParticles()
  frame()

  const onResize = () => resize()
  window.addEventListener('resize', onResize)

  const ro = new ResizeObserver(() => { locateCenter(); resize() })
  const anchor = document.querySelector(props.anchor ?? '#hero-anchor') as HTMLElement | null
  anchor && ro.observe(anchor)

  const mo = new MutationObserver(() => resize())
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  ;(host.value as any).__cleanup = () => { window.removeEventListener('resize', onResize); ro.disconnect(); mo.disconnect() }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  ;(host.value as any)?.__cleanup?.()
})
</script>
