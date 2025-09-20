import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// CSP to send from the Vite dev server (report-only)
const csp = [
  "default-src 'self'",
  "script-src 'self' https://apis.google.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self' https://localhost:5000",
  "frame-ancestors 'none'",
  "report-uri https://localhost:5000/csp-report"
].join('; ')

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('ssl/privatekey.pem'),
      cert: fs.readFileSync('ssl/certificate.pem'),
    },
    port: 5173, // change if you prefer 5174
    headers: {
      // report-only so you can see violations without breaking the app
      'Content-Security-Policy-Report-Only': csp
    }
  }
})
