import {createRoot} from 'react-dom/client'
import '@/assets/styles.css'
import App from "@/routes"

createRoot(document.getElementById('root')!)
.render(
  <App />
)
