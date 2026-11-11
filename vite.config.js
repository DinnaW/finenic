import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({base:process.env.GITHUB_ACTIONS ? '/finenic/' : '/',plugins:[vue(),tailwindcss()]})
