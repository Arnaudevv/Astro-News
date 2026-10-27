import { useState, useEffect } from 'react'

const BASE_URL = 'https://api.spaceflightnewsapi.net/v4/articles/';

export function useArticles(filter, limit = 8) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchSpaceNews = async () => {
            setLoading(true);
            setError(null);

            try {
                const params = new URLSearchParams({ limit });

                if (filter && filter !== 'All') {
                    params.set('title_contains', filter);
                }

                const response = await fetch(`${BASE_URL}?${params}`, {
                    signal: controller.signal,
                });
                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const data = await response.json();
                setItems(data.results);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Error fetching space news:', err);
                    setError(err);
                }
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        };

        fetchSpaceNews();

        return () => controller.abort();
    }, [filter, limit]);

    return { items, loading, error };
}