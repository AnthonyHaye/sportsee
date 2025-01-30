import React from 'react';
import PropTypes from 'prop-types'
import './KeyInfoCard.scss'
import IconSquare from '../IconSquare'

/**
 * KeyInfoCard Component - Affiche une information clé avec une icône.
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.icon - Chemin de l'icône.
 * @param {string} props.label - Nom de l'information (ex: Calories).
 * @param {string|number} props.value - Valeur de l'information.
 * @param {string} props.unit - Unité associée à la valeur.
 * @returns {JSX.Element} Carte affichant une information clé.
 */

const KeyInfoCard = React.memo(({ icon, iconColor, backgroundColor, name, value = 0, unit }) => {
  const formattedValue = value.toLocaleString('fr-FR', { maximumFractionDigits: 0 });

  return (
    <div className="user-card-nutrition">
      <IconSquare icon={icon} iconColor={iconColor} backgroundColor={backgroundColor} />
      <div className="nutrition-info">
        <p className="nutrition-value">
          {formattedValue}{unit}
        </p>
        <p className="nutrition-name">{name}</p>
      </div>
    </div>
  );
});

KeyInfoCard.displayName = "KeyInfoCard";

KeyInfoCard.propTypes = {
  icon: PropTypes.node.isRequired,
  iconColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
  unit: PropTypes.string.isRequired,
};

export default KeyInfoCard;
