import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    host: "10.10.13.12", // your local IP (no leading space)
    port: 5175, // default Vite dev server port
  },
})
