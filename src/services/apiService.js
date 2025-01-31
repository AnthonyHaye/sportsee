/**
 * @file apiService.js
 * @description Service pour récupérer les données utilisateur via une API ou des données mockées.
 */
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
 * Récupère les données d'un utilisateur à partir de l'API ou des données mockées.
 * @param {string} endpoint - L'endpoint de l'API.
 * @param {Array} mockData - Les données mockées.
 * @param {number} userId - L'ID de l'utilisateur.
 * @returns {Promise<Object|null>} Les données de l'utilisateur ou null si non trouvé.
 */

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

/**
 * Récupère les informations de base d'un utilisateur.
 * @param {number} userId - L'ID de l'utilisateur.
 * @returns {Promise<Object|null>} Les données de l'utilisateur ou null si non trouvé.
 */

export const fetchUserData = async (userId) => {
  if (CONFIG.useMockData) {
    const user = mockedUserData.find((user) => user.id === Number(userId))

    if (!user) {
      console.warn(`⚠️ Aucun utilisateur trouvé avec l'ID: ${userId}`)
    }

    return user || null
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}`)
    return response.data
  } catch (error) {
    console.error(
      '❌ Erreur lors de la récupération des données utilisateur :',
      error
    )
    throw error
  }
}

/**
 * Récupère les données d'activité d'un utilisateur.
 * @param {number} userId - L'ID de l'utilisateur.
 * @returns {Promise<Object|null>} Les données d'activité de l'utilisateur.
 */
export const fetchUserActivity = (userId) =>
  fetchData('activity', mockedUserActivity, userId)

/**
 * Récupère les sessions moyennes d'un utilisateur.
 * @param {number} userId - L'ID de l'utilisateur.
 * @returns {Promise<Object|null>} Les sessions moyennes de l'utilisateur.
 */
export const fetchUserAverageSessions = (userId) =>
  fetchData('average-sessions', mockedUserAverageSessions, userId)

/**
 * Récupère la performance d'un utilisateur.
 * @param {number} userId - L'ID de l'utilisateur.
 * @returns {Promise<Object|null>} La performance de l'utilisateur.
 */
export const fetchUserPerformance = (userId) =>
  fetchData('performance', mockedUserPerformance, userId)
