import React, { useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const login = ({ user, setUser }) => {
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
  //http請求
  const loginUser = async () => {
    try {
      let response = await AuthService.login(userName, userPassword);
      sessionStorage.setItem("user", JSON.stringify(response.data));
      window.alert("登入成功，將導向到首頁");
      setUser(AuthService.getUser());
      navigate("/");
    } catch (e) {
      console.log(e.message);
      window.alert("帳號密碼錯誤");
    }
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
          <button onClick={loginUser} className="btn btn-primary btn-lg">
            登入
          </button>
        </div>
      </div>
    </div>
  );
};

export default login;
