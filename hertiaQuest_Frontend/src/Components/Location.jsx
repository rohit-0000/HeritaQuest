import React, { useEffect, useState } from "react";
import SampleImg from "../assets/sampleImg.svg";
const Location = (props) => {
  return (
    <div
      className={`flex flex-col gap-2 items-center w-full overflow-hidden transition-[max-height] duration-300 ease-in-out ${
        props.detail ? "max-h-[1000px]" : "max-h-0"
      }`}
    >
      <h3>{props.currLocation[0].place_name}</h3>
      <h2 className="text-2xl font-bold self-start">Select a Quiz</h2>
      <button className="text-xl  bg-green-500 w-full rounded-md text-white p-2 cursor-pointer active:scale-95 transition-transform duration-200">
        Multiple choice
      </button>
      <button className="text-xl  bg-green-500 w-full rounded-md text-white p-2 cursor-pointer active:scale-95 transition-transform duration-200">
        Fill in the blanks
      </button>
    </div>
  );
};

export default Location;
