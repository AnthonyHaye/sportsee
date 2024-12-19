import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
import PropTypes from "prop-types";
import styles from "./ScoreChart.module.scss";

/**
 * ScoreChart Component - Affiche le score de l'utilisateur sous forme d'arc de cercle.
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.data - Les données du score.
 * @param {number} props.data.todayScore - Le score de l'utilisateur en pourcentage (0 à 1).
 * @returns {JSX.Element} Le composant graphique du score.
 */
function ScoreChart({ data }) {
  const score = (data.todayScore * 100).toFixed(0); // Convertit le score en pourcentage et arrondit

  const scoreData = [{ name: "Score", value: score }];

  return (
    <div className={styles.scoreChart}>
      <h3 className={styles.title}>Score</h3>
      <ResponsiveContainer width="100%" height={250}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="80%"
          barSize={10}
          data={scoreData}
          startAngle={90}
          endAngle={450}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" cornerRadius={10} fill="#FF0000" />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            className={styles.scoreText}
          >
            {`${score}%`}
          </text>
          <text
            x="50%"
            y="65%"
            textAnchor="middle"
            dominantBaseline="central"
            className={styles.subtitle}
          >
            de votre objectif
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

ScoreChart.propTypes = {
  data: PropTypes.shape({
    todayScore: PropTypes.number.isRequired,
  }).isRequired,
};

export default ScoreChart;
