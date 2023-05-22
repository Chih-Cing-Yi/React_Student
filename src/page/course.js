import React, { useState, useEffect } from "react";
import CourseService from "../services/CourseService";
import { useNavigate } from "react-router-dom";
import StudentService from "../services/StudentService";

const course = ({ user, setUser }) => {
  //宣告
  const navigate = useNavigate();
  let [courseList, setCourseList] = useState([]);
  let [tableData, setTableData] = useState(""); //取得主表的資料
  let [courseStudent, setCourseStudent] = useState([]); //修課人員
  let [studentList, setStudentList] = useState([]); //學生列表
  let [studentId, setStudentId] = useState("");
  //set變數事件
  const handleStudentId = (e) => {
    setStudentId(e.target.value);
  };
  //獲取table資料
  const getTableData = (data) => {
    console.log(data);
    setTableData(data);
    getCourse2(data.courseId);
  };
  //選取table更變顏色
  const changeColor = (e) => {
    if (e.courseId == tableData.courseId) {
      return "orange";
    } else {
      return null;
    }
  };
  //http請求事件(獲取課程列表)
  const getCourse = () => {
    CourseService.getCourse()
      .then((res) => {
        setCourseList(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  //http請求事件(獲取修課學生)
  const getCourse2 = (data) => {
    CourseService.getCourse_D(data)
      .then((res) => {
        setCourseStudent(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  //http請求事件(獲取學生列表) //並寫入到classList
  const getStudent = () => {
    StudentService.getStudent()
      .then((res) => {
        setStudentList(res.data);
        //篩選班級表 放入select選項
        const set = new Set();
        const result = res.data.filter((item) =>
          !set.has(item.classId) ? set.add(item.classId) : false
        );
        setClassList(result);
      })
      .catch((e) => {
        console.log(e.message);
        // setMessage("表單獲取失敗，請聯絡維護人員");
        // setMessageType("alert alert-danger alert-dismissible");
      });
  };
  //http請求事件(新增修課學生)
  const AddCourse_D = (e) => {
    if (!tableData.courseId && !studentId) {
      window.alert("請輸入帳號密碼");
    }
    let courseId = tableData.courseId;
    CourseService.AddCourse_D(courseId, studentId)
      .then((res) => {
        console.log(res);
        window.alert("新增成功");
        getCourse2(data.courseId);
      })
      .catch((e) => {
        console.log(e.message);
        window.alert("新增失敗，請聯絡管理人員");
      });
  };
  //1.初始執行
  useEffect(() => {
    if (!user) {
      window.alert("請先登入，將導向到首頁");
      navigate("/");
    }
    getCourse();
    getStudent();
  }, []);
  return (
    <div className="course">
      <div className="course_m">
        {/* 主表 */}
        <div>
          <table className="table table-primary">
            <thead className="table-dark">
              <tr>
                <td>課程編號</td>
                <td>課程名稱</td>
                <td>授課教師</td>
              </tr>
            </thead>
            <tbody>
              {courseList.map((data) => (
                <tr
                  key={data.courseId}
                  //一定要寫成arrow function
                  onClick={() => getTableData(data)}
                >
                  <td style={{ backgroundColor: changeColor(data) }}>
                    {data.courseId}
                  </td>
                  <td style={{ backgroundColor: changeColor(data) }}>
                    {data.courseName}
                  </td>
                  <td style={{ backgroundColor: changeColor(data) }}>
                    {data.instructor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* 明細表 */}
      <div className="course_d">
        <div className="tableStudent">
          {/* 新增選項 */}
          <div className="addStudent">
            <select
              className="form-select"
              onChange={handleStudentId}
              value={studentId}
            >
              <option value={null}></option>
              {studentList.map((data) => (
                //設定key值才不會有錯誤訊息(不影響使用)
                <option key={data.studentId} value={data.studentId}>
                  編號:{data.studentId}
                  &nbsp;
                  {data.className}
                  &nbsp;
                  {data.studentName}
                </option>
              ))}
            </select>
            <button className="btn btn-primary" onClick={AddCourse_D}>
              加入
            </button>
          </div>
          {/* 表單 */}
          <table className="table table-primary">
            <thead className="table-dark">
              <tr>
                <td>學生編號</td>
                <td>學生名稱</td>
              </tr>
            </thead>
            <tbody>
              {courseStudent.map((data, index) => (
                <tr key={index}>
                  <td>{data.studentId}</td>
                  <td>{data.studentName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default course;
