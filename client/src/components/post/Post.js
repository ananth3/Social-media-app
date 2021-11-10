import "./post.css";
import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Post({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);
  const [isliked, setIsLiked] = useState(false);
  const [comment, setComment] = useState(post.comments.length);
  const [commentClick, setCommentClick] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const text = useRef();

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      await axios.put("/posts/" + post._id + "/like/", {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isliked ? like - 1 : like + 1);
    setIsLiked(!isliked);
  };

  const commentChange = () => {
    setCommentClick(!commentClick);
  };

  const commentHandler = async (e) => {
    try {
      // e.preventDefault();
      const newComment = {
        text: text.current.value,
        postedBy: currentUser.username,
      };
      await axios.put("/posts/" + post._id + "/comment/", newComment);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async () => {
    try {
      await axios.delete("/posts/" + post._id, { userId: currentUser._id });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePic
                    ? PF + user.profilePic
                    : PF + "person/noAvatar.png"
                }
                alt=""
              ></img>
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            {user._id === currentUser._id && (
              <i className="material-icons deleteIcon" onClick={deleteHandler}>
                delete
              </i>
            )}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt=""></img>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {/* <img className="likeImg" src="/assets/like.jpg"></img> */}
            <i className="material-icons likeIcon" onClick={likeHandler}>
              favorite_border
            </i>
            <span className="postLikeCounter">{like}</span>
            <i className="material-icons commentIcon" onClick={commentChange}>
              chat_bubble_outline
            </i>
            <span className="postCommentCounter">{comment} </span>
          </div>
          {commentClick && (
            <div>
              <input
                className="commentBox"
                type="text"
                placeholder="Add a comment..."
                ref={text}
                required
              ></input>
              <button className="commentPostButton" onClick={commentHandler}>
                Post
              </button>
            </div>
          )}
          {post.comments.map((comment) => {
            return (
              <div className="postCommentSection">
                <div className="postComment">
                  <span className="commentPostedBy">{comment.postedBy}</span>
                  <span className="commentText">{comment.text}</span>
                </div>
              </div>
            );
          })}

          {/* <div className="postBottomRight"></div> */}
        </div>
      </div>
    </div>
  );
}

export default Post;
