import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";

import LeftNav from "./components/LeftNav/LeftNav";
import TopNav from "./components/TopNav/TopNav";


import Activitychart from "./components/ActivityChart/ActivityChart";

import './styles/App.scss';

//Data services
import { fetchUserData, fetchUserActivity, fetchUserAverageSessions, fetchUserPerformance } from "./services/apiService";
//Data standardisation
import { standardizeActivityData, standardizeAverageSessionsData, standardizePerformanceData, standardizeUserData } from "./utils/utils";


import Page404 from "./pages/Page404";
import PerformanceChart from "./components/PerfomanceChart/PerformanceChart";


const Dashboard = () => {
  const { userId } = useParams();
  // console.log("Render le dashboard de l'utilisateur avec l'id :", userId);

  // États pour les données
  
  const [userData, setUserData] = useState(null);
  const [userActivity, setUserActivity] = useState(null);  
  const [userAverageSessions, setUserAverageSessions] = useState(null);
  const [userPerformance, setUserPerformance] = useState(null);
  console.log("userPerformance :" , userPerformance)
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
  

  return (
    <>
      <TopNav />
      <LeftNav />
      <div className="main_content">
        <div className="user_header">
          <h1>Bonjour <span className="user_first_name">{userData.userInfos.firstName}</span></h1>
          <p>Félicitations ! Vous avez explosé vos objectifs d&apos;hier  👏 </p>
          <Activitychart userActivitySessions={userActivity.sessions} />
          <PerformanceChart radarUserPerformance={radarUserPerformance}/>
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
