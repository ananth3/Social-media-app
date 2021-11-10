import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Topbar(props) {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const logoutFunction = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Instasocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <i className="material-icons">search</i>
          <input placeholder="Search" className="searchInput"></input>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <i className="material-icons icon-black">home</i>
          </div>
          <div className="topbarIconItem">
            <i className="material-icons icon-black">person</i>
            <span className="topbarIconBadge"> 1</span>
          </div>
          <div className="topbarIconItem">
            <i className="material-icons icon-black">chat</i>
            <span className="topbarIconBadge"> 2</span>
          </div>
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePic
                  ? PF + user.profilePic
                  : PF + "/person/noAvatar.png"
              }
              alt=""
              className="topbarImg"
            ></img>
          </Link>
          <span className="logout" onClick={logoutFunction}>
            Logout
          </span>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
