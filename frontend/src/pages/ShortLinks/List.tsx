import { useState } from 'react';
import { useShortLinks } from '../../hooks/useShortLinks';
import Pagination from '../../components/Pagination';
import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';
import ShortLinkCard from '../../components/ShortLinkCard';
import styles from './List.module.css';

const PER_PAGE = 10;

const List = () => {
    const [page, setPage] = useState(1);
    const { shortLinks, total, loading, error } = useShortLinks(page, PER_PAGE);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Short Links</h1>
            <div className={styles.scrollArea}>
                <div className={styles.gridFlex}>
                    {shortLinks.map((link) => (
                        <ShortLinkCard key={link.id} link={link} />
                    ))}
                </div>
            </div>
            <Pagination page={page} perPage={PER_PAGE} total={total} onChange={setPage} />
        </div>
    );
};

export default List;
