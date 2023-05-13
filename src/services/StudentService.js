import axios from "axios";
const API_URL = "https://localhost:7146/api/Student";
//axios.defaults.headers["X-Reqyested-With"] = "XNLHttpRequest"; //異步請求
//axios.defaults.headers.post["Content-Type"] = "application/json"; //預設josn格式

class StudentService {
  //取得全學生
  getStudent() {
    return axios.get(API_URL);
  }
  //新增學生
  addStudent(studentName, studentAge, studentAddress, classId) {
    return axios.post(API_URL, {
      studentName,
      studentAge,
      studentAddress,
      classId,
    });
  }
  //修改學生
  editStudent(studentId, studentName, studentAge, studentAddress, classId) {
    return axios.put(API_URL, {
      studentId,
      studentName,
      studentAge,
      studentAddress,
      classId,
    });
  }
  //刪除學生
  delStudent(studentId) {
    return axios.delete(API_URL + "/" + studentId, {});
  }
}

export default new StudentService();
