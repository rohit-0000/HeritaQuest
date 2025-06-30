import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import OpenEye from "../assets/open-eye.svg";
import ClosedEye from "../assets/closed-eye.svg";
import { NavLink, useNavigate } from "react-router-dom";
import googleImg from "../assets/googleImg.svg";
import { useDispatch } from "react-redux";
import { createUser, sendEmail } from "../Reducer/slice";
import GoogleLoginButton from "./GoogleLoginButton";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [curr, setCurr] = useState(0);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const navigate = useNavigate();
  const [timer, setTimer] = useState(30);

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

  async function handleSignup(data) {
    setUserData(data);
    const generateOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const emailData = {
      to: data.email,
      subject: "Email verification from Herita Quest",
      body: `Dear ${data.name},

        Your Herita Quest verification code is:

        ${generateOtp}

        Please enter this code in the app or on the website to verify your email address.

        If you did not request this verification, you can safely ignore this email. For any assistance, feel free to contact our support team at [rohitcollege212004@gmail.com].

        Best regards,  
        The Herita Quest Team
`,
    };
    setGeneratedOtp(generateOtp);
    dispatch(sendEmail(emailData));
    setCurr(1);
  }
  async function handleVerifyOTP() {
    if (otp.join("") === generatedOtp) {
      const response = await dispatch(createUser(userData));
      if (createUser.fulfilled.match(response)) {
        navigate("/");
      }
      setCurr(0);
    } else {
      toast.error("Incorrect OTP");
      setOtp(new Array(6).fill(""));
    }
  }
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((Timer) => Timer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);
  async function handleResendOTP() {
    const generateOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(generateOtp);

    const emailData = {
      to: email,
      subject: "Email verification from Herita Quest",
      body: `Dear ${name},
    
            Your Herita Quest verification code is:
    
            ${generateOtp}
    
            Please enter this code in the app or on the website to verify your email address.
    
            If you did not request this verification, you can safely ignore this email. For any assistance, feel free to contact our support team at [rohitcollege212004@gmail.com].
    
            Best regards,  
            The Herita Quest Team
    `,
    };
    setTimer(30);
    await dispatch(sendEmail(emailData));
  }
    const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      e.target.previousSibling?.focus();
    }
  };
    const handleInputChange = (e, index) => {
    const value = e.target.value;
    // Allow only numeric input
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp]; //copy
    newOtp[index] = value;

    setOtp(newOtp);

    // Move focus to the next input if the current one is filled
    if (value && index < otp.length - 1) {
      e.target.nextSibling?.focus();
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-300">
      {curr == 0 && (
        <div className=" md:px-10 md:py-10 flex flex-col items-center justify-center gap-5 w-full md:w-fit h-full bg-white">
          <h1 className="text-3xl ">Signup</h1>
          <form
            onSubmit={handleSubmit(handleSignup)}
            className="flex flex-col items-center gap-2"
          >
            <div>
              <input
                type="text"
                placeholder="Name"
                className="border border-gray-500 text-black pl-3 text-2sm w-[310px] py-2 md:text-xl md:w-[350px] outline-0 rounded-md"
                {...register("name", {
                  required: "Enter name",
                  minLength: {
                    value: 4,
                    message: "Length must be 4-12 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]{3,12}$/,
                    message: "Name must be 3-12 letters long",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 italic">{errors.name.message}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Username"
                className="border border-gray-500 text-black pl-3 text-2sm w-[310px] py-2 md:text-xl md:w-[350px] outline-0 rounded-md"
                {...register("username", {
                  required: "Enter Username",
                  minLength: {
                    value: 4,
                    message: "Length must be 4-12 characters",
                  }
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
                        "Password must be 6-16 characters long, with uppercase, lowercase, digits, and special characters.",
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

            <div>
              <div className="w-[310px] md:w-[350px] border border-gray-500 flex pr-2 rounded-md">
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="text-black pl-3 pr-1 text-2sm w-[310px] py-2 md:text-xl md:w-[350px] outline-0"
                  id="confirm-password"
                  {...register("confirmPassword", {
                    required: "Enter Current password",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Password do not match",
                  })}
                />
                <img
                  src={OpenEye}
                  id="confirm-openEye"
                  className="w-[25px] md:w-[30px] lg:w-[35px] cursor-pointer"
                  onClick={() => handleTogglePassword("confirm")}
                />
                <img
                  src={ClosedEye}
                  id="confirm-closedEye"
                  className="w-[25px] md:w-[30px] lg:w-[35px] cursor-pointer hidden"
                  onClick={() => handleTogglePassword("confirm")}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 italic w-[250px] md:w-[350px] lg:w-[550px]">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="E-mail address"
                className="border border-gray-500 text-black pl-3 text-2sm w-[310px] py-2 md:text-xl md:w-[350px]  outline-0 rounded-md"
                {...register("email", {
                  required: "Enter email id",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email id",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 italic">{errors.email.message}</p>
              )}
            </div>
            <input
              type="submit"
              value={isSubmitting ? "Creating account" : "Sign Up"}
              disabled={isSubmitting}
              className="bg-slate-700 text-white w-full px-2 py-2 rounded text-xl cursor-pointer active:scale-90 transition-all duration-300"
            />
          </form>
          <div className="flex flex-col gap-1 items-center">
            <div className="flex gap-2">
              <p className="text-gray-600/60">Have an account?</p>
              <NavLink to="/signin" className="text-blue-800">
                Sign In
              </NavLink>
            </div>

            <p className="text-gray-600/60">or</p>
            <GoogleLoginButton/>
          </div>
        </div>
      )}
      {/* OTP Verification */}
      {curr == 1 && (
        <div className="px-10 py-10 flex flex-col items-center justify-center gap-5 max-w-full h-fit bg-white border rounded-2xl">
          <h1 className="text-3xl self-start">Email Verification</h1>
          <p className="border border-yellow-500 text-black/70 px-3 text-2sm w-[300px] py-2 md:w-[350px] outline-0 rounded-md bg-yellow-200/50">
            A 6 digit email OTP was sent to {userData.email}. Enter that code
            here to proceed.
          </p>

          <div className="flex gap-2 justify-center">
            {otp.map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={otp[index]}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                placeholder="0"
                className="border-b-2 border-black aspect-square w-10 md:w-20 text-center text-xl md:text-3xl font-bold outline-0"
              />
            ))}
          </div>
          {timer === 0 ? (
            <div className="flex gap-2 items-center">
              <p>Didn't receive code?</p>
              <button
                type="button"
                className="text-green-600 text-xl cursor-pointer hover:text-amber-900 active:scale-95 transition-transform duration-150"
                onClick={handleResendOTP}
              >
                Resend
              </button>
            </div>
          ) : (
            <p>Resend OTP in {timer} sec</p>
          )}
          <button
            className="bg-green-600 text-white w-full px-2 py-2 rounded cursor-pointer active:scale-90 transition-all duration-200 text-xl"
            onClick={handleVerifyOTP}
          >
            Verify
          </button>
        </div>
      )}
    </div>
  );
};

export default Signup;
