import type { ShortLink } from '../types/ShortLink.ts';

const API_BASE = import.meta.env.VITE_API_URL;

export type ShortLinkListResponse = {
    data: ShortLink[];
    total: number;
};

export async function fetchShortLinks(page = 1, perPage = 10): Promise<ShortLinkListResponse> {
    const res = await fetch(`${API_BASE}/shortlinks?page=${page}&perPage=${perPage}`);
    if (!res.ok) throw new Error('Failed to fetch shortlinks.');
    return res.json();
}

export async function fetchShortLink(id: string): Promise<ShortLink> {
    const res = await fetch(`${API_BASE}/shortlinks/${id}`);
    if (!res.ok) throw new Error('Shortlink not found.');
    return res.json();
}
