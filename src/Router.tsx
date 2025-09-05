import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Contact } from './pages/Contact'
import { News1 } from './pages/News/News1'
import { News2 } from './pages/News/News2'
import { News3 } from './pages/News/News3'
import { CPGG } from './pages/CPGG'
import { History } from './pages/History'
import { Former } from './pages/History/FormerHeaders'
import { Institution } from './pages/Institution'
import { Researchers } from './pages/Researchers'
import { Coordination } from './pages/Coordination'
import { UploadPage } from './pages/Upload'

// Páginas que serão implementadas gradualmente
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold mb-6">{title}</h1>
    <p className="text-lg">Esta página será implementada em breve.</p>
  </div>
)

export function Router() {
  return (
    <Routes>
      <Route path='/'>
        <Route path='/' element={<Home />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/News/News1' element={<News1 />} />
        <Route path='/News/News2' element={<News2 />} />
        <Route path='/News/News3' element={<News3 />} />

        <Route path='/researchers' element={<Researchers />} />
        <Route path='/upload' element={<UploadPage />} />
        
        {/* Páginas de pesquisadores - placeholder por enquanto */}
        <Route path='/researchers/personal/Alanna' element={<PlaceholderPage title="Alanna" />} />
        <Route path='/researchers/personal/Alexandre' element={<PlaceholderPage title="Alexandre" />} />
        <Route path='/researchers/personal/Alexsandro' element={<PlaceholderPage title="Alexsandro" />} />
        <Route path='/researchers/personal/Alice' element={<PlaceholderPage title="Alice" />} />
        <Route path='/researchers/personal/Amin' element={<PlaceholderPage title="Amin" />} />
        <Route path='/researchers/personal/Angela' element={<PlaceholderPage title="Angela" />} />
        <Route path='/researchers/personal/AnaV' element={<PlaceholderPage title="Ana V" />} />
        <Route path='/researchers/personal/Aroldo' element={<PlaceholderPage title="Aroldo" />} />
        <Route path='/researchers/personal/Arthur' element={<PlaceholderPage title="Arthur" />} />
        <Route path='/researchers/personal/Camila' element={<PlaceholderPage title="Camila" />} />
        <Route path='/researchers/personal/Carlson' element={<PlaceholderPage title="Carlson" />} />
        <Route path='/researchers/personal/Edson' element={<PlaceholderPage title="Edson" />} />
        <Route path='/researchers/personal/Eduardo' element={<PlaceholderPage title="Eduardo" />} />
        <Route path='/researchers/personal/Haroldo' element={<PlaceholderPage title="Haroldo" />} />
        <Route path='/researchers/personal/Jailma' element={<PlaceholderPage title="Jailma" />} />
        <Route path='/researchers/personal/Joelson' element={<PlaceholderPage title="Joelson" />} />
        <Route path='/researchers/personal/Johildo' element={<PlaceholderPage title="Johildo" />} />
        <Route path='/researchers/personal/Landim' element={<PlaceholderPage title="Landim" />} />
        <Route path='/researchers/personal/LFelipe' element={<PlaceholderPage title="Luis Felipe" />} />
        <Route path='/researchers/personal/LCesar' element={<PlaceholderPage title="Luis Cesar" />} />
        <Route path='/researchers/personal/LRogerio' element={<PlaceholderPage title="Luis Rogerio" />} />
        <Route path='/researchers/personal/Marcos' element={<PlaceholderPage title="Marcos" />} />
        <Route path='/researchers/personal/MZucchi' element={<PlaceholderPage title="M. Zucchi" />} />
        <Route path='/researchers/personal/Porsani' element={<PlaceholderPage title="Porsani" />} />
        <Route path='/researchers/personal/RicardoM' element={<PlaceholderPage title="Ricardo M" />} />
        <Route path='/researchers/personal/Reynam' element={<PlaceholderPage title="Reynam" />} />
        <Route path='/researchers/personal/Ruy' element={<PlaceholderPage title="Ruy" />} />
        <Route path='/researchers/personal/Simone' element={<PlaceholderPage title="Simone" />} />
        <Route path='/researchers/personal/Susana' element={<PlaceholderPage title="Susana" />} />
        <Route path='/researchers/personal/Suzan' element={<PlaceholderPage title="Suzan" />} />
        <Route path='/researchers/personal/Wilson' element={<PlaceholderPage title="Wilson" />} />

        {/* Outras páginas principais */}
        <Route path='/coordination' element={<Coordination />} />
        <Route path='/technicians' element={<PlaceholderPage title="Técnicos" />} />
        <Route path='/recipes' element={<PlaceholderPage title="Receitas" />} />
        <Route path='/recipes/Calendars' element={<PlaceholderPage title="Calendários" />} />
        <Route path='/sign' element={<PlaceholderPage title="Assinar" />} />
        <Route path='/login' element={<PlaceholderPage title="Login" />} />
        <Route path='/register' element={<PlaceholderPage title="Registrar" />} />
        <Route path='/institution' element={<Institution />} />
        <Route path='/cpgg' element={<CPGG />} />
        <Route path='/history' element={<History />} />
        <Route path='/history/Former' element={<Former />} />
        <Route path='/production' element={<PlaceholderPage title="Produção" />} />
        <Route path='/spaces' element={<PlaceholderPage title="Espaços" />} />
        <Route path='/labs' element={<PlaceholderPage title="Laboratórios" />} />
        <Route path='/labs/Laiga' element={<PlaceholderPage title="LAIGA" />} />
        <Route path='/labs/Laiga/ReservationForm' element={<PlaceholderPage title="Formulário de Reserva" />} />
        <Route path='/labs/Lagep' element={<PlaceholderPage title="LAGEP" />} />
        <Route path='/labs/Lamod' element={<PlaceholderPage title="LAMOD" />} />
        <Route path='/labs/Successlab' element={<PlaceholderPage title="Success Lab" />} />
        <Route path='/spaces/Auditory' element={<PlaceholderPage title="Auditório" />} />
        <Route path='/spaces/MeetingRoom' element={<PlaceholderPage title="Sala de Reunião" />} />
        <Route path='/Reservations/ReservationAuditory' element={<PlaceholderPage title="Reservar Auditório" />} />
        <Route path='/Reservations/ReservationMeetingRoom' element={<PlaceholderPage title="Reservar Sala de Reunião" />} />
        <Route path='/Reservations/Success' element={<PlaceholderPage title="Reserva Confirmada" />} />
        <Route path='/regulations' element={<PlaceholderPage title="Regulamentos" />} />  
        <Route path='/photos' element={<PlaceholderPage title="Fotos" />} />  
        <Route path='/photos/HistoricalPhotos' element={<PlaceholderPage title="Fotos Históricas" />} />  
        <Route path='/photos/HistoricalPhotos/Yeda' element={<PlaceholderPage title="Yeda" />} />  
        <Route path='/photos/HistoricalPhotos/BlockE' element={<PlaceholderPage title="Bloco E" />} />  
        <Route path='/photos/HistoricalPhotos/ICG' element={<PlaceholderPage title="ICG" />} />  
        <Route path='/photos/HistoricalPhotos/LatinAmerican' element={<PlaceholderPage title="Latin American" />} />  
        <Route path='/photos/Years' element={<PlaceholderPage title="Anos" />} /> 
        <Route path='/photos/FirstMeeting' element={<PlaceholderPage title="Primeira Reunião" />} />

      </Route>
    </Routes>
  )
}