import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router";
import "./register.css";
import { Link } from "react-router-dom";

function Register(props) {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const rePassword = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (rePassword.current.value !== password.current.value) {
      rePassword.current.setCustomValidity("Passwords didn't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
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
          <form className="registerBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              className="loginInput"
              ref={username}
              required
            ></input>
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
            <input
              type="password"
              placeholder="Re-enter Password"
              className="loginInput"
              ref={rePassword}
              required
            ></input>
            <button className="registerButton" type="submit">
              Sign In
            </button>
            <p className="registerLogin">
              Have an account?{" "}
              <Link to="/login" style={{ textDecoration: "inherit" }}>
                <span className="loginLink">Log in</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
