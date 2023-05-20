import { useContext, useState } from "react";
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { postData } from "../../services/postData";
import axios from "axios";
import "./Login.css";
function Login() {
  const { user, loading, error, dispatch, OPTION_LOGIN } =
    useContext(AuthContext);
    const navigate=useNavigate()
  const handledSubmit = async (e) => {
    e.preventDefault();
    const fields = new window.FormData(e.target);
    const username = fields.get("username");
    const password = fields.get("password");
    console.log(username);
    dispatch({ type: OPTION_LOGIN.start });

    try {
      // const resData = await postData("auth/login", { username, password });
      // console.log(resData)
      const res = await axios.post(`auth/login`, { username, password });
      dispatch({ type: OPTION_LOGIN.success, payload: res.data });
      navigate('/')
    } catch (e) {
      dispatch({ type: OPTION_LOGIN.error, payload: e.response.data });
    }
  };
  return (
    <div className="login">
      <form className="lContainer" onSubmit={handledSubmit}>
        <input
          type="text"
          placeholder="username"
          name="username"
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          className="lInput"
        />
        <button  className="lButton">Login</button>
        {error && <span>{error.message}</span>}
      </form>
    </div>
  );
}
export default Login;
