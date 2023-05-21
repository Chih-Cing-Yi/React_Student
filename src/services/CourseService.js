import axios from "axios";
const API_URL = "https://localhost:7146/api/Course";
import AuthService from "./AuthService";

class CourseService {
  //取得全課程
  getCourse() {
    //驗證token
    let token;
    token = AuthService.token();
    //發送http
    return axios.get(API_URL, {
      headers: {
        Authorization: token,
      },
    });
  }

  //取得修課人員
  getCourse_D(courseId) {
    //驗證token
    let token;
    token = AuthService.token();
    //發送http
    return axios.get(API_URL + "/" + courseId, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new CourseService();
