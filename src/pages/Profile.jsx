import { useState, useEffect } from "react";
import { fetchUserData } from "../services/userService";
import ActivityChart from "../components/ActivityChart/ActivityChart";
import {
  userActivity,
  userPerformance,
  userScore,
  userSessions,
} from "../services/mockData";
import SessionChart from "../components/SessionChart/SessionChart";
import ScoreChart from "../components/ScoreChart/ScoreChart";
import KeyInfoCard from "../components/KeyInfoCard/KeyInfoCard";
import caloriesIcon from "../assets/icon/calories-icon.svg";
import proteinsIcon from "../assets/icon/protein-icon.svg";
import carbsIcon from "../assets/icon/carbs-icon.svg";
import lipidsIcon from "../assets/icon/fat-icon.svg";
import PerformanceChart from "../components/PerfomanceChart/PerformanceChart";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData()
      .then((data) => setUserData(data))
      .catch((error) => {
        console.error("Erreur de chargement :", error);
        setError("Impossible de charger les données.");
      });
  }, []);

  if (error) return <div>{error}</div>;

  if (!userData) return <div>Chargement...</div>;
  const { keyData, userInfos } = userData;
  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = keyData;

  return (
    <div>
      <h1>Profil de {userInfos.firstName}</h1>
      <ul>
        <li>Âge : {userInfos.age} ans</li>
        <li>Calories : {calorieCount} kcal</li>
        <li>Protéines : {proteinCount} g</li>
        <li>Glucides : {carbohydrateCount} g</li>
        <li>Lipides : {lipidCount} g</li>
      </ul>

      <ActivityChart data={userActivity} />
      <SessionChart data={userSessions} />
      <PerformanceChart data={userPerformance} />
      <ScoreChart data={userScore} />

      <div>
        <KeyInfoCard
          icon={caloriesIcon}
          label="Calories"
          value={calorieCount}
          unit="kCal"
        />
        <KeyInfoCard
          icon={proteinsIcon}
          label="Protéines"
          value={proteinCount}
          unit="g"
        />
        <KeyInfoCard
          icon={carbsIcon}
          label="Glucides"
          value={carbohydrateCount}
          unit="g"
        />
        <KeyInfoCard
          icon={lipidsIcon}
          label="Lipides"
          value={lipidCount}
          unit="g"
        />
      </div>
    </div>
  );
}

export default Profile;
