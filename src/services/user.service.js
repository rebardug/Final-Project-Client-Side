import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
  getStatisticsBoard(CurrentUser) {
    return axios.post(API_URL + 'stats', {
      CurrentUser
    })
    .then(response => {
      if (response.data.accessToken) {
      }
      return response.data;
    });
  }

  getUserBoard(CurrentUser) {
    return axios.post(API_URL + 'user', {
      CurrentUser
    })
    .then(response => {
      if (response.data.accessToken) {
      }

      return response.data;
    });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard(CurrentUser) {
    return axios.post(API_URL + "admin", {
      CurrentUser
    })
    .then(response => {
      if (response.data.accessToken) {
      }

      return response.data;
    });
  }

  changeAdmin(CurrentUser, email) {
    return axios.post(API_URL + "changePermission", {
      CurrentUser,
      email
    });
  }
  changePoints(currentUser, num, email) {
    return axios.post(API_URL + "changePermission", {
      currentUser, num, email
    });
  }
}

export default new UserService();