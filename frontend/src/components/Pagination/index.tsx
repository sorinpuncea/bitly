import styles from './Pagination.module.css';

type PaginationProps = {
    page: number;
    perPage: number;
    total: number;
    onChange: (page: number) => void;
};

export default function Pagination({ page, perPage, total, onChange }: PaginationProps) {
    const lastPage = Math.ceil(total / perPage);

    if (lastPage <= 1) return null;

    return (
        <nav className={styles.pagination}>
            <button onClick={() => onChange(page - 1)} disabled={page <= 1} className={styles.btn}>
                Prev
            </button>
            <span className={styles.status}>
                Page {page} of {lastPage}
            </span>
            <button
                onClick={() => onChange(page + 1)}
                disabled={page >= lastPage}
                className={styles.btn}
            >
                Next
            </button>
        </nav>
    );
}
