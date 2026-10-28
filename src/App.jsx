import { useState, useEffect } from 'react'
import { Hero } from './components/Hero'
import { NewsRenderer } from './components/NewsRenderer';
import './App.css'

export function getCookie(name) {
    const cookie = document.cookie
        .split("; ")
        .find(item => item.startsWith(name + "="));

    if (!cookie) return null;
    return decodeURIComponent(cookie.substring(name.length + 1));
}

export function setCookie(name, value, maxAge = 60 * 60 * 24 * 7) {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function App() {
  const searchFilters = ["General", "Mars", "Webb", "ISS", "Rockets", "Starlink"];
  
  const [activeFilter, setActiveFilter] = useState(() => {
    const savedFilter = getCookie("activeFilter");
    return searchFilters.includes(savedFilter) ? savedFilter : searchFilters[0];
  });
  
  useEffect(() => {
    setCookie("activeFilter", activeFilter);
  }, [activeFilter]);


  const [searchTerm, setSearchTerm] = useState(() => getCookie("searchTerm") ?? "");

  useEffect(() => {
    setCookie("searchTerm", searchTerm);
  }, [searchTerm]);
  
  const handleActiveFilterChange = filter => {
    if (filter !== activeFilter) setSearchTerm("")
    setActiveFilter(filter)
  }
  
  return (
  <main className={`main-content ${activeFilter.toLowerCase()}`}>
      <Hero
        searchFilters={searchFilters}
        setActiveFilter={handleActiveFilterChange}
        activeFilter={activeFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <NewsRenderer activeFilter={activeFilter} searchTerm={searchTerm}/>
    </main>
  )
}



export default App
