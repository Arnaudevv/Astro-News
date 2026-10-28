import './Hero.css'
import './FilterBar.css'
import { useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useArticles } from '../UseArticles.jsx'
import { FeaturedArticle } from './FeaturedArticle.jsx'

const heroVideos = {
    General: "/home-hero.mp4",
    Mars: "/mars-hero.mp4",
    Webb: "/webb-hero.mp4",
    Rockets: "/rockets-hero.mp4",
    Starlink: "/starlink-hero.mp4"
}

export function Hero({ searchFilters, setActiveFilter, activeFilter, searchTerm, setSearchTerm }) {
    const { items, loading } = useArticles(null, 7);
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
                
                <FilterBar
                    searchFilters={searchFilters}
                    setActiveFilter={setActiveFilter}
                    activeFilter={activeFilter}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
                <div className='page-tittle-container'>
                    <h1 className='page-tittle-h1'>AstraNews</h1>
                    <p className='page-tittle-description'>Unveiling the universe through space dispatches and cutting-edge cosmic news.</p>
                </div>
                <FeaturedArticles items={items} loading={loading}/>
            </div>
        </section>
    )
}

function FilterBar({ searchFilters, setActiveFilter, activeFilter, searchTerm, setSearchTerm }) {
    const [searchOpen, setSearchOpen] = useState(false)
    const [visible, setVisible] = useState(true)
    
    // FIlterBar Scroll Effect -> Implemented with AI
    const previousScrollTop = useRef(0)
    useEffect(() => {
        const scrollContainer = document.querySelector('.main-content')
        if (!scrollContainer) return

        previousScrollTop.current = scrollContainer.scrollTop

        const handleScroll = () => {
            const currentScrollTop = scrollContainer.scrollTop

            if (currentScrollTop < previousScrollTop.current) setVisible(true)
            else if (currentScrollTop > previousScrollTop.current && currentScrollTop >= 200) setVisible(false)

            previousScrollTop.current = currentScrollTop
        }

        scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
        return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className={`filter-bar ${visible ? '' : 'hidden'}`}>
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
                <input
                    type="text"
                    className={`search-input ${searchOpen ? 'active' : ''}`}
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                    aria-label="Search articles"
                />
                <button
                    type="button"
                    className="search-toggle"
                    onClick={() => setSearchOpen(open => !open)}
                    aria-label={searchOpen ? 'Close Search' : 'Open Search'}
                    aria-expanded={searchOpen} >
                    <FaSearch className='search-icon' size={20}  />
                </button>
            </div>
        </div>
    )
}

function FeaturedArticles({ items, loading }) {
    return (
        <div className='featured-articles-container'>
            <h3 className='featured-articles-tittle'>Latest Articles</h3>
            <div className='featured-articles'>
                {(loading || items.length === 0) && Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className='fa-loading'></div>
                ))}
                {!loading && items.map((item, index)=> {
                    console.log("[Featured Item]:", item);
                    return <FeaturedArticle key={index} item={item} />;
                })}
            </div>
        </div>
    )
}