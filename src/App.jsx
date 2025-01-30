import { useEffect, useState, useMemo } from 'react'
import {
  HashRouter as Router,
  Routes,
  Route,
  useParams,
  Navigate,
} from 'react-router-dom'
import {
  FaFire,
  FaDrumstickBite,
  FaAppleAlt,
  FaHamburger,
} from 'react-icons/fa'

import LeftNav from './components/LeftNav/LeftNav'
import TopNav from './components/TopNav/TopNav'

import Activitychart from './components/ActivityChart/ActivityChart'
import PerformanceChart from './components/PerfomanceChart/PerformanceChart'

import './styles/App.scss'

//Data services
import {
  fetchUserData,
  fetchUserActivity,
  fetchUserAverageSessions,
  fetchUserPerformance,
} from './services/apiService'
//Data standardisation
import {
  standardizeActivityData,
  standardizeAverageSessionsData,
  standardizePerformanceData,
  standardizeUserData,
} from './utils/utils'

import Page404 from './pages/Page404'
import KeyInfoCard from './components/KeyInfoCard/KeyInfoCard'
import ScoreChart from './components/ScoreChart/ScoreChart'
import SessionChart from './components/SessionChart/SessionChart'
import Spinner from './components/Spinner/Spinner'

const Dashboard = () => {
  const { userId } = useParams()
  const defaultUserId = 12

  const userIdNumber = userId ? parseInt(userId, 10) : defaultUserId

  // États pour les données

  // const [userData, setUserData] = useState(null)
  // const [userActivity, setUserActivity] = useState(null)
  // const [userAverageSessions, setUserAverageSessions] = useState(null)
  // const [userPerformance, setUserPerformance] = useState(null)
  // const [error, setError] = useState(null)

  const [userData, setUserData] = useState({
    main: null,
    activity: null,
    sessions: null,
    performance: null,
    error: null
  });
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupération des données
        const [mainDataResponse, activityDataResponse, averageSessionDataResponse, performanceDataResponse] = await Promise.all([
          fetchUserData(userIdNumber),
          fetchUserActivity(userIdNumber),
          fetchUserAverageSessions(userIdNumber),
          fetchUserPerformance(userIdNumber),
        ]);

        console.log("Données reçues :", {
          mainDataResponse,
          activityDataResponse,
          averageSessionDataResponse,
          performanceDataResponse
        });

       // Déclenche un délai avant d'afficher les données (simulation de chargement)
       setTimeout(() => {
        setUserData({
          main: standardizeUserData(mainDataResponse),
          activity: standardizeActivityData(activityDataResponse),
          sessions: standardizeAverageSessionsData(averageSessionDataResponse),
          performance: standardizePerformanceData(performanceDataResponse),
          error: null
        });
        }, 2000); // ⏳ Affichage du spinner pendant 2 secondes
      } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
      if (error.response) {
        console.error("Détails de l'erreur API :", error.response.data);
        }
      
      // Ajouter un délai aussi en cas d'erreur pour éviter un changement trop brutal
      setTimeout(() => {
        setUserData(prev => ({ ...prev, error: "Erreur lors du chargement des données, veuillez réessayer plus tard." }));
        }, 2000); // 2 secondes aussi pour la cohérence
      }
  };
  fetchData();
}, [userIdNumber]);

  const radarUserPerformance = useMemo(() => {
    if (!userData.performance || !userData.performance.data) return [];
    return userData.performance.data.map(({ subject, value }) => ({ subject, value }));
  }, [userData.performance]);

  const isLoading = !userData.main || !userData.activity || !userData.sessions || !userData.performance;

if (isLoading) {
  return <Spinner />;
}
  
  

  // Affichage d'un message d'erreur si nécessaire
  if (userData.error && userData.error !== null) {
    return <Page404 errorMsg={userData.error} />
  } 
  if (
    !userData.main ||
    !userData.activity ||
    !userData.sessions ||
    !userData.performance
  ) {
    return <div>Chargement des données...</div>
  }     

  if (!radarUserPerformance || radarUserPerformance.length === 0) {
    console.warn('Aucune donnée pour le graphique radar')
    return <div>Aucune donnée disponible pour les performances.</div>
  }

  //simple radial bar chart pour le score
  const score_data = [
    {
      name: 'Score',
      uv: (userData.main?.todayScore || userData.main?.score || 0) * 100,
      fill: '#ff0101',
    },
  ]
  

  return (
    <>
      <TopNav />
      <LeftNav />
      <div className="main_content">
        <div className="user_header">
          <h1>
            Bonjour{' '}
            <span className="user_first_name">
              {userData.main?.userInfos?.firstName}
            </span>
          </h1>
          <p>Félicitations ! Vous avez explosé vos objectifs d&apos;hier 👏 </p>
        </div>
        <Activitychart userActivitySessions={userData.activity?.sessions} />
        <ScoreChart scoreData={score_data} />
        <PerformanceChart radarUserPerformance={radarUserPerformance} />
        <SessionChart AverageSessions={userData.sessions?.sessions} />

        <div className="user_nutrition">
          <KeyInfoCard
            key="calories"
            icon={<FaFire />}
            iconColor="#FF0000"
            backgroundColor="#FF00000D"
            name="Calories"
            value={userData.main?.keyData?.calorieCount ?? 0}
            unit="kCal"
          />
          <KeyInfoCard
            key="Proteins"
            icon={<FaDrumstickBite />}
            iconColor="#4AB8FF"
            backgroundColor="#4AB8FF1A"
            name="Protéïnes"
            value={userData.main?.keyData?.proteinCount ?? 0}
            unit="g"
          />
          <KeyInfoCard
            key="glucides"
            icon={<FaAppleAlt />}
            iconColor="#F9CE23"
            backgroundColor="#F9CE231A"
            name="Glucides"
            value={userData.main?.keyData?.carbohydrateCount ?? 0}
            unit="g"
          />
          <KeyInfoCard
            key="lipides"
            icon={<FaHamburger />}
            iconColor="#FD5181"
            backgroundColor="#FD51811A"
            name="Lipides"
            value={userData.main?.keyData?.lipidCount ?? 0}
            unit="g"
          />
        </div>
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirection par défaut vers l'utilisateur 12 */}
        <Route path="/" element={<Navigate to="/user/12" replace />} />
        {/* Route pour le Dashboard */}
        <Route path="/user/:userId" element={<Dashboard />} />
        {/* Route pour la page 404 */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  )
}

export default App
