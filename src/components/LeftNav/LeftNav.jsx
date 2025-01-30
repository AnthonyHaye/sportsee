import React from 'react'
import { BiSwim } from 'react-icons/bi'
import { MdDirectionsBike } from 'react-icons/md'
import { LuDumbbell } from 'react-icons/lu'
import { GiMeditation } from 'react-icons/gi'
import IconSquare from '../IconSquare'
import '../LeftNav/Leftnav.scss'

/**
 * représente la barre de navigation latérale avec des icônes pour les activités.
 *
 * @returns {React.Element} Le composant LeftNav.
 */
const navIcons = [
  { component: <GiMeditation />, color: "#ff0101" },
  { component: <BiSwim />, color: "#ff0101" },
  { component: <MdDirectionsBike />, color: "#ff0101" },
  { component: <LuDumbbell />, color: "#ff0101" },
];

const LeftNav = React.memo(() => {
  return (
    <nav className="left_nav">
      <div className="left_nav_links">
        <ul role="list" aria-label="Navigation des activités">
          {navIcons.map((icon, index) => (
            <li key={index}>
              <IconSquare
                icon={icon.component}
                iconColor={icon.color}
                backgroundColor="#FFFFFF"
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
});

LeftNav.displayName = "LeftNav";

export default LeftNav;