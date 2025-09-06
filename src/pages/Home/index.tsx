import { Header } from '../../components/Header/'
import { Footer } from '../../components/Footer/'
import { Middle } from './components/Middle/'
import Container from './Home.module.css'

export function Home() {
  return (
    <div className={Container}>
      <Header />
      <Middle />
      <Footer />
    </div>
  )
}
