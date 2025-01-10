import logo from '../../assets/sportsee_logo.svg'
import './TopNav.scss'

/**
 * représente la barre de navigation supérieure avec le logo et les liens de navigation.
 *
 * @returns {React.Element} Le composant TopNav.
 */

const TopNav = () => {
  return (
    <nav className="top_nav" aria-label="Navigation principale">
      <img src={logo} alt="sport see logo" className="logo" />
      <div className="top_nav_links">
        <ul>
          <li>Accueil</li>
          <li>Profil</li>
          <li>Réglage</li>
          <li>Communauté</li>
        </ul>
      </div>
    </nav>
  )
}

export default TopNav
