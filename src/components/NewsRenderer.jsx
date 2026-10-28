import './NewsRenderer.css'
import { useArticles } from '../UseArticles.jsx'
import { ArticleCard } from './ArticleCard.jsx';

export function NewsRenderer({ activeFilter, searchTerm = '' }) {
    const { items, loading } = useArticles(activeFilter);
    const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const normalizedSearch = normalize(searchTerm);
    const filteredItems = items.filter(item =>
        normalize(`${item.title ?? ''} ${item.summary ?? ''}`).includes(normalizedSearch)
    );

    return (
        <div className={`news-view ${activeFilter.toLowerCase()}`}>
            <h2 className='news-title'>{activeFilter} News</h2>
            <div className='news-view-content'>
                {(loading || items.length === 0) && Array.from({ length: 4 }, (_, i) => ( 
                    <div key={i} className='loading-card'></div>
                ))}
                {!loading && filteredItems.map((item, index)=> {
                    console.log(`[${activeFilter} Item]:`, item);
                    return <ArticleCard key={index} item={item} />;
                })}
            </div>
        </div>
    )
}