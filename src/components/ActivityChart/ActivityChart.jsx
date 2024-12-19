import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import PropTypes from "prop-types";

function ActivityChart({ data }) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h2>Activité Hebdomadaire</h2>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="calories" fill="#ff7300" name="Calories brûlées" />
          <Bar dataKey="session" fill="#387908" name="Temps de session (min)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

ActivityChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ActivityChart;
