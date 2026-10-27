import './FeaturedArticle.css'
import { useRef } from 'react'


export function FeaturedArticle({ item }) {
    const author = item.authors?.map(a => a.name).join(', ') || 'Unknown Author';

    return (
        <a className='featured-article' href={item.url} target='_blank' rel='noreferrer'>
            <img
                src={item.image_url}
                alt={item.title}
                className='fa-img'
                loading='lazy'
            />
            <div className='fa-data'>
                <div className='fa-data-header'>
                    <p className='fa-author'>{author}</p>
                    <p className='fa-date'>{new Date(item.published_at).toLocaleDateString('es-ES')}</p>
                </div>
                <h3 className='fa-title'>{item.title}</h3>
            </div>
        </a>
    )
}
