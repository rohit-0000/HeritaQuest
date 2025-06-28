import React, { useEffect, useRef, useState } from "react";
import UserImg from "../assets/DefaultUser.svg";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import EditImg from "../assets/editImg.svg";
import EditTextImg from "../assets/editTextImg.svg";
import OpenEye from "../assets/open-eye.svg";
import ClosedEye from "../assets/closed-eye.svg";
import SaveImg from "../assets/saveImg.svg";
import toast from "react-hot-toast";
import { setProfileImg } from "../Reducer/slice";
const Profile = () => {
  const user = useSelector((state) => state.heritaQuest.user);

  const [name, setName] = useState(false);
  const [username, setUsername] = useState(false);
  const [email, setEmail] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [fullImg, setFullImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();

  const {
    register: registerName,
    handleSubmit: handleSubmitName,
    formState: { errors: errorsName, isSubmitting: isSubmittingName },
  } = useForm();
  const {
    register: registerUsername,
    handleSubmit: handleSubmitUsername,
    formState: { errors: errorsUsername },
  } = useForm();
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail },
  } = useForm();
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch: watchPassword,
    formState: { errors: errorsPassword },
    reset: resetPasswordForm,
  } = useForm();
  function handleImgInput(e) {
    const img = e.target.files[0];
    if (img && img.type.startsWith("image/")) {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", img);
      dispatch(setProfileImg(formData)).then(() => setLoading(false));
    } else {
      toast.error("Invalid file type");
    }
  }
  return (
    <div
      className={`w-screen min-h-screen flex flex-col items-center ${
        fullImg ? "justify-center bg-black fixed z-20":"pt-14"
      } gap-5 transition-all duration-300`}
    >
      <div
        className={`w-full h-full flex flex-col  items-center justify-center transition-all duration-300  `}
      >
        {fullImg && (
          <span
            className={`text-white text-4xl font-bold cursor-pointer absolute top-0 right-2 z-12 `}
            onClick={() => setFullImg(false)}
          >
            &#10005;
          </span>
        )}
        <label>
          <input
            type={"file"}
            accept="image/*"
            className="hidden"
            onChange={handleImgInput}
          />
          <div className="relative">
            <img
              src={user?.userImageUrl || UserImg}
              className={`${
                fullImg
                  ? "w-[92vw] h-[92vw] md:w-[86vh] md:h-[86vh] rounded-md"
                  : "w-60 rounded-full mt-10"
              } transition-all duration-300 z-10 aspect-square object-cover bg-white`}
              onClick={(e) => {
                e.preventDefault();
                setFullImg(true);
              }}
            />
            {loading && (
              <div className="absolute w-60 h-60 bottom-0 left-0 bg-black/10 backdrop-blur-md flex justify-center items-center rounded-md" onClick={(e)=>e.preventDefault()}>
                <div className="w-16 h-16 border-5 border-transparent animate-spin  border-t-blue-400 rounded-full flex justify-center items-center">
                  <div
                    className="w-10 h-10 border-5 border-transparent animate-spin  border-t-red-400 rounded-full"
                  />
                </div>
              </div>
            )}
          </div>
          <p
            className={`w-full text-center text-blue-500  ${fullImg && "pt-5"}`}
          >
            Edit profile photo
          </p>
        </label>
      </div>

      {!fullImg && (
        <div className="flex flex-col gap-5">
          {/* Name */}
          <form className="flex flex-col gap-5 md:gap-10 w-[70vw] md:w-[65vw]">
            <div className="flex items-center flex-col md:flex-row w-full justify-between">
              <h2 className="font-bold text-xl">Name</h2>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter name"
                    className={`${
                      name ? "border" : "border-b"
                    } pl-3 text-2sm w-[300px] py-2 md:text-xl md:w-[350px] lg:text-2xl lg:w-[550px] rounded-md outline-0 pr-10 relative`}
                    disabled={!name}
                    defaultValue={user.name}
                    {...registerName("name", {
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
                  <img
                    src={name ? SaveImg : EditTextImg}
                    className="absolute right-0 top-1 w-9 cursor-pointer active:scale-85"
                    onClick={
                      name
                        ? handleSubmitName((data) => {
                            toast.success(data.name);
                            setName(false);
                          })
                        : () => setName(true)
                    }
                  />
                </div>
                {errorsName.name && (
                  <p className="text-red-500 italic absolute pl-2">
                    {errorsName.name.message}
                  </p>
                )}
              </div>
            </div>
          </form>

          {/* Username */}
          <form className="flex flex-col gap-5 md:gap-10 w-[70vw] md:w-[65vw]">
            <div className="flex items-center flex-col md:flex-row w-full justify-between">
              <h2 className="font-bold text-xl">Username</h2>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter Username"
                    className={`${
                      username ? "border" : "border-b"
                    } pl-3 text-2sm w-[300px] py-2 md:text-xl md:w-[350px] lg:text-2xl lg:w-[550px] rounded-md outline-0 pr-10 relative`}
                    disabled={!username}
                    defaultValue={user.username}
                    {...registerUsername("username", {
                      required: "Enter Username",
                      minLength: {
                        value: 4,
                        message: "Length must be 4-12 characters",
                      },
                    })}
                  />
                  <img
                    src={username ? SaveImg : EditTextImg}
                    className="absolute right-0 top-1 w-9 cursor-pointer active:scale-85"
                    onClick={
                      username
                        ? handleSubmitUsername((data) => {
                            toast.success(data.username);
                            setUsername(false);
                          })
                        : () => setUsername(true)
                    }
                  />
                </div>
                {errorsUsername.username && (
                  <p className="text-red-500 italic absolute pl-2">
                    {errorsUsername.username.message}
                  </p>
                )}
              </div>
            </div>
          </form>

          {/* Email */}
          <form className="flex flex-col gap-5 md:gap-10 w-[70vw] md:w-[65vw]">
            <div className="flex items-center flex-col md:flex-row w-full justify-between">
              <h2 className="font-bold text-xl">Email</h2>
              <div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className={`${
                      email ? "border" : "border-b"
                    } pl-3 text-2sm w-[300px] py-2 md:text-xl md:w-[350px] lg:text-2xl lg:w-[550px] rounded-md outline-0 pr-10 relative`}
                    disabled={!email}
                    defaultValue={user.email}
                    {...registerEmail("email", {
                      required: "Enter Email",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                  <img
                    src={email ? SaveImg : EditTextImg}
                    className="absolute right-0 top-1 w-9 cursor-pointer active:scale-85"
                    onClick={
                      email
                        ? handleSubmitEmail((data) => {
                            toast.success(data.email);
                            setEmail(false);
                          })
                        : () => setEmail(true)
                    }
                  />
                </div>
                {errorsEmail.email && (
                  <p className="text-red-500 italic absolute pl-2">
                    {errorsEmail.email.message}
                  </p>
                )}
              </div>
            </div>
          </form>

          {/* Password */}
          <form className="flex flex-col gap-5 md:gap-10 w-[70vw] md:w-[65vw]">
            <div className="flex items-center flex-col md:flex-row w-full justify-between">
              <h2 className="font-bold text-xl">Password</h2>
              <div>
                <div className="relative flex flex-col gap-2">
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className={`${
                      passwordEdit ? "border" : "border-b"
                    } pl-3 text-2sm w-[300px] py-2 md:text-xl md:w-[350px] lg:text-2xl lg:w-[550px] rounded-md outline-0 pr-10 relative`}
                    disabled={!passwordEdit}
                    {...registerPassword("password", {
                      required: passwordEdit ? "Enter new password" : false,
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {passwordEdit && (
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className={`border pl-3 text-2sm w-[300px] py-2 md:text-xl md:w-[350px] lg:text-2xl lg:w-[550px] rounded-md outline-0 pr-10 relative`}
                      {...registerPassword("confirmPassword", {
                        required: "Confirm your password",
                        validate: (value) =>
                          value === watchPassword("password") ||
                          "Passwords do not match",
                      })}
                    />
                  )}
                  <img
                    src={passwordEdit ? SaveImg : EditTextImg}
                    className="absolute right-0 top-1 w-9 cursor-pointer active:scale-85"
                    style={{ top: passwordEdit ? "8px" : "8px" }}
                    onClick={
                      passwordEdit
                        ? handleSubmitPassword((data) => {
                            toast.success("Password changed!");
                            setPasswordEdit(false);
                            resetPasswordForm();
                          })
                        : () => setPasswordEdit(true)
                    }
                  />
                  {errorsPassword.password && (
                    <p className="text-red-500 italic absolute pl-2">
                      {errorsPassword.password.message}
                    </p>
                  )}
                  {errorsPassword.confirmPassword && (
                    <p className="text-red-500 italic absolute pl-2">
                      {errorsPassword.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
