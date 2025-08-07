import styles from './Loader.module.css';

const Loader = () => (
    <div className={styles.loader} aria-busy="true">
        <span className={styles.spinner} />
        Loading...
    </div>
);

export default Loader;
