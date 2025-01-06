import PropTypes from 'prop-types';
import { useState } from 'react';

//recharts components
import { XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import "./SessionChart.scss"
import CustomTooltip from '../CustomTooltip/CustomTooltip';


/**
 * Un composant de graphique en ligne qui affiche la durée moyenne des sessions de l'utilisateur
 * pour chaque jour de la semaine.
 *
 * @param {Object} props - Les propriétés passées au composant.
 * @param {Array<Object>} props.AverageSessions - Un tableau d'objets représentant les sessions moyennes par jour.
 * @param {number} props.AverageSessions[].day - Le jour de la semaine, représenté par un numéro (1 = Lundi, 7 = Dimanche).
 * @param {number} props.AverageSessions[].sessionLength - La durée moyenne de la session (en minutes) pour le jour donné.
 *
 * @returns {JSX.Element} Le composant de graphique en ligne rendu.
 */

const SessionChart = ({AverageSessions}) =>{
    const [hoverIndex, setHoverIndex] = useState(-1)

  const handleMouseMove = (state) =>{
    if (state.isTooltipActive){
      const  {activeTooltipIndex} = state
      setHoverIndex(activeTooltipIndex)
    } else {
      setHoverIndex(-1)
    }
  }

  const calculateBackground = () => {
    const totalDays = AverageSessions.length
    //Largeur total du conteneur en pourcentage
    const totalwidth = 100
    const hoverPosition = ((hoverIndex + 0.5) / totalDays) * totalwidth
    //ajuste le décalage en ajoutant ou en soustrayant une petite valeur 
    const adjustedHoverPosition = Math.min(Math.max(hoverPosition, 0), totalwidth)
    return `linear-gradient(to right, #FF0000 ${adjustedHoverPosition}%, #8B0000 ${adjustedHoverPosition}%)`
  }

  //détermine les valeurs min et max pour la durée des sessions
  const minSessionLenght = Math.min(...AverageSessions.map(session => session.sessionLength)) -10 ;
  const maxSessionLenght = Math.max(...AverageSessions.map(session => session.sessionLength)) +20 ;

  return (
    <div className="user_sessions_length"
    style={{
    position: 'relative',
    overflow: 'hidden',
    background: hoverIndex >= 0 ? calculateBackground() : '#ff0101',
    transition: 'background 0.3s ease',
    }}
    >
    <h3>Durée moyenne des sessions</h3>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={AverageSessions}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}

        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverIndex(-1)}
      >
        <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tickFormatter={(tick) => ['L', 'M', 'M', 'J', 'V', 'S', 'D'][tick - 1]}
            tick={{ fill: '#ffffff99', fontSize: 12 }}
            padding={{ left: 5, right: 5 }}
          />
        <YAxis
            domain={[minSessionLenght,maxSessionLenght]} // 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#ffffff99', fontSize: 12 }}
            hide={true}
          />
        <Tooltip 
          content={<CustomTooltip isSingleValue={true}/>}
          cursor={{ stroke: "transparent" }}
          />
        
        <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="#FFFFFF"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
      </LineChart>
    </ResponsiveContainer>
    </div>
  )
  
}

  

SessionChart.propTypes = {
  AverageSessions: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.number.isRequired,
      sessionLength: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default SessionChart;
