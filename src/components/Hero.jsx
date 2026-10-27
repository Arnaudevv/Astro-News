import './Hero.css'
import './FilterBar.css'
import { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useArticles } from '../UseArticles.jsx'
import { FeaturedArticle } from './FeaturedArticle.jsx'

const heroVideos = {
    Home: "/home-hero.mp4",
    Mars: "/mars-hero.mp4",
    Webb: "/webb-hero.mp4",
    Rockets: "/rockets-hero.mp4",
    Starlink: "/starlink-hero.mp4"
}

export function Hero({ searchFilters, setActiveFilter, activeFilter}) {
    const { items } = useArticles(7);
    const videoSrc = heroVideos[activeFilter] ?? "/home-hero.mp4";

    return (
        <section className='hero'>
            <video 
                key={videoSrc}
                src={videoSrc} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="hero-banner-video" 
                aria-hidden="true"
            />
            
            <div className="hero-content">
                
                <FilterBar searchFilters={searchFilters} setActiveFilter={setActiveFilter} activeFilter={activeFilter}/>
                <div className='page-tittle-container'>
                    {/* <img src="/logo.png" className='page-tittle'></img> */}
                    <h1 className='page-tittle-h1'>AstraNews</h1>
                    <p className='page-tittle-description'>Unveiling the universe through space dispatches and cutting-edge cosmic news.</p>
                </div>
                <FeaturedArticles items={items} />
            </div>
        </section>
    )
}

function FilterBar({ searchFilters, setActiveFilter, activeFilter}) {
    const [searchOpen, setSearchOpen] = useState(false)
    return (
        <div className="filter-bar">
            <h1 className='filter-bar-title'>AstraNews</h1>
            <div className='filters'>
                {searchFilters.map((filter, index) => (
                    <button className={`filter-button ${filter === activeFilter ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter)} 
                    key={index}>
                    {filter}</button>
                ))}
            </div>
            <div className='searchbar'>
                <input type="text" className={`search-input ${searchOpen ? 'active' : ''}`}></input>
                <button
                    type="button"
                    className="search-toggle"
                    onClick={() => setSearchOpen(open => !open)}
                    aria-label={searchOpen ? 'Cerrar búsqueda' : 'Abrir búsqueda'}
                    aria-expanded={searchOpen} >
                    <FaSearch className='search-icon' size={20}  />
                </button>
            </div>
        </div>
    )
}

function FeaturedArticles({ items }) {
    return (
        <div className='featured-articles-container'>
            <h3 className='featured-articles-tittle'>Latest Articles</h3>
            <div className='featured-articles'>
                {items.map((item, index)=> {
                    console.log("[Featured Item]:", item);
                    return <FeaturedArticle key={index} item={item} />;
                })}
            </div>
        </div>
    )
}