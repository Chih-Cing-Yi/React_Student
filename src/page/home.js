import { Link } from "react-router-dom";
import image from "../pic/homePic.jpeg";

const home = () => {
  return (
    <div className="page">
      <div className="homePic">
        <div
          className="outer"
          style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="inner">
          <h1>歡迎使用</h1>
          <h1>學生管理系統</h1>
          <Link to="/register" className="btn btn-primary btn-lg">
            註冊用戶
          </Link>
        </div>
      </div>
    </div>
  );
};

export default home;
