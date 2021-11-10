import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

function Login(props) {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Instasocial</h3>
          <span className="loginDesc">
            Connect with Friends and world around you on Instasocial
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              ref={email}
              required
            ></input>
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              minLength="8"
              ref={password}
              required
            ></input>
            <button className="loginButton">
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forget Password?</span>
            <p className="loginRegister">
              Don't have an account?{" "}
              <Link to="/register" style={{ textDecoration: "inherit" }}>
                <span className="loginRegisterLink">Sign up</span>{" "}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
