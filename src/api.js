import axios from 'axios'

const Server = axios.create({
  baseURL: `http://localhost:5000/api`
})

const userExists = async email => {
  const {data} = await Server.get(`user/exists/email/${email}`)
  return data
}

const register = async user => {
  await Server.post('auth/register', user)
}

const validPoints = async (points) => {
  return true
}

const login = async (loginDetails) => {
  const {data} = await Server.post('auth/login', loginDetails)
  return data.authToken
}

const getUser = async (token, email) => {
  const {data} = await Server.get(`user/email/${email}`, {
    headers: {'token': token}
  })
  return data
}

const getAllVolunteers = async token => {
  const {data} = await Server.get('user/volunteers', {
    headers: {'token': token}
  })
  return data
}

// const getAllDistributions = async token => {
//   const {data} = await Server.get('distribution', {
//     headers: {'token': token}
//   })
//   return data
// }

// const getAllRecipients = async token => {
//   const {data} = await Server.get('recipient', {
//     headers: {'token': token}
//   })
//   return data
// }

// const getRecipientsByCity = (token, city) => {

// }

// const getDistributionsByAdmin = (token, email) => {

// }

// const createDistributions = async (recipients, token) => {

// }
const getAllPosts = async token => {
  const {data} = await Server.get('posts/', {
    headers: {'token': token}
  })
  return data
}
// const createPosts
// const updatePosts


const API = {
  userExists, register, login, getUser, validPoints, 
  getAllVolunteers,
  // getAllDistributions, getAllRecipients,
  // getRecipientsByCity, getDistributionsByAdmin,
  // createDistributions
  getAllPosts
}

export default API