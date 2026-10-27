import './ArticleCard.css'

export function ArticleCard({ item }) {
    const author = item.authors?.map(a => a.name).join(', ') || 'Unknown author';

    return (
        <a
            className='article-card'
            href={item.url}
            target='_blank'
            rel='noreferrer'
        >
            <div className='ac-img-wrapper'>
                <img
                    src={item.image_url}
                    alt={item.title}
                    className='ac-img'
                    loading='lazy'
                />
                <span className='ac-site'>{item.news_site}</span>
            </div>

            <div className='ac-data'>
                <div className='ac-data-header'>
                    <p className='ac-author'>{author}</p>
                    <p className='ac-date'>
                        {new Date(item.published_at).toLocaleDateString('es-ES')}
                    </p>
                </div>

                <h3 className='ac-title'>{item.title}</h3>
                <p className='ac-summary'>{item.summary}</p>

                <span className='ac-link'>Read article →</span>
            </div>
        </a>
    )
}