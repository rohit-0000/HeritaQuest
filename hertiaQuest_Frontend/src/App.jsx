import { createBrowserRouter, NavLink, RouterProvider } from "react-router-dom";
import MapPage from "./Components/MapPage";
import NavBar from "./Components/NavBar";
import LeaderBoard from "./Components/LeaderBoard";
import History from "./Components/History";
import Login from "./Components/Login";
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
import LocationQuiz from "./Components/LocationQuiz";
import LocationQuizResult from "./Components/LocationQuizResult";
import LocationQuizReview from "./Components/LocationQuizReview";
import FB_Quiz from "./Components/FB_Quiz";
import FB_QuizResult from "./Components/FB_QuizResult";
import FB_QuizReview from "./Components/FB_QuizReview";
import OAuth2RedirectHandler from "./Components/OAuth2RedirectHandler ";

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
    {
      path:"/locationQuiz/:id",
      element:(
        <div>
          <LocationQuiz/>
        </div>
      )
    },
    {
      path:"/fbQuiz/:id",
      element:(
        <div>
          <FB_Quiz/>
        </div>
      )
    },
    {
      path:"/locationQuizResult/:id",
      element:(
        <div>
          <NavBar/>
          <LocationQuizResult/>
        </div>
      )
    },
    {
      path:"/fbQuizResult/:id",
      element:(
        <div>
          <NavBar/>
          <FB_QuizResult/>
        </div>
      )
    },
    {
      path:"/locationQuizReview/:id",
      element:(
        <div>
          <NavBar/>
          <LocationQuizReview/>
        </div>
      )
    },
    {
      path:"/fbQuizReview/:id",
      element:(
        <div>
          <NavBar/>
          <FB_QuizReview/>
        </div>
      )
    },
    {
      path: "/oauth2/redirect",
      element: <OAuth2RedirectHandler />,
    },
    {
      path: "*",
      element: (
        <div>
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
            }}
          >
            This Page does not Exist
          </h1>
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
    }else{
      setShowLogin(true);
    }
  }, [token]);

  return <RouterProvider router={router} />;
}

export default App;
