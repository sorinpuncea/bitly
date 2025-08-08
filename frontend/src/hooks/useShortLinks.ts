import { useEffect, useState } from 'react';
import { fetchShortLinks, type ShortLinkListResponse } from '../services/shortLinkService';

export function useShortLinks(page: number, perPage: number) {
    const [data, setData] = useState<ShortLinkListResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchShortLinks(page, perPage)
            .then((resp) => {
                setData(resp);
                setError(null);
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [page, perPage]);

    return {
        shortLinks: data?.data || [],
        total: data?.total || 0,
        loading,
        error,
    };
}
