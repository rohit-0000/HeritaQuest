import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import OpenEye from "../assets/open-eye.svg";
import ClosedEye from "../assets/closed-eye.svg";
import { useDispatch } from "react-redux";
import { changePassword, findUser, sendEmail } from "../Reducer/slice";
import toast from "react-hot-toast";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const [curr, setCurr] = useState(0);

  const [generatedOtp, setGeneratedOtp] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    getValues: getValues1,
    formState: { errors: errors1, isSubmitting: isSubmitting1 },
  } = useForm();
  async function handleFindUser(data, e) {
    e.preventDefault();
    const response = await dispatch(findUser(data));
    if (findUser.fulfilled.match(response)) {
      const generateOtp = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      const data = response.payload;
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
      dispatch(sendEmail(emailData));
      setGeneratedOtp(generateOtp);
      setEmail(response.payload.email);
      setName(response.payload.name);
      setCurr(1);
    }
  }

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((Timer) => Timer - 1); // Decrease timer by 1 every second
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [timer]);
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

  // Handle backspace key
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      e.target.previousSibling?.focus();
    }
  };

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
  function handleVerifyOTP() {
    if (otp.join("") === generatedOtp) {
      setCurr(2);
    } else {
      toast.error("Incorrect OTP");
      setOtp(new Array(6).fill(""));
    }
  }

  async function handleChangePass(data) {
    const user = { email: email, password: data.password };
    await dispatch(changePassword(user));
    setCurr(0);
  }
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-300 p-1">
      {/*find User  */}
      {curr === 0 && (
        <div className="px-10 py-10 flex flex-col items-center justify-center gap-5 max-w-full h-fit bg-white border rounded-2xl">
          <h1 className="text-3xl self-start">Password Reset</h1>
          <p className="border border-yellow-500 text-black/70 px-3 text-2sm w-[300px] py-2 md:w-[350px] outline-0 rounded-md bg-yellow-200/50">
            Forgotten your password? Enter your e-mail address below, and we'll
            send you an e-mail allowing you to reset it.
          </p>

          <form
            onSubmit={handleSubmit(handleFindUser)}
            className="flex flex-col items-center gap-2"
          >
            <div>
              <input
                type="text"
                placeholder="Username or E-mail"
                className="border border-gray-500 text-black pl-3 text-2sm w-[300px] py-2 md:text-xl md:w-[350px] outline-0 rounded-md"
                {...register("username", {
                  required: "Enter Username",
                })}
              />
              {errors.username && (
                <p className="text-red-500 italic">{errors.username.message}</p>
              )}
            </div>
            <input
              type="submit"
              value="Reset My Password"
              disabled={isSubmitting}
              className="bg-green-600 text-white w-fit px-2 py-2 rounded self-start cursor-pointer active:scale-90 transition-all duration-200"
            />
          </form>
        </div>
      )}
      {/* OTP Verification */}
      {curr == 1 && (
        <div className="px-10 py-10 flex flex-col items-center justify-center gap-5 max-w-full h-fit bg-white border rounded-2xl">
          <h1 className="text-3xl self-start">Password Reset</h1>
          <p className="border border-yellow-500 text-black/70 px-3 text-2sm w-[300px] py-2 md:w-[350px] outline-0 rounded-md bg-yellow-200/50">
            A 6 digit email OTP was sent to {email}. Enter that code here to
            proceed.
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
      {/* Change password */}
      {curr == 2 && (
        <div className="px-10 py-10 flex flex-col items-center justify-center gap-5 max-w-full h-fit bg-white border rounded-2xl">
          <h1 className="text-3xl self-start">Change Password</h1>
          <form
            onSubmit={handleSubmit1(handleChangePass)}
            className="flex flex-col items-center gap-2"
          >
            <div>
              <div className="w-[300px] md:w-[350px] border border-gray-500 flex pr-2 rounded-md">
                <input
                  type="password"
                  placeholder="Password"
                  className="text-black pl-3 pr-1 text-2sm w-[300px] py-2 md:text-xl md:w-[350px] outline-0"
                  id="password-password"
                  {...register1("password", {
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
              {errors1.password && (
                <p className="text-red-500 italic w-[250px] md:w-[350px] lg:w-[550px]">
                  {errors1.password.message}
                </p>
              )}
            </div>

            <div>
              <div className="w-[300px] md:w-[350px] border border-gray-500 flex pr-2 rounded-md">
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="text-black pl-3 pr-1 text-2sm w-[300px] py-2 md:text-xl md:w-[350px] outline-0"
                  id="confirm-password"
                  {...register1("confirmPassword", {
                    required: "Enter Current password",
                    validate: (value) =>
                      value === getValues1("password") ||
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
              {errors1.confirmPassword && (
                <p className="text-red-500 italic w-[250px] md:w-[350px] lg:w-[550px]">
                  {errors1.confirmPassword.message}
                </p>
              )}
            </div>
            <input
              type="submit"
              value="Reset My Password"
              disabled={isSubmitting1}
              className="bg-green-600 text-white w-fit px-2 py-2 rounded self-start "
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPass;
