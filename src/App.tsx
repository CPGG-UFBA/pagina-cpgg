import './App.module.css'
import './global.css'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { LanguageProvider } from '@/contexts/LanguageContext'

export function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Router />
        <Toaster />
      </LanguageProvider>
    </BrowserRouter>
  )
}
