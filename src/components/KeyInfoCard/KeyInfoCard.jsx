import PropTypes from "prop-types";
import styles from "./KeyInfoCard.module.scss";

/**
 * KeyInfoCard Component - Affiche une information clé avec une icône.
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.icon - Chemin de l'icône.
 * @param {string} props.label - Nom de l'information (ex: Calories).
 * @param {string|number} props.value - Valeur de l'information.
 * @param {string} props.unit - Unité associée à la valeur.
 * @returns {JSX.Element} Carte affichant une information clé.
 */
function KeyInfoCard({ icon, label, value, unit }) {
  return (
    <div className={styles.card}>
      <img src={icon} alt={`${label} icon`} className={styles.icon} />
      <div className={styles.content}>
        <p className={styles.value}>
          {value}
          {unit}
        </p>
        <p className={styles.label}>{label}</p>
      </div>
    </div>
  );
}

KeyInfoCard.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string.isRequired,
};

export default KeyInfoCard;
