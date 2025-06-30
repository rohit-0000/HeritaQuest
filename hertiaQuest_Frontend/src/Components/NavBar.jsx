import React, { useEffect, useRef, useState } from "react";
import DefaultUser from "../assets/DefaultUser.svg";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../Reducer/slice";
const NavBar = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const buttRef = useRef(null);
  const userImg = useSelector((state) => state.heritaQuest.user.userImageUrl);
  const token = localStorage.getItem("HeritaQuestToken");
  const dispatch=useDispatch();
  function handleLogout() {
    localStorage.removeItem("HeritaQuestToken");
    dispatch(clearState());
  }

  useEffect(() => {
    function handleClickOutSide(e) {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        !buttRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [open]);

  return (
    <div className="fixed top-0 left-0 w-screen h-14 z-11 bg-blue-600 flex justify-between items-center px-5">
      <h1 className="text-2xl font-bold text-white">Herita Quest</h1>

      <div className="flex items-center w- gap-8 h-full">
        
          {token && (
            <div className="lg:flex w-full h-full gap-5 hidden items-end">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-white text-black font-bold"
                      : "text-white self-center"
                  } text-2xl px-2 py-1 rounded-t-xl`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/leaderboard"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-white text-black font-bold"
                      : "text-white self-center"
                  } text-2xl px-2 py-1 rounded-t-xl`
                }
              >
                Leaderboard
              </NavLink>

              <NavLink
                to="/history"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-white text-black font-bold"
                      : "text-white self-center"
                  } text-2xl px-2 py-1 rounded-t-xl`
                }
              >
                Game History
              </NavLink>
            </div>
          )}

          {!token && (
            <div className="lg:flex w-full h-full gap-5 hidden items-end">
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-white text-black font-bold"
                      : "text-white self-center"
                  } text-2xl px-2 py-1 rounded-t-xl`
                }
              >
                Sign In
              </NavLink>

              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-white text-black font-bold"
                      : "text-white self-center"
                  } text-2xl px-2 py-1 rounded-t-xl`
                }
              >
                Sign Up
              </NavLink>
            </div>
          )}

        <img
          src={userImg || DefaultUser}
          className="w-11 h-11 bg-white rounded-full object-cover aspect-square cursor-pointer"
          onClick={() => setOpen(!open)}
          ref={buttRef}
        />
        {open && (
          <div
            ref={ref}
            className="absolute right-2 top-14 rounded-2xl bg-blue-100/60 w-60 backdrop-blur-md overflow-hidden py-2 px-4 border-2 border-white"
          >
            {token && (
              <div className="flex flex-col gap-2">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-2xl px-2 py-1 w-full rounded-md text-black hover:bg-black/10 relative border-b-1 border-blue-500 ${
                      isActive ? "bg-blue-500 text-white font-bold" : "text-black"
                    } text-center lg:hidden`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/leaderboard"
                  className={({ isActive }) =>
                    `text-2xl px-2 py-1 w-full rounded-md text-black hover:bg-black/10 relative border-b-1 border-blue-500 ${
                      isActive ? "bg-blue-500 text-white font-bold" : "text-black"
                    } text-center lg:hidden`
                  }
                >
                  Leaderboard
                </NavLink>

                <NavLink
                  to="/history"
                  className={({ isActive }) =>
                    `text-2xl px-2 py-1 w-full rounded-md text-black hover:bg-black/10 relative border-b-1 border-blue-500 ${
                      isActive ? "bg-blue-500 text-white font-bold" : "text-black"
                    } text-center lg:hidden`
                  }
                >
                  Game History
                </NavLink>

                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `text-2xl px-2 py-1 w-full rounded-md text-black hover:bg-black/10 relative border-b-1 border-blue-500 ${
                      isActive ? "bg-blue-500 text-white font-bold" : "text-black"
                    } text-center`
                  }
                >
                  Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className=" hover:bg-red-500/90 hover:text-white text-2xl px-2 py-2 pt-0 w-full rounded-md text-black active:scale-90 transition-transform duration-300 border-b-1 border-red-500 "
                >
                  Logout
                </button>
              </div>
            )}
            {!token && (
              <div className="flex flex-col gap-2  ">
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    `text-2xl px-2 py-1 w-full rounded-md text-black hover:bg-black/10 relative border-b-1 border-blue-500 ${
                      isActive ? "bg-blue-500 text-white font-bold" : "text-black"
                    } text-center lg:hidden`
                  }
                >
                  Sign In
                </NavLink>

                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `text-2xl px-2 py-1 w-full rounded-md text-black hover:bg-black/10 relative border-b-1 border-blue-500 ${
                      isActive ? "bg-blue-500 text-white font-bold" : "text-black"
                    } text-center lg:hidden`
                  }
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
