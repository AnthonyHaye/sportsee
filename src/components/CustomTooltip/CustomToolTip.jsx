import PropTypes from 'prop-types'
import React from 'react'

/**
 * Composant Tooltip personnalisé pour afficher des informations sur les graphiques.
 *
 * @param {Object} props - Les propriétés passées au composant.
 * @param {boolean} props.active - Indique si le tooltip est actif (hover).
 * @param {Array<Object>} props.payload - Les données à afficher dans le tooltip.
 * @param {number} props.payload[].value - La valeur affichée pour chaque élément de `payload`.
 * @param {boolean} props.isSingleValue - Indique si le tooltip doit afficher une seule valeur (pour le LineChart).
 *
 * @returns {JSX.Element|null} - Retourne le JSX pour le tooltip ou null si non actif.
 */
const CustomTooltip = React.memo(({ active, payload, isSingleValue }) => {
  if (!active || !payload?.length) return null

  return (
    <div className="custom-tooltip">
      {isSingleValue ? (
        <p>{`${payload[0].value} min`}</p>
      ) : (
        <>
          <p>{`${payload[0].value} kg`}</p>
          {payload[1] && <p>{`${payload[1].value} kCal`}</p>}
        </>
      )}
    </div>
  )
})

CustomTooltip.displayName = 'CustomTooltip'

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    }),
  ),
  isSingleValue: PropTypes.bool,
}

export default CustomTooltip
