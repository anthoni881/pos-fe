import React from "react";
import LoginImage from "../../Assets/login-image.png";
import "./login.css";
import { useLogin } from "./useLogin";
import PopUpComponent from "../../Components/PopUp/PopUpComponent";

const Login = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    popUpLogin,
    setPopUpLogin,
    errMsg,
  } = useLogin();
  console.log("hola");
  return (
    <div className="container_login" style={{ flexDirection: "column" }}>
      {popUpLogin ? (
        <PopUpComponent>
          <p>{errMsg}</p>
          <div className="wrapper_button_salah_popup">
            <button
              className="button_popup_login"
              onClick={() => setPopUpLogin(false)}
            >
              OK
            </button>
          </div>
        </PopUpComponent>
      ) : (
        ""
      )}
      <div style={{ display: "flex", width: "100%" }}>
        <div
          className="display-none-mobile"
          style={{ background: "#e97627", width: "50%", height: "100vh" }}
        >
          <div className="wrapper_logo_tim_login">
            <p style={{ fontSize: "24px" }}>Tenar</p>
          </div>
          <div className="wrapper_card_left_login">
            <div className="card_left_login"></div>
          </div>
        </div>
        <div className="wrapper_card_right">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <div className="card_login_right">
              <div className="wrapper-input-signin">
                <img
                  src={LoginImage}
                  alt="login image"
                  style={{ marginTop: "48px", filter: "hue-rotate(-130deg)" }}
                />
                <p>Sign In</p>
                <input
                  className="input_username_password"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      handleLogin();
                    }
                  }}
                />
                <input
                  className="input_username_password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      handleLogin();
                    }
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <button
                    className="button_signin"
                    onClick={() => handleLogin()}
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <></>
    </div>
  );
};

export default Login;
