import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: { entry: 'src/index.ts', name: 'BendUI', fileName: 'index', formats: ['es', 'cjs'] },
        rollupOptions: { external: ['vue'] }
    }
})
