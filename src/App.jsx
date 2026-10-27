import { useState, useEffect } from 'react'
import { Hero } from './components/Hero'
import { NewsRenderer } from './components/NewsRenderer';
import './App.css'

function App() {
  const searchFilters = ["Home", "Mars", "Webb", "ISS", "Rockets", "Starlink"];  
  const [activeFilter, setActiveFilter] = useState("Mars")
  
  return (
  <main className='main-content'>
      <Hero searchFilters={searchFilters} setActiveFilter={setActiveFilter} activeFilter={activeFilter}/>
      <NewsRenderer activeFilter={activeFilter}/>
    </main>
  )
}



export default App
