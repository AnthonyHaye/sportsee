import axios from 'axios'
import CONFIG from '../config'
import {
  mockedUserData,
  mockedUserActivity,
  mockedUserAverageSessions,
  mockedUserPerformance,
} from './mockData' // Importe les données mockées

const API_BASE_URL = 'http://localhost:3000/user'

/**
 * Récupère les données principales de l'utilisateur à partir de l'API ou des données mockées.
 *
 * @param {number} userId - L'ID de l'utilisateur.
 * @returns {Promise<Object>} - Les données principales de l'utilisateur.
 * @throws {Error} - Lève une erreur en cas de problème de récupération des données.
 */
export const fetchUserData = async (userId) => {
  if (CONFIG.useMockData) {
    return mockedUserData.find((user) => user.id === userId)
  } else {
    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}`)
      return response.data
    } catch (error) {
      console.error(
        "Erreur de récupération des données de l'utilisateur",
        error,
      )
      throw error
    }
  }
}

/**
 * Récupère les données d'activité de l'utilisateur à partir de l'API ou des données mockées.
 *
 * @param {number} userId - L'ID de l'utilisateur.
 * @returns {Promise<Object>} - Les données d'activité de l'utilisateur.
 * @throws {Error} - Lève une erreur en cas de problème de récupération des données.
 */
export const fetchUserActivity = async (userId) => {
  if (CONFIG.useMockData) {
    return mockedUserActivity.find((activity) => activity.userId === userId)
  } else {
    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}/activity`)
      return response.data
    } catch (error) {
      console.error(
        "Erreur de récupération des données de l'activité de l'utilisateur",
        error,
      )
      throw error
    }
  }
}

/**
 * Récupère les données de sessions de l'utilisateur à partir de l'API ou des données mockées.
 *
 * @param {number} userId - L'ID de l'utilisateur.
 * @returns {Promise<Object>} - Les données de sessions de l'utilisateur.
 * @throws {Error} - Lève une erreur en cas de problème de récupération des données.
 */
export const fetchUserAverageSessions = async (userId) => {
  if (CONFIG.useMockData) {
    return mockedUserAverageSessions.find(
      (sessions) => sessions.userId === userId,
    )
  } else {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/${userId}/average-sessions`,
      )
      return response.data
    } catch (error) {
      console.error(
        "Erreur de récupération des données de sessions l'utilisateur",
        error,
      )
      throw error
    }
  }
}

/**
 * Récupère les données de performance de l'utilisateur à partir de l'API ou des données mockées.
 *
 * @param {number} userId - L'ID de l'utilisateur.
 * @returns {Promise<Object>} - Les données de performance de l'utilisateur.
 * @throws {Error} - Lève une erreur en cas de problème de récupération des données.
 */
export const fetchUserPerformance = async (userId) => {
  if (CONFIG.useMockData) {
    return mockedUserPerformance.find(
      (performance) => performance.userId === userId,
    )
  } else {
    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}/performance`)
      return response.data
    } catch (error) {
      console.error(
        "Erreur de récupération des données de performance de l'utilisateur",
        error,
      )
      throw error
    }
  }
}
