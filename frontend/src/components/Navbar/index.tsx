import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => (
    <nav className={styles.navbar}>
        <Link to="/" className={styles.link}>
            Home
        </Link>
    </nav>
);

export default Navbar;
