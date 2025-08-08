import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchShortLink } from '../../services/shortLinkService';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import type { ShortLink } from '../../types/ShortLink';
import styles from './Detail.module.css';

const Detail = () => {
    const { id } = useParams<{ id: string }>();
    const [link, setLink] = useState<ShortLink | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError('No shortlink ID provided.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        fetchShortLink(id)
            .then((data) => setLink(data))
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Loader />;
    if (error || !link) return <ErrorMessage message={error || 'Shortlink not found.'} />;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{link.label || link.shortUrl}</h2>
            <div className={styles.info}>
                <div>
                    <strong>Original URL:</strong>{' '}
                    <a
                        href={link.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.url}
                    >
                        {link.originalUrl}
                    </a>
                </div>
                <div>
                    <strong>Short URL:</strong>{' '}
                    <span className={styles.shortUrl}>{link.shortUrl}</span>
                </div>
                <div>
                    <strong>Clicks:</strong> {link.clicks}
                </div>
                <div>
                    <strong>Status:</strong>{' '}
                    <span className={link.active ? styles.active : styles.inactive}>
                        {link.active ? 'Active' : 'Inactive'}
                    </span>
                </div>
                {link.expiresAt && (
                    <div>
                        <strong>Expires:</strong> {new Date(link.expiresAt).toLocaleDateString()}
                    </div>
                )}
                {link.qrCodeUrl && (
                    <div>
                        <strong>QR Code:</strong>
                        <div>
                            <img src={link.qrCodeUrl} alt="QR Code" className={styles.qrCode} />
                        </div>
                    </div>
                )}
                {link.tags && link.tags.length > 0 && (
                    <div>
                        <strong>Tags:</strong>{' '}
                        {link.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <Link to="/shortlinks" className={styles.backLink}>
                ← Back to list
            </Link>
        </div>
    );
};

export default Detail;
