import React, { useState, useEffect } from "react";
import StudentService from "../services/StudentService";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const student = ({ user, setUser }) => {
  //宣告
  const navigate = useNavigate();
  //設置變數
  let [studentId, setStudentId] = useState("");
  let [studentName, setStudentName] = useState("");
  let [studentAge, setStudentAge] = useState("");
  let [studentAddress, setStudentAddress] = useState("");
  let [classId, setClassId] = useState("");
  let [studentList, setStudentList] = useState([]);
  let [tableData, setTableData] = useState(""); //取得表的資料
  let [classList, setClassList] = useState([]);
  let [mode, setMode] = useState("");
  //set變數事件
  const handleStudentId = (e) => {
    setStudentId(e.target.value);
  };
  const handleStudentName = (e) => {
    setStudentName(e.target.value);
  };
  const handleSetStudentAge = (e) => {
    setStudentAge(e.target.value);
  };
  const handleSetStudentAddress = (e) => {
    setStudentAddress(e.target.value);
  };
  const handleSetClassId = (e) => {
    setClassId(e.target.value);
  };
  //清除輸入
  const clearAll = () => {
    setStudentId("");
    setStudentName("");
    setStudentAge("");
    setStudentAddress("");
    setClassId("");
  };
  //獲取table資料
  const getTableData = (data) => {
    console.log(data);
    setTableData(data);
  };
  //選取table更變顏色
  const changeColor = (e) => {
    if (e.studentId == tableData.studentId) {
      return "orange";
    } else {
      return null;
    }
  };
  //修改時將將原資料填入
  const getEditItem = () => {
    setStudentId(tableData.studentId);
    setStudentName(tableData.studentName);
    setStudentAge(tableData.studentAge);
    setStudentAddress(tableData.studentAddress);
    setClassId(tableData.classId);
    setMode(1);
  };
  const getAddItem = () => {
    setMode(0);
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
      });
  };
  //http請求事件(新增或修改)
  const addOrEdit = (e) => {
    if (mode == 0) {
      StudentService.addStudent(
        studentName,
        studentAge,
        studentAddress,
        classId
      )
        .then((res) => {
          console.log(res);
          clearAll();
          getStudent();
          window.alert("新增成功");
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else if (mode == 1) {
      StudentService.editStudent(
        studentId,
        studentName,
        studentAge,
        studentAddress,
        classId
      )
        .then((res) => {
          console.log(res);
          clearAll();
          getStudent();
          window.alert("修改成功");
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };
  //http 刪除
  const delStudent = () => {
    console.log(tableData.studentId);
    let respond = window.confirm("確定要刪除嗎");
    if (respond) {
      StudentService.delStudent(tableData.studentId)
        .then((res) => {
          console.log(res);
          clearAll();
          getStudent();
          window.alert("刪除成功");
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else {
    }
  };
  //1.初始執行
  useEffect(() => {
    if (!user) {
      window.alert("請先登入，將導向到首頁");
      navigate("/");
    }
    getStudent();
  }, []);
  //分頁相關
  const [currentPage, setCurrentPage] = useState(1); //當前分頁變數
  const [postsPerPage, setPostsPerPage] = useState(10); //每頁顯示數量
  const lastPostIndex = currentPage * postsPerPage; //當頁最後一筆index
  const firstPostIndex = lastPostIndex - postsPerPage; //當頁第一筆index
  const currentPosts = studentList.slice(firstPostIndex, lastPostIndex); //當頁顯示資料
  //顯示網頁
  return (
    <div className="page">
      {/* <!-- The Modal --> */}
      <div className="modal" id="myModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">
                {mode == 0 ? "新增學生" : "修改學生"}
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={clearAll}
              ></button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text" hidden={true}>
                  id
                </span>
                <input
                  onChange={handleStudentId}
                  type="text"
                  className="form-control"
                  hidden={true}
                />
                <span className="input-group-text">姓名</span>
                <input
                  value={studentName}
                  onChange={handleStudentName}
                  type="text"
                  className="form-control"
                />
                <span className="input-group-text">年齡</span>
                <input
                  value={studentAge}
                  onChange={handleSetStudentAge}
                  type="text"
                  className="form-control"
                />
                <span className="input-group-text">班級</span>
                <select
                  onChange={handleSetClassId}
                  value={classId}
                  className="form-select"
                >
                  <option value={null}></option>
                  {classList.map((data, index) => (
                    //設定key值才不會有錯誤訊息(不影響使用)
                    <option key={index} value={data.classId}>
                      {data.className}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">住址</span>
                <input
                  value={studentAddress}
                  onChange={handleSetStudentAddress}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={addOrEdit}
              >
                確認
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={clearAll}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------------------- */}
      <div className="studentpage">
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#myModal"
            onClick={(getAddItem, clearAll)}
          >
            <i className="fa-solid fa-plus">
              <br />
              新增
            </i>
          </button>
          <button
            type="button"
            className={!tableData ? "btn btn-secondary" : "btn btn-warning"}
            data-bs-toggle="modal"
            data-bs-target="#myModal"
            disabled={!tableData}
            onClick={getEditItem}
          >
            <i className="fa-solid fa-pen-to-square">
              <br />
              修改
            </i>
          </button>
          <button
            type="button"
            className={!tableData ? "btn btn-secondary" : "btn btn-danger"}
            disabled={!tableData}
            onClick={delStudent}
          >
            <i className="fa-solid fa-trash">
              <br />
              刪除
            </i>
          </button>
        </div>

        <div className="studentTable">
          <table className="table table-primary">
            <thead className="table-dark">
              <tr>
                <td>ID</td>
                <td>姓名</td>
                <td>年齡</td>
                <td>住址</td>
                <td>班級</td>
              </tr>
            </thead>
            <tbody>
              {/* 改成輸出分頁時的list */}
              {currentPosts.map((data) => (
                //設定key值才不會有錯誤訊息(不影響使用)
                <tr
                  key={data.studentId}
                  //一定要寫成arrow function
                  onClick={() => getTableData(data)}
                >
                  <td style={{ backgroundColor: changeColor(data) }}>
                    {data.studentId}
                  </td>
                  <td style={{ backgroundColor: changeColor(data) }}>
                    {data.studentName}
                  </td>
                  <td style={{ backgroundColor: changeColor(data) }}>
                    {data.studentAge}
                  </td>
                  <td style={{ backgroundColor: changeColor(data) }}>
                    {data.studentAddress}
                  </td>
                  <td style={{ backgroundColor: changeColor(data) }}>
                    {data.className}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* 建立分頁 */}
        <Pagination
          totalPosts={studentList.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default student;
