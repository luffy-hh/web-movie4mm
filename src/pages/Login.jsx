import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./login.scss";
import { useNavigate } from "react-router-dom";

import {
  login,
  selectLoginStatus,
  selectUser,
} from "../app/UserSlice/UserSlice";
import Loader from "../components/Loader/Loader";
import Notification from "../components/Notification";
import { toast } from "react-toastify";
import CustomInput from "../components/Inputs/CustomInput";

const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const currentUser = useSelector(selectUser);
  const loginMsg = useSelector((state) => state.user.loginMsg);
  const loginStatus = useSelector(selectLoginStatus);
  // const loading = useSelector(selectLoginLoading);
  // console.log(error);
  const loginHandle = (e) => {
    e.preventDefault();
    const values = { username: email, password: password };
    dispatch(
      login({
        api: "/login",
        userData: values,
      }),
    );
  };

  useEffect(() => {
    loginStatus === "fail" &&
      toast.error(loginMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    loginStatus === "success" && nav("/");
  }, [loginStatus]);

  useEffect(() => {
    if (currentUser) nav("/");
  }, [currentUser]);
  return (
    <div className="login h-[100vh] w-full bg-gradient-to-br from-[#36D1DC] to-[#5B86E5]">
      <Loader spin={loginStatus === "loading"} fullscreen />
      <Notification />
      <div className=" box flex w-[70%] h-[80%] rounded-2xl overflow-hidden">
        <div
          className="left md:w-[50%] bg-[url(/imgs/login_info.png)]"
          style={{
            backgroundSize: "100% 100%",
          }}
        ></div>
        <div className="right w-full mx-auto md:w-[50%] flex flex-col justify-center items-center ">
          <div className="logo w-[26rem] h-[13rem] mt-8 mx-auto">
            <img src="/imgs/logo.png" alt="logo" />
          </div>
          <h4 className="box-form--title mt-8">Sign in to start Watching.</h4>
          <form className="box-form mt-10 mx-auto" onSubmit={loginHandle}>
            <CustomInput
              placeholder={"Site Code (or) Email"}
              type="text"
              id="loginId"
              required={true}
              className={"w-[20rem] mx-auto rounded-sm"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CustomInput
              placeholder={"Password"}
              type="password"
              id="password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
              className={" w-[20rem] mx-auto rounded-sm"}
            />
            <div className="box-form--btn flex flex-wrap xxs:gap-4">
              {/* <label htmlFor="remember">
                <input type="checkbox" name="remember" id="remember" />
                Remember Me
              </label> */}
              <button
                type="Submit"
                className="btn rounded-sm login-btn w-[6.5rem] mx-auto text-lg"
              >
                Login
              </button>
              {/* <CustomButton
      click={() => loginHandle()}
      text="submit"
      className="btn login-btn"
    /> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
