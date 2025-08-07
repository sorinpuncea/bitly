import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => (
    <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Bitly!</h1>
        <p className={styles.subtitle}>Manage your shortened links with ease.</p>
        <Link to="/shortlinks" className={styles.ctaButton}>
            Go to ShortLinks
        </Link>
    </div>
);

export default Home;
