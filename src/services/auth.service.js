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

  getTasks(currentUser) {
    return axios.post(API_URL + 'tasks',{currentUser})
    .then(response => {
      if (response.data.accessToken) {
      }

      return response.data;
    });
  }
  setTask(description,CurrentUser) {
    return axios.post(API_URL + "setTask", {
      description,
      CurrentUser
    });
  }
}
//getTasks
export default new AuthService();