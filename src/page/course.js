import React, { useState, useEffect } from "react";
import CourseService from "../services/CourseService";
import { useNavigate } from "react-router-dom";

const course = ({ user, setUser }) => {
  //宣告
  const navigate = useNavigate();
  let [courseList, setCourseList] = useState([]);
  let [tableData, setTableData] = useState(""); //取得表的資料
  let [courseStudent, setCourseStudent] = useState([]); //修課人員

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
  //1.初始執行
  useEffect(() => {
    if (!user) {
      window.alert("請先登入，將導向到首頁");
      navigate("/");
    }
    getCourse();
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
        <div>
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
