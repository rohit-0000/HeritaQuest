import React, { useState } from "react";
import { useSelector } from "react-redux";

const LeaderBoard = () => {
  const LocationQuiz = useSelector((state) => state.heritaQuest.LocationQuizLB);
  const FbQuiz = useSelector((state) => state.heritaQuest.FBQuizLB);
  const [mcq, setMcq] = useState(true);
  return (
    <div className="w-screen p-2 pt-15 flex flex-col gap-8 ">
      <h1 className="text-4xl font-bold md:pl-10">Leaderboard</h1>
      <div className="flex gap-2 self-center">
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
        <div className="w-full md:px-25">
          {/* Header Row */}
          <div className="flex justify-between md:justify-around w-full text-xl md:text-2xl font-bold mb-2 ">
            <p className="w-[40%] text-center ">User Image</p>
            <p className="w-1/4 text-center">Name</p>
            <p className="w-1/4 text-center">Marks</p>
          </div>
          {/* Data Rows */}
          <div className="flex flex-col gap-3">
            {LocationQuiz.slice()
              .sort((a, b) => new Date(b.marks) - new Date(a.marks))
              .map((data, i) => {
                return (
                  <div
                    key={i}
                    className="flex justify-between md:justify-around w-full items-center shadow-black shadow-md py-2 rounded-xl text-black hover:scale-102 transition-transform duration-200 delay-100 px-5"
                  >
                    <div className="w-[40%] flex justify-center">
                      <img
                        src={data.userImageurl}
                        className="w-20 h-20 object-cover aspect-square rounded-full self-center"
                      />
                    </div>
                    <p className="w-1/4 text-center ">{data.username}</p>
                    <p className="w-1/4 text-center ">{data.marks}</p>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="w-full md:px-25">
          {/* Header Row */}
          <div className="flex justify-between md:justify-around w-full text-xl md:text-2xl font-bold mb-2 px-5">
            <p className="w-[40%] text-center">User Image</p>
            <p className="w-1/4 text-center">Name</p>
            <p className="w-1/4 text-center">Marks</p>
          </div>
          {/* Data Rows */}
          <div className="flex flex-col gap-3">
            {FbQuiz.slice()
              .sort((a, b) => new Date(b.marks) - new Date(a.marks))
              .map((data, i) => {
                return (
                  <div
                    key={i}
                    className="flex justify-between md:justify-around w-full items-center shadow-black shadow-md py-2 rounded-xl text-black hover:scale-102 transition-transform duration-200 delay-100 px-5"
                  >
                    <div className="w-[40%] flex justify-center">
                      <img
                        src={data.userImageurl}
                        className="w-20 h-20 object-cover aspect-square rounded-full self-center"
                      />
                    </div>
                    <p className="w-1/4 text-center ">{data.username}</p>
                    <p className="w-1/4 text-center ">{data.marks}</p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;
