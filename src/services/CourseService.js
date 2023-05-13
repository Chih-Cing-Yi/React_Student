import axios from "axios";
const API_URL = "https://localhost:7146/api/Course";

class CourseService {
  //取得全課程
  getCourse() {
    return axios.get(API_URL);
  }

  //取得修課人員
  getCourse_D(courseId) {
    return axios.get(API_URL + "/" + courseId);
  }
}

export default new CourseService();
