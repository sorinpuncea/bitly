export type ShortLink = {
    id: string;
    originalUrl: string;
    shortUrl: string;
    label?: string;
    createdAt: string;
    clicks: number;
    active: boolean;
    expiresAt?: string;
    qrCodeUrl?: string;
    tags?: string[];
};
