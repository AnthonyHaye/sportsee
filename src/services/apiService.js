import axios from 'axios'
import CONFIG from '../config'
import {
  mockedUserData,
  mockedUserActivity,
  mockedUserAverageSessions,
  mockedUserPerformance,
} from './mockData' // Importe les données mockées

const API_BASE_URL = 'http://localhost:3000/user'

const fetchData = async (endpoint, mockData, userId) => {
  if (CONFIG.useMockData) {
    return mockData.find((data) => data.userId === userId)
  }
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}/${endpoint}`)
    return response.data
  } catch (error) {
    console.error(`Erreur lors de la récupération de ${endpoint}:`, error)
    throw error
  }
}

export const fetchUserData = (userId) => fetchData('', mockedUserData, userId)
export const fetchUserActivity = (userId) =>
  fetchData('activity', mockedUserActivity, userId)
export const fetchUserAverageSessions = (userId) =>
  fetchData('average-sessions', mockedUserAverageSessions, userId)
export const fetchUserPerformance = (userId) =>
  fetchData('performance', mockedUserPerformance, userId)
