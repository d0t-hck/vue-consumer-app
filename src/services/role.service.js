import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/auth/roles";

class RoleService {
  getAllRoles() {
    return axios.get(API_URL, { headers: authHeader() });
  }
  getRoleDetail(id) {
    return axios.get(API_URL + '/' + id, { headers: authHeader() });
  }
  deleteRole(id) {
    return axios.delete(API_URL + '/' + id, {headers: authHeader() });
  }
  editRole(id, data) {
    return axios.put(API_URL + '/' + id, data, { headers: authHeader() });
  }
  createRole(data) {
      return axios.post(API_URL, data, {headers: authHeader()});
  }
}

export default new RoleService();