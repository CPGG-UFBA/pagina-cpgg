import './App.module.css'
import './global.css'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'

export function App() {
  return (
    <BrowserRouter>
      <Router />
      <Toaster />
    </BrowserRouter>
  )
}
