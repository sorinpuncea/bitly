import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => (
    <nav className={styles.navbar}>
        <NavLink
            to="/"
            className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active} ` : styles.link
            }
        >
            Home
        </NavLink>
        <NavLink
            to="/shortlinks"
            className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active} ` : styles.link
            }
        >
            Links
        </NavLink>
    </nav>
);

export default Navbar;
