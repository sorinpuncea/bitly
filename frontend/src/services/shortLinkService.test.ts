import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { ShortLink } from '../types/ShortLink';

const importService = async () => await import('./shortLinkService');

beforeEach(() => {
    vi.restoreAllMocks();
});

afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
});

describe('shortLinkService', () => {
    it('fetchShortLink calls the correct URL and returns item', async () => {
        vi.stubEnv('VITE_API_URL', 'http://api.test');

        const one: ShortLink = {
            id: 'xyz789',
            originalUrl: 'https://example.org/long/url',
            shortUrl: 'http://bit.ly/xyz789',
            createdAt: new Date().toISOString(),
            clicks: 42,
            active: false,
        };

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(one),
        } as any);

        const { fetchShortLink } = await importService();
        const result = await fetchShortLink('xyz789');

        expect(global.fetch).toHaveBeenCalledWith('http://api.test/shortlinks/xyz789');
        expect(result).toEqual(one);
    });

    it('fetchShortLink throws on 404', async () => {
        vi.stubEnv('VITE_API_URL', 'http://api.test');

        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: () => Promise.resolve({ error: 'Not found' }),
        } as any);

        const { fetchShortLink } = await importService();
        await expect(fetchShortLink('nope')).rejects.toThrow('Shortlink not found.');
    });
});
