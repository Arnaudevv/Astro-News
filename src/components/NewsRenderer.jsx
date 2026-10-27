import './NewsRenderer.css'
import { useArticles } from '../UseArticles.jsx'
import { ArticleCard } from './articleCard.jsx';

export function NewsRenderer({ activeFilter }) {
    const { items } = useArticles(activeFilter);
    return (
        <div className={`news-view ${activeFilter.toLowerCase()}`}>
            <h2 className='news-title'>{activeFilter} News</h2>
            <div className='news-view-content'>
                {items.map((item, index)=> {
                    console.log(`[${activeFilter} Item]:`, item);
                    return <ArticleCard key={index} item={item} />;
                })}
            </div>
        </div>
    )
}