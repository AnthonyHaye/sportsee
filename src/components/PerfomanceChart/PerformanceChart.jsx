import React from 'react'
import PropTypes from 'prop-types'
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
} from 'recharts'
import './PerformanceChart.scss'

/**
 * Un composant de graphique radar qui affiche les performances de l'utilisateur
 * sur différentes dimensions (cardio, énergie, endurance, force, vitesse, intensité).
 *
 * @param {Object} props - Les propriétés passées au composant.
 * @param {Array<Object>} props.radarUserPerformance - Un tableau d'objets représentant les performances de l'utilisateur.
 * @param {string} props.radarUserPerformance[].subject - Le type de performance (par exemple, 'cardio', 'énergie', etc.).
 * @param {number} props.radarUserPerformance[].value - La valeur de performance pour le type correspondant.
 *
 * @returns {JSX.Element} Le composant de graphique radar rendu.
 */

const PerformanceChart = React.memo(({ radarUserPerformance = [] }) => {
  if (!radarUserPerformance || radarUserPerformance.length === 0) {
    return <div className="user_radar_graph">Aucune donnée disponible.</div>
  }

  return (
    <div className="user_radar_graph">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="90%"
          data={radarUserPerformance}
        >
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#ffffff', fontSize: 10 }}
          />
          <Radar name="User" dataKey="value" fill="#ff0101b3" />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
})

PerformanceChart.displayName = 'PerformanceChart'

PerformanceChart.propTypes = {
  radarUserPerformance: PropTypes.arrayOf(
    PropTypes.shape({
      subject: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
}

export default PerformanceChart
