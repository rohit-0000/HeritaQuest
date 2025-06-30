import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const History = () => {
  const LocationQuiz = useSelector(
    (state) => state.heritaQuest.LocationQuizHistory
  );
  const FbQuiz = useSelector((state) => state.heritaQuest.FBQuizHistory);
  const [mcq, setMcq] = useState(true);
  function timeFormat(time) {
    const timeObj = new Date(time);
    const timeAdj = timeObj.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const dateAdj = timeObj.toLocaleDateString("en-GB");
    return { timeAdj, dateAdj };
  }
  return (
    <div className="max-w-screen min-h-screen p-2 pt-15 flex flex-col gap-8  overflow-x-hidden">
      <h1 className="text-4xl font-bold md:pl-10">Game History</h1>
      <div className="flex gap-2 self-center  overflow-x-hidden">
        <button
          className={`px-5 py-2 border-1 rounded ${
            mcq ? "bg-blue-500 text-white " : "border-dashed"
          } active:scale-95 transition-transform duration-75`}
          onClick={() => setMcq(true)}
        >
          MCQ Quiz
        </button>
        <button
          className={`px-5 py-2 border-1 rounded ${
            !mcq ? "bg-blue-500  text-white " : "border-dashed"
          } active:scale-95 transition-transform duration-75`}
          onClick={() => setMcq(false)}
        >
          Fill in the Blanks Quiz
        </button>
      </div>
      {mcq ? (
        <div className="w-full md:px-25  overflow-x-hidden">
          {/* Header Row */}
          <div className="flex justify-between md:justify-around w-full text-xl md:text-2xl font-bold mb-2 ">
            <p className="w-[40%] text-center ">Name</p>
            <p className="w-[20%] text-center">Marks</p>
            <p className="w-[40%] text-center">Action</p>
          </div>
          {/* Data Rows */}
          <div className="flex flex-col gap-3  overflow-x-hidden">
            {LocationQuiz.slice()
              .sort((a, b) => new Date(b.time) - new Date(a.time))
              .map((data, i) => {
                const { dateAdj, timeAdj } = timeFormat(data.time);
                return (
                  <div
                    key={i}
                    className="flex justify-between md:justify-around w-full items-center shadow-black shadow-md py-2 rounded-xl text-black hover:scale-102 transition-transform duration-200 delay-100 px-5  overflow-x-hidden"
                  >
                    <p className="w-[40%] text-center font-bold  overflow-x-hidden">{data.name}</p>
                    <p className="w-[20%] text-center overflow-x-hidden">{data.marks}</p>
                    <div className="w-[40%] flex flex-col items-center gap-2 overflow-x-hidden">
                      <NavLink
                        to={`/locationQuizReview/${data?.id}`}
                        className="px-5 py-2 bg-blue-500 rounded active:scale-95 transition-transform duration-75 cursor-pointer text-white "
                      >
                        Review
                      </NavLink>
                      <NavLink
                        to={`/locationQuiz/${data?.id}`}
                        className="px-5 py-2 bg-green-500 rounded active:scale-95 transition-transform duration-75 cursor-pointer text-white "
                      >
                        Re-Attempt
                      </NavLink>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="w-full md:px-25">
          {/* Header Row */}
          <div className="flex justify-between md:justify-around w-full text-xl md:text-2xl font-bold mb-2 ">
            <p className="w-[40%] text-center ">Name</p>
            <p className="w-[20%] text-center">Marks</p>
            <p className="w-[40%] text-center">Action</p>
          </div>
          {/* Data Rows */}
          <div className="flex flex-col gap-3">
            {FbQuiz.slice()
              .sort((a, b) => new Date(b.time) - new Date(a.time))
              .map((data, i) => {
                return (
                  <div
                    key={i}
                    className="flex justify-between md:justify-around w-full items-center shadow-black shadow-md py-2 rounded-xl text-black hover:scale-102 transition-transform duration-200 delay-100 px-5"
                  >
                    <p className="w-[40%] text-center font-bold">{data.name}</p>
                    <p className="w-[20%] text-center ">{data.marks}</p>
                    <div className="w-[40%] flex flex-col items-center gap-2">
                      <NavLink
                        to={`/fbQuizReview/${data?.id}`}
                        className="px-5 py-2 bg-blue-500 rounded active:scale-95 transition-transform duration-75 cursor-pointer text-white"
                      >
                        Review
                      </NavLink>
                      <NavLink
                        to={`/fbQuiz/${data?.id}`}
                        className="px-5 py-2 bg-green-500 rounded active:scale-95 transition-transform duration-75 cursor-pointer text-white"
                      >
                        Re-Attempt
                      </NavLink>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
