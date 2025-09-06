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
  import { Alanna } from './pages/Researchers/Personal_pages/Alanna'
  import { Alexandre } from './pages/Researchers/Personal_pages/Alexandre'
  import { Alexsandro } from './pages/Researchers/Personal_pages/Alexsandro'
  import { Alice } from './pages/Researchers/Personal_pages/Alice'
  import { Amin } from './pages/Researchers/Personal_pages/Amin'
  import { Angela } from './pages/Researchers/Personal_pages/Angela'
  import { AnaV } from './pages/Researchers/Personal_pages/AnaV'
  import { Aroldo } from './pages/Researchers/Personal_pages/Aroldo'
  import { Arthur } from './pages/Researchers/Personal_pages/Arthur'
  import { Camila } from './pages/Researchers/Personal_pages/Camila'
  import { Carlson } from './pages/Researchers/Personal_pages/Carlson'
  import { Edson } from './pages/Researchers/Personal_pages/Edson'
  import { Eduardo } from './pages/Researchers/Personal_pages/Eduardo'
  import { Haroldo } from './pages/Researchers/Personal_pages/Haroldo'
  import { Joelson } from './pages/Researchers/Personal_pages/Joelson'
  import { Johildo } from './pages/Researchers/Personal_pages/Johildo'
  import { Landim}  from './pages/Researchers/Personal_pages/Landim'
  import { LFelipe } from './pages/Researchers/Personal_pages/LFelipe'
  import { LCesar } from './pages/Researchers/Personal_pages/LCesar'
  import { LRogerio } from './pages/Researchers/Personal_pages/LRogerio'
  import { Marcos } from './pages/Researchers/Personal_pages/Marcos'
  import { MZucchi } from './pages/Researchers/Personal_pages/MZucchi'
  import { Porsani } from './pages/Researchers/Personal_pages/Porsani'
  import { RicardoM } from './pages/Researchers/Personal_pages/RicardoM'
  import { Reynam } from './pages/Researchers/Personal_pages/Reynam'
  import { Ruy } from './pages/Researchers/Personal_pages/Ruy'
  import { Simone } from './pages/Researchers/Personal_pages/Simone'
  import { Susana } from './pages/Researchers/Personal_pages/Susana'
  import { Suzan } from './pages/Researchers/Personal_pages/Suzan'
  import { Wilson } from './pages/Researchers/Personal_pages/Wilson'
  import { Jailma } from './pages/Researchers/Personal_pages/Jailma'

import { Coordination } from './pages/Coordination'
import { Technicians } from './pages/Technicians'
import { Recipes } from './pages/Recipes'
import { Calendars } from './pages/Recipes/Calendars'
import { Sign } from './pages/Sign'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Production } from './pages/Production'
import { Spaces } from './pages/Spaces'
import { Labs } from './pages/Labs'
import { Laiga } from './pages/Labs/Laiga'
import { RF } from './pages/Labs/Laiga/ReservationForm'
import { Lagep } from './pages/Labs/Lagep'
import { Lamod } from './pages/Labs/Lamod'
import { Auditory } from './pages/Spaces/Auditory'
import { MeetingRoom } from './pages/Spaces/MeetingRoom'
import { RA } from './pages/Reservations/ReservationAuditory'
import { MR } from './pages/Reservations/ReservationMeetingRoom'
import { Success } from './pages/Reservations/Success'
import { Successlab } from './pages/Labs/Successlab'


import { Regulations } from './pages/Regulations'
import { Photos } from './pages/Photos'
import { Years } from './pages/Photos/Years' 
import { HP } from './pages/HistoricalPhotos'
import {ICG } from './pages/HistoricalPhotos/ICG'
import {Latin } from './pages/HistoricalPhotos/LatinAmerican'
import { Yeda } from './pages/HistoricalPhotos/Yeda'
import {BlockE } from './pages/HistoricalPhotos/BlockE'
import { FirstMeeting } from './pages/Photos/FirstMeeting'

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
        <Route path='/researchers/personal/Alanna' element={<Alanna />} />
        <Route path='/researchers/personal/Alexandre' element={<Alexandre />} />
        <Route path='/researchers/personal/Alexsandro' element={<Alexsandro />} />
        <Route path='/researchers/personal/Alice' element={<Alice />} />
        <Route path='/researchers/personal/Amin' element={<Amin />} />
        <Route path='/researchers/personal/Angela' element={<Angela />} />
        <Route path='/researchers/personal/AnaV' element={<AnaV />} />
        <Route path='/researchers/personal/Aroldo' element={<Aroldo />} />
        <Route path='/researchers/personal/Arthur' element={<Arthur />} />
        <Route path='/researchers/personal/Camila' element={<Camila />} />
        <Route path='/researchers/personal/Carlson' element={<Carlson />} />
        <Route path='/researchers/personal/Edson' element={<Edson />} />
        <Route path='/researchers/personal/Eduardo' element={<Eduardo />} />
        <Route path='/researchers/personal/Haroldo' element={<Haroldo />} />
        <Route path='/researchers/personal/Jailma' element={<Jailma />} />
        <Route path='/researchers/personal/Joelson' element={<Joelson />} />
        <Route path='/researchers/personal/Johildo' element={<Johildo />} />
        <Route path='/researchers/personal/Landim' element={<Landim />} />
        <Route path='/researchers/personal/LFelipe' element={<LFelipe />} />
        <Route path='/researchers/personal/LCesar' element={<LCesar />} />
        <Route path='/researchers/personal/LRogerio' element={<LRogerio />} />
        <Route path='/researchers/personal/Marcos' element={<Marcos />} />
        <Route path='/researchers/personal/MZucchi' element={<MZucchi />} />
        <Route path='/researchers/personal/Porsani' element={<Porsani />} />
        <Route path='/researchers/personal/RicardoM' element={<RicardoM />} />
        <Route path='/researchers/personal/Reynam' element={<Reynam />} />
        <Route path='/researchers/personal/Ruy' element={<Ruy />} />
        <Route path='/researchers/personal/Simone' element={<Simone />} />
        <Route path='/researchers/personal/Susana' element={<Susana />} />
        <Route path='/researchers/personal/Suzan' element={<Suzan />} />
        <Route path='/researchers/personal/Wilson' element={<Wilson />} />

        <Route path='/coordination' element={<Coordination />} />
        <Route path='/technicians' element={<Technicians />} />
        <Route path='/recipes' element={<Recipes />} />
        <Route path='/recipes/Calendars' element={<Calendars />} />
        <Route path='/sign' element={<Sign />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/institution' element={<Institution />} />
        <Route path='/cpgg' element={<CPGG />} />
        <Route path='/history' element={<History />} />
        <Route path='/history/Former' element={<Former />} />
        <Route path='/production' element={<Production />} />
         <Route path='/Spaces' element={<Spaces />} />
         <Route path='/Labs' element={<Labs />} />
         <Route path='/Labs/Laiga' element={<Laiga />} />
         <Route path='/Labs/Laiga/ReservationForm' element={<RF />} />
         <Route path='/Labs/Lagep' element={<Lagep />} />
         <Route path='/Labs/Lamod' element={<Lamod />} />
         <Route path='/Labs/Successlab' element={<Successlab />} />
         <Route path='/Spaces/Auditory' element={<Auditory />} />
         <Route path='/Spaces/MeetingRoom' element={<MeetingRoom />} />
         <Route path='/Reservations/ReservationAuditory' element={<RA />} />
         <Route path='/Reservations/ReservationMeetingRoom' element={<MR />} />
         <Route path='/Reservations/Success' element={<Success />} />
        <Route path='/Regulations' element={<Regulations />} />  
        <Route path='/Photos' element={<Photos />} />  
        <Route path='/Photos/HistoricalPhotos' element={<HP />} />  
        <Route path='/Photos/HistoricalPhotos/Yeda' element={<Yeda />} />  
        <Route path='/Photos/HistoricalPhotos/BlockE' element={<BlockE />} />  
        <Route path='/Photos/HistoricalPhotos/ICG' element={<ICG />} />  
        <Route path='/Photos/HistoricalPhotos/LatinAmerican' element={<Latin />} />  
         <Route path='/Photos/Years' element={<Years />} /> 
         <Route path='/Photos/FirstMeeting' element={<FirstMeeting />} /> 

      </Route>
    </Routes>
  )
}
