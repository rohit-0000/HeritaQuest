import { createBrowserRouter, NavLink, RouterProvider } from "react-router-dom";
import MapPage from "./Components/MapPage";
import NavBar from "./Components/NavBar";
import LeaderBoard from "./Components/LeaderBoard";
import History from "./Components/History";
import Login from "./Components/login";
import Signup from "./Components/Signup";
import ForgotPass from "./Components/ForgotPass";
import { useDispatch } from "react-redux";
import {
  getFBQuizHistory,
  getFBQuizLeaderboard,
  getLocationQuizHistory,
  getLocationQuizLeaderboard,
  getUserDetail,
} from "./Reducer/slice";
import Profile from "./Components/Profile";
import { useEffect, useState } from "react";

function App() {
  const token = localStorage.getItem("HeritaQuestToken");
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(!token);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="relative flex justify-center items-center">
          {showLogin && (
            <div className="absolute w-fit h-fit bg-white shadow-black shadow-lg rounded-2xl z-20 px-5 py-15">
              <button
                className="absolute top-2 right-5 text-4xl font-bold"
                onClick={() => setShowLogin(false)}
              >
                &#215;
              </button>
              <Login setShowLogin={setShowLogin}/>
            </div>
          )}
          <NavBar />
          <MapPage />
        </div>
      ),
    },
    {
      path: "/profile",
      element: (
        <div>
          <NavBar />
          <Profile />
        </div>
      ),
    },
    {
      path: "/leaderboard",
      element: (
        <div>
          <NavBar />
          <LeaderBoard />
        </div>
      ),
    },
    {
      path: "/history",
      element: (
        <div>
          <NavBar />
          <History />
        </div>
      ),
    },
    {
      path: "/signup",
      element: (
        <div className="w-screen h-screen">
          <NavBar/>
          <Signup />
        </div>
      ),
    },
    {
      path: "/signin",
      element: (
        <div className="w-screen h-screen">
          <NavBar/>
          <Login />
        </div>
      ),
    },
    {
      path: "/forgotPass",
      element: (
        <div>
          <NavBar/>
          <ForgotPass />
        </div>
      ),
    },
  ]);
  useEffect(() => {
    if (token != null) {
      setShowLogin(false);
      dispatch(getUserDetail());
      dispatch(getLocationQuizLeaderboard());
      dispatch(getLocationQuizHistory());
      dispatch(getFBQuizLeaderboard());
      dispatch(getFBQuizHistory());
    }
  }, [token]);

  return <RouterProvider router={router} />;
}

export default App;
