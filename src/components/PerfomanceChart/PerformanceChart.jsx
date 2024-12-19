import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";
import styles from "./PerformanceChart.module.scss";

/**
 * PerformanceChart Component - Affiche un graphique radar de la performance.
 * @param {Object} props - Les propriétés du composant.
 * @param {Array} props.data - Les données du graphique radar.
 * @returns {JSX.Element} Le composant graphique radar.
 */
function PerformanceChart({ data }) {
  return (
    <div className={styles.radarChart}>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey="subject"
            stroke="white"
            tick={{ fontSize: 12, fontWeight: 500 }}
          />
          <Radar
            dataKey="value"
            stroke="#FF0101"
            fill="#FF0101"
            fillOpacity={0.7}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

PerformanceChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      subject: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default PerformanceChart;
