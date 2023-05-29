import axios from "axios";
const API_URL = "https://localhost:7146/api/Login";

class AuthService {
  //登入
  login(userName, userPassword) {
    return axios.post(API_URL, { userName, userPassword });
  }
  //登出
  logout() {
    sessionStorage.removeItem("user");
  }
  //註冊
  register(userName, userPassword) {
    return axios.post(API_URL + "/register", { userName, userPassword });
  }
  //讀取本地資料
  getUser() {
    return JSON.parse(sessionStorage.getItem("user"));
  }

  //取得驗證token
  token() {
    if (sessionStorage.getItem("user")) {
      return JSON.parse(sessionStorage.getItem("user")).jwt;
    } else {
      return "";
    }
  }
}

export default new AuthService();
