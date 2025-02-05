import React from 'react'
import logo from '../../assets/sportsee_logo.svg'
import './TopNav.scss'

/**
 * représente la barre de navigation supérieure avec le logo et les liens de navigation.
 *
 * @returns {React.Element} Le composant TopNav.
 */

const navLinks = ['Accueil', 'Profil', 'Réglage', 'Communauté']

const TopNav = React.memo(() => {
  return (
    <nav className="top_nav" aria-label="Navigation principale">
      <img src={logo} alt="sport see logo" className="logo" />
      <div className="top_nav_links">
        <ul>
          {navLinks.map((link, index) => (
            <li key={index}>{link}</li>
          ))}
        </ul>
      </div>
    </nav>
  )
})

TopNav.displayName = 'TopNav'

export default TopNav
