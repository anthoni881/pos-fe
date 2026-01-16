import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [popUpLogin, setPopUpLogin] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleLogin = async () => {
    if (username && password) {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_ENDPOINT}/login?username=${username}&password=${password}`
        );

        if (data.code === 200) {
          localStorage.setItem("auth", JSON.stringify(data.data));
          navigate("/kasir");
          setPopUpLogin(false);
        } else {
          setPopUpLogin(true);
          setErrMsg(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setPopUpLogin(true);
      setErrMsg("Kolom Username & Password tidak boleh kosong!");
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    popUpLogin,
    setPopUpLogin,
    errMsg,
  };
};
