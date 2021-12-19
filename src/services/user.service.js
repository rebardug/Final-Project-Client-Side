import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
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
}

export default new UserService();