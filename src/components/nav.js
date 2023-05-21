import { Link } from "react-router-dom";
import React from "react";
import AuthService from "../services/AuthService";

const nav = ({ user, setUser }) => {
  const Logout = () => {
    AuthService.logout(); //清空local storage
    window.alert("登出成功!現在您會被導向到首頁");
    setUser(null);
  };
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">首頁</Link>
          </li>
          {user && (
            <li>
              <Link to="/student">學生管理</Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/course">修課列表</Link>
            </li>
          )}
          {!user && (
            <li style={{ float: "right" }}>
              <Link to="/login">登入</Link>
            </li>
          )}
          {user && (
            <li style={{ float: "right" }}>
              <Link onClick={Logout} to="/">
                登出
              </Link>
            </li>
          )}
          {user && (
            <li style={{ float: "right" }}>
              <Link to="/">{user.userName}</Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default nav;
