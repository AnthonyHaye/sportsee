import { useState, useEffect } from "react"
import { fetchUserData } from "../services/userService"
import ActivityChart from "../components/ActivityChart/ActivityChart";
import { userActivity } from "../services/mockData";

function Profile(){
        const[ userData, setUserData] = useState(null)

        useEffect(() => {
                fetchUserData().then((data) => setUserData(data));
        }, [])

        if (!userData) return <div>chargement...</div>

        return (
                <div>
                <h1>Profil de {userData.userInfos.firstName}</h1>
                <ul>
                        <li>Âge : {userData.userInfos.age} ans</li>
                        <li>Calories : {userData.keyData.calorieCount} kcal</li>
                        <li>Protéines : {userData.keyData.proteinCount} g</li>
                        <li>Glucides : {userData.keyData.carbohydrateCount} g</li>
                        <li>Lipides : {userData.keyData.lipidCount} g</li>
                </ul>

                <ActivityChart data={userActivity}/>
                </div>
        );
}

export default Profile