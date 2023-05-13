import React, { useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const register = () => {
  //宣告
  const navigate = useNavigate();
  //設定變數
  let [userName, setUserName] = useState("");
  let [userPassword, setUserPassword] = useState("");
  //set變數事件
  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleUserPassword = (e) => {
    setUserPassword(e.target.value);
  };
  //http請求事件
  const addUser = (e) => {
    if (!userName && !userPassword) {
      window.alert("請輸入帳號密碼");
    }
    AuthService.register(userName, userPassword)
      .then((res) => {
        console.log(res);
        window.alert("註冊成功，將導向到登入頁面");
        navigate("/login");
      })
      .catch((e) => {
        console.log(e.message);
        window.alert("註冊失敗，請聯絡管理人員");
      });
  };

  return (
    <div className="page">
      <div className="registerPage">
        <label>帳號</label>
        <input onChange={handleUserName} className="form-control" type="text" />
        <label>密碼</label>
        <input
          onChange={handleUserPassword}
          className="form-control"
          type="password"
        />
        <br />
        <div>
          <button onClick={addUser} className="btn btn-primary btn-lg">
            註冊
          </button>
        </div>
      </div>
    </div>
  );
};

export default register;
