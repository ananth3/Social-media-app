import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Righbar from "../../components/rightbar/Righbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

function Profile(props) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  return (
    <>
      <Topbar />
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPic ? PF + user.coverPic : PF + "person/noCover.jpg"
                }
                alt=""
              ></img>
              <img
                className="profileUserImg"
                src={
                  user.profilePic
                    ? PF + user.profilePic
                    : PF + "person/noAvatar.png"
                }
                alt=""
              ></img>
            </div>
            <div className="profileInfo">
              <span className="profileInfoName">{user.username}</span>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Righbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
