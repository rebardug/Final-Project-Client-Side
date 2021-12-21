import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, email, password) {
    return axios.post(API_URL + "register", {
      name,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getTasks(CurrentUser) {
    return axios.post(API_URL + 'tasks', {
      CurrentUser
    })
    .then(response => {
      if (response.data.accessToken) {
      }
      return response.data;
    });
  }
  setTask(CurrentUser, description) {
    return axios.post(API_URL + "setTask", {
      CurrentUser,
      description
    });
  }
}
//getTasks
export default new AuthService();