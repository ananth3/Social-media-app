import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Cancel } from "@material-ui/icons";
import "./share.css";
import axios from "axios";

function Share(props) {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePic
                ? PF + user.profilePic
                : PF + "person/noAvatar.png"
            }
            alt=""
          ></img>
          <input
            className="shareInput"
            type="text"
            placeholder={`Whats in your mind ${user.username}?`}
            ref={desc}
          ></input>
        </div>
        <hr className="shareHr" />
        {/* {file && (
          <div className="shareImgcontainer">
            <Cancel
              className="CancelImg"
              onClick={() => setFile(null)}
            ></Cancel>
            <img
              className="shareImg"
              src={URL.createObjectURL(file)}
              alt=""
            ></img>
          </div>
        )} */}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <i className="material-icons tomato shareIcon">perm_media</i>
              <span className="shareOptionText">Photo/Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => setFile(e.target.files[0])}
              ></input>
            </label>
            <div className="shareOption">
              <i className="material-icons blue shareIcon">label</i>
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <i className="material-icons green shareIcon">room</i>
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <i className="material-icons goldenrod shareIcon">mood</i>
              <span className="shareOptionText">Feeling/Activity</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
