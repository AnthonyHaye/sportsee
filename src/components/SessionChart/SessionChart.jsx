import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

function SessionChart({ data }) {
  return (
    <div
      style={{
        width: "100%",
        height: 200,
        backgroundColor: "#FF0000",
        borderRadius: 10,
      }}
    >
      <h3 style={{ color: "white", padding: "10px" }}>Durée des sessions</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="day" stroke="white" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="#FFFFFF"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

SessionChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SessionChart;
