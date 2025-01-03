import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { FaFire, FaDrumstickBite, FaAppleAlt, FaHamburger } from 'react-icons/fa';

import LeftNav from "./components/LeftNav/LeftNav";
import TopNav from "./components/TopNav/TopNav";


import Activitychart from "./components/ActivityChart/ActivityChart";
import PerformanceChart from "./components/PerfomanceChart/PerformanceChart";

import './styles/App.scss';

//Data services
import { fetchUserData, fetchUserActivity, fetchUserAverageSessions, fetchUserPerformance } from "./services/apiService";
//Data standardisation
import { standardizeActivityData, standardizeAverageSessionsData, standardizePerformanceData, standardizeUserData } from "./utils/utils";


import Page404 from "./pages/Page404";
import KeyInfoCard from "./components/KeyInfoCard/KeyInfoCard";
import ScoreChart from "./components/ScoreChart/ScoreChart";


const Dashboard = () => {
  const { userId } = useParams();
  // console.log("Render le dashboard de l'utilisateur avec l'id :", userId);

  // États pour les données
  
  const [userData, setUserData] = useState(null);
  const [userActivity, setUserActivity] = useState(null);  
  const [userAverageSessions, setUserAverageSessions] = useState(null);
  const [userPerformance, setUserPerformance] = useState(null);
  // console.log("userPerformance :" , userPerformance)
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userIdNumber = parseInt(userId, 10);
        // Récupération des données
        const mainDataResponse = await fetchUserData(userIdNumber);        
        const activityDataResponse = await fetchUserActivity(userIdNumber);        
        const averageSessionDataResponse = await fetchUserAverageSessions(userIdNumber);
        const performanceDataResponse = await fetchUserPerformance(userIdNumber);

        // Standardisation des données
        const standardizedUserData = standardizeUserData(mainDataResponse);        
        const standardizedActivityData = standardizeActivityData(activityDataResponse);
        const standardizedAverageSessionsData = standardizeAverageSessionsData(averageSessionDataResponse);
        const standardizedPerformanceData = standardizePerformanceData(performanceDataResponse);

        // Mise à jour des états
        setUserData(standardizedUserData);
        setUserActivity(standardizedActivityData);
        setUserAverageSessions(standardizedAverageSessionsData);
        setUserPerformance(standardizedPerformanceData);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
        setError("Erreur lors du chargement des données, veuillez réessayer plus tard.");
      }
    };

    fetchData();
  }, [userId]);

  // Affichage d'un message d'erreur si nécessaire
  if (error) {
    return <Page404 errorMsg={error}/>
  } else if (!userData || !userActivity || !userAverageSessions || !userPerformance){
    return <Page404/>
  }

  // Affichage d'un état de chargement si les données ne sont pas encore prêtes
  if (!userActivity || !userData || !userAverageSessions || !userPerformance) {
    console.log("Données non prêtes :", { userActivity, userData, userAverageSessions, userPerformance });
    return <div>Chargement des données...</div>;
  }


  //doc recharts subject et value pour le radar graph
  //obtenir le label correspondant (compatibles avec Recharts)
  
  const radarUserPerformance = userPerformance.data.map(item => ({
    subject : item.subject,
    value: item.value
  }));

  if (!radarUserPerformance || radarUserPerformance.length === 0) {
    console.warn("Aucune donnée pour le graphique radar");
    return <div>Aucune donnée disponible pour les performances.</div>;
  }
  
  //simple radial bar chart pour le score
  const score_data = [{
    name: 'Score',
    uv: userData.todayScore * 100,
    fill: '#ff0101'
    }
  ]
  // const radarUserPerformance = [
  //   { subject: 'Cardio', value: 80 },
  //   { subject: 'Energie', value: 90 },
  //   { subject: 'Endurance', value: 70 },
  //   { subject: 'Force', value: 85 },
  //   { subject: 'Vitesse', value: 95 },
  //   { subject: 'Intensite', value: 95 }
  // ];

  return (
    <>
      <TopNav />
      <LeftNav />
      <div className="main_content">
        <div className="user_header">
          <h1>Bonjour <span className="user_first_name">{userData.userInfos.firstName}</span></h1>
          <p>Félicitations ! Vous avez explosé vos objectifs d&apos;hier  👏 </p>
          
        </div>
        <Activitychart userActivitySessions={userActivity.sessions} />
        <ScoreChart scoreData={score_data}/>
        <PerformanceChart radarUserPerformance={radarUserPerformance}/>
        
        <div className="user_nutrition">
          <KeyInfoCard 
            icon={<FaFire />} 
            iconColor="#FF0000"
            backgroundColor="#FF00000D" 
            name="Calories" 
            value={userData.keyData.calorieCount} 
            unit="kCal"/>  
          <KeyInfoCard 
            icon={<FaDrumstickBite />} 
            iconColor="#4AB8FF"
            backgroundColor="#4AB8FF1A" 
            name="Protéïnes" 
            value={userData.keyData.proteinCount} 
            unit="kCal"/>
          <KeyInfoCard 
            icon={<FaAppleAlt/>} 
            iconColor="#F9CE23"
            backgroundColor="#F9CE231A" 
            name="Glucides" 
            value={userData.keyData.carbohydrateCount} 
            unit="kCal"/>
          <KeyInfoCard 
            icon={<FaHamburger />} 
            iconColor="#FD5181"
            backgroundColor="#FD51811A" 
            name="Lipides" 
            value={userData.keyData.lipidCount} 
            unit="kCal"/>
        </div>
      </div>
      
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Route pour le Dashboard */}
        <Route path="/user/:userId" element={<Dashboard />} />
        {/* Route pour la page 404 */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
