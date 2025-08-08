import type { ShortLink } from '../../types/ShortLink.ts';
import { Link } from 'react-router-dom';
import styles from './ShortLinkCard.module.css';

type Props = {
    link: ShortLink;
};

const ShortLinkCard = ({ link }: Props) => (
    <div className={styles.card}>
        <Link to={`/shortlinks/${link.id}`} className={styles.link}>
            <div className={styles.label}>{link.label || link.shortUrl}</div>
            <div className={styles.details}>
                <span>
                    <strong>Original:</strong> <span>{link.originalUrl}</span>
                </span>
                <span>
                    <strong>Short URL:</strong> {link.shortUrl}
                </span>
                <span>
                    <strong>Clicks:</strong> {link.clicks}
                </span>
                <span>
                    <strong>Status:</strong> {link.active ? 'Active' : 'Inactive'}
                </span>
                {link.expiresAt && (
                    <span>
                        <strong>Expires:</strong> {new Date(link.expiresAt).toLocaleDateString()}
                    </span>
                )}
            </div>
        </Link>
    </div>
);

export default ShortLinkCard;
