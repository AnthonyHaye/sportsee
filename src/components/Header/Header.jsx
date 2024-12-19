import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Navigation principale">
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/profile">Profil</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
