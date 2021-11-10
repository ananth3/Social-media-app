import Topbar from "../../components/topbar/Topbar";

import Feed from "../../components/feed/Feed";
import Righbar from "../../components/rightbar/Righbar";
import "./home.css";

function Home(props) {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        {/* <Sidebar /> */}
        <Feed />
        <Righbar />
      </div>
    </>
  );
}

export default Home;
