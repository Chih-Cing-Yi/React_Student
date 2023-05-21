import axios from "axios";
const API_URL = "https://localhost:7146/api/Student";
import AuthService from "./AuthService";
//axios.defaults.headers["X-Reqyested-With"] = "XNLHttpRequest"; //異步請求
//axios.defaults.headers.post["Content-Type"] = "application/json"; //預設josn格式

class StudentService {
  //取得全學生
  getStudent() {
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
  //新增學生
  addStudent(studentName, studentAge, studentAddress, classId) {
    //驗證token
    let token;
    token = AuthService.token();
    //發送http
    return axios.post(
      API_URL,
      {
        studentName,
        studentAge,
        studentAddress,
        classId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  //修改學生
  editStudent(studentId, studentName, studentAge, studentAddress, classId) {
    //驗證token
    let token;
    token = AuthService.token();
    //發送HTTP
    return axios.put(
      API_URL,
      {
        studentId,
        studentName,
        studentAge,
        studentAddress,
        classId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  //刪除學生
  delStudent(studentId) {
    //驗證token
    let token;
    token = AuthService.token();
    //發送HTTP
    return axios.delete(API_URL + "/" + studentId, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new StudentService();
