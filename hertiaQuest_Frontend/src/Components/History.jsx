import React from "react";
import { useSelector } from "react-redux";

const History = () => {
  const LocationQuiz = useSelector(
    (state) => state.heritaQuest.LocationQuizHistory
  );

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
    <div className="w-screen p-2 pt-15 flex flex-col gap-8 ">
      <h1 className="text-4xl font-bold md:pl-10">Game History</h1>
      <div className="w-full md:px-25">
        {/* Header Row */}
        <div className="flex justify-between md:justify-around w-full text-xl md:text-2xl font-bold mb-2 ">
          <p className="w-[40%] text-center">Name</p>
          <p className="w-1/4 text-center">Marks</p>
          <p className="w-1/4 text-center">Time</p>
        </div>
        {/* Data Rows */}
        <div className="flex flex-col gap-3">
          {LocationQuiz.slice()
            .sort((a, b) => new Date(a.time) - new Date(b.time))
            .map((data, i) => {
              const { dateAdj, timeAdj } = timeFormat(data.time);
              return (
                <div
                  key={i}
                  className="flex justify-between md:justify-around w-full items-center shadow-black shadow-md py-2 rounded-xl text-black hover:scale-102 transition-transform duration-200 delay-100 px-5"
                >
                  <p className="w-[40%] text-center ">{data.name}</p>
                  <p className="w-1/4 text-center ">{data.marks}</p>
                  <div className="w-1/4 flex flex-col items-center ">
                    <p>{timeAdj}</p>
                    <p>{dateAdj}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default History;
