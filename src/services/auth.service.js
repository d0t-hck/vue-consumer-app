import axios from "axios";

const API_URL = "http://localhost:8000/auth/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "authorize", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "users", {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
    });
  }
}

export default new AuthService();
