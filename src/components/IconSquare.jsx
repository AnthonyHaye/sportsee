import React from 'react'
import PropTypes from 'prop-types'

/**
 * Représente un carré d'icône avec une couleur de fond et une couleur d'icône.
 *
 * @param {Object} props - les propriétés du composant
 * @param {React.ReactNode} props.icon - l'icône à afficher à l'intérieur du carré
 * @param {string} [props.iconColor] - la couleur de l'icône. Si non spécifiée, l'icône n'aura pas de couleur spécifique.
 * @param {string} props.bgColor - la couleur de fond du carré
 *
 * @returns {React.Element} Le composant IconSquare.
 */
const IconSquare = ({ icon, iconColor, backgroundColor }) => {
  return (
    <div className="icon_tab" style={{ backgroundColor }}>
      {React.isValidElement(icon)
        ? React.cloneElement(icon, { color: iconColor })
        : null}
    </div>
  )
}

IconSquare.propTypes = {
  icon: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
}

export default IconSquare
