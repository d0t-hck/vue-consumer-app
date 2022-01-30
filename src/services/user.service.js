import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/auth/users/";

class UserService {
  getAllUsers() {
    return axios.get(API_URL, { headers: authHeader() });
  }
  getUserDetail(email) {
    return axios.get(API_URL + email, { headers: authHeader() });
  }
  deleteUser(email) {
    return axios.delete(API_URL + email, { headers: authHeader() });
  }
  editUser(email, data) {
    return axios.put(API_URL + email, data, { headers: authHeader() });
  }
}

export default new UserService();