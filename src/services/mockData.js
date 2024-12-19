export const userMockData = {
  id: 12,
  userInfos: {
    firstName: "Karl",
    lastName: "Dovineau",
    age: 31,
  },
  keyData: {
    calorieCount: 2500,
    proteinCount: 90,
    carbohydrateCount: 150,
    lipidCount: 120,
  },
};
export const userActivity = [
  { day: "Lundi", calories: 250, session: 30 },
  { day: "Mardi", calories: 300, session: 40 },
  { day: "Mercredi", calories: 280, session: 35 },
  { day: "Jeudi", calories: 500, session: 45 },
  { day: "Vendredi", calories: 400, session: 50 },
  { day: "Samedi", calories: 450, session: 60 },
  { day: "Dimanche", calories: 380, session: 40 },
];

export const userSessions = [
  { day: "L", sessionLength: 30 },
  { day: "M", sessionLength: 70 },
  { day: "M", sessionLength: 50 },
  { day: "J", sessionLength: 60 },
  { day: "V", sessionLength: 70 },
  { day: "S", sessionLength: 70 },
  { day: "D", sessionLength: 40 },
];

export const userScore = {
  todayScore: 0.5524755, // 78% par exemple
};

export const userPerformance = [
  { subject: "Intensité", value: 80 },
  { subject: "Vitesse", value: 90 },
  { subject: "Force", value: 12 },
  { subject: "Endurance", value: 5 },
  { subject: "Energie", value: 60 },
  { subject: "Cardio", value: 75 },
];
