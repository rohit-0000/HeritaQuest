import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import OpenEye from "../assets/open-eye.svg";
import ClosedEye from "../assets/closed-eye.svg";
import { useNavigate, NavLink } from "react-router-dom";
import googleImg from "../assets/googleImg.svg";
import { useDispatch } from "react-redux";
import {
  getFBQuizHistory,
  getFBQuizLeaderboard,
  getLocationQuizHistory,
  getLocationQuizLeaderboard,
  getUserDetail,
  loginUser,
} from "../Reducer/slice";
import GoogleLoginButton from "./GoogleLoginButton";

const Login = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleTogglePassword(field) {
    const pass = document.getElementById(`${field}-password`);
    const open = document.getElementById(`${field}-openEye`);
    const close = document.getElementById(`${field}-closedEye`);

    if (pass.type === "password") {
      pass.type = "text";
      open.style.display = "none";
      close.style.display = "block";
    } else {
      pass.type = "password";
      open.style.display = "block";
      close.style.display = "none";
    }
  }

  async function handleSignin(data) {
    const response = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(response)) {
      dispatch(getUserDetail());
      dispatch(getLocationQuizLeaderboard());
      dispatch(getLocationQuizHistory());
      dispatch(getFBQuizLeaderboard());
      dispatch(getFBQuizHistory());
      navigate("/");
      if (props?.setShowLogin) {
        props.setShowLogin(false);
      }
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-300">
      <div className=" md:px-10 md:py-10 flex flex-col items-center justify-center gap-5 w-full md:w-fit h-full md:h-fit bg-white">
        <h1 className="text-3xl ">Sign In</h1>
        <form
          onSubmit={handleSubmit(handleSignin)}
          className="flex flex-col items-center gap-2"
        >
          <div>
            <input
              type="text"
              placeholder="Username or E-mail"
              className="border border-gray-500 text-black pl-3 text-2sm w-[310px] py-2 md:text-xl md:w-[350px] outline-0 rounded-md"
              {...register("username", {
                required: "Enter Username or E-mail",
              })}
            />
            {errors.username && (
              <p className="text-red-500 italic">{errors.username.message}</p>
            )}
          </div>

          <div>
            <div className="w-[310px] md:w-[350px] border border-gray-500 flex pr-2 rounded-md">
              <input
                type="password"
                placeholder="Password"
                className="text-black pl-3 pr-1 text-2sm w-[310px] py-2 md:text-xl md:w-[350px] outline-0"
                id="password-password"
                {...register("password", {
                  required: "Enter password",
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,16}$/,
                    message:
                      "Password must be 8-16 characters long, with uppercase, lowercase, digits, and special characters.",
                  },
                })}
              />
              <img
                src={OpenEye}
                id="password-openEye"
                className="w-[25px] md:w-[30px] lg:w-[35px] cursor-pointer"
                onClick={() => handleTogglePassword("password")}
              />
              <img
                src={ClosedEye}
                id="password-closedEye"
                className="w-[25px] md:w-[30px] lg:w-[35px] cursor-pointer hidden"
                onClick={() => handleTogglePassword("password")}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 italic w-[250px] md:w-[350px] lg:w-[550px]">
                {errors.password.message}
              </p>
            )}
          </div>
          <NavLink to="/forgotPass" className="self-start text-blue-800">
            Forgot Password?
          </NavLink>
          <input
            type="submit"
            value={isSubmitting ? "Signing In " : "Sign In"}
            disabled={isSubmitting}
            className="bg-slate-700 text-white w-full px-2 py-2 rounded text-xl active:scale-90 transition-all duration-300"
          />
        </form>
        <div className="flex flex-col gap-1 items-center">
          <div className="flex gap-2">
            <p className="text-gray-600/60">Don't have an account?</p>
            <NavLink to="/signup" className="text-blue-800">
              Sign Up
            </NavLink>
          </div>

          <p className="text-gray-600/60">or</p>
          <GoogleLoginButton/>
        </div>
      </div>
    </div>
  );
};

export default Login;
