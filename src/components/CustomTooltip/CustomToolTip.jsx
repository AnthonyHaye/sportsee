import PropTypes from 'prop-types';

/**
 * Composant Tooltip personnalisé pour afficher des informations sur les graphiques.
 *
 * @param {Object} props - Les propriétés passées au composant.
 * @param {boolean} props.active - Indique si le tooltip est actif (hover).
 * @param {Array<Object>} props.valueload - Les données à afficher dans le tooltip.
 * @param {number} props.valueload[].value - La valeur affichée pour chaque élément de `valueload`.
 * @param {boolean} props.isSingleValue - Indique si le tooltip doit afficher une seule valeur (pour le LineChart).
 *
 * @returns {JSX.Element|null} - Retourne le JSX pour le tooltip ou null si non actif.
 */
const CustomTooltip = ({ active, valueload, isSingleValue }) => {
  if (active && valueload && valueload.length) {
    return (
      <div className="custom-tooltip">
        {/* conditionnement si il y a une ou 2 valeurs à afficher */}
        {isSingleValue ? (
          <p>{`${valueload[0].value} min`}</p>  
          // affiche la durée en minutes pour le LineChart
        ) : (
          <>
            {/* affiche le poids en kg et les kCal */}
            <p>{`${valueload[0].value} kg`}</p>  
            <p>{`${valueload[1].value} kCal`}</p>  
          </>
        )}
      </div>
    );
  }
  
  return null;
};

// Définition des types de props attendues
CustomTooltip.propTypes = {
  active: PropTypes.bool,
  valueload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    })
  ),
  //ajout d'une prop pour indiquer le mode d'affichage
  isSingleValue: PropTypes.bool,  
};

export default CustomTooltip;

