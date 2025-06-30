import React, { useEffect, useState } from "react";
import SampleImg from "../assets/sampleImg.svg";
import { useDispatch } from "react-redux";
import {generateFBQuiz, generateLocationQuiz } from "../Reducer/slice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Location = (props) => {
  const [game, setGame] = useState("");
  const [theme,setTheme] = useState("");
  const dispatch=useDispatch();
  const token = localStorage.getItem("HeritaQuestToken");
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  async function handleCreateQuiz(){
    if(!token) {
      toast.error("Please signin first");
      return;
    }
    setLoading(true);
    const question="Location :"+props.currLocation[0].place_name+"Theme"+theme;
    if(game==="mcq"){
      const response=await dispatch(generateLocationQuiz(question));
      if(generateLocationQuiz.fulfilled.match(response))
      {
       navigate(`/locationQuiz/${response.payload.id}`); 
      }
      setLoading(false);
    }
    else if(game==="fb"){
      const response=await dispatch(generateFBQuiz(question));
      if(generateFBQuiz.fulfilled.match(response))
      {
        navigate(`/fbQuiz/${response.payload.id}`);
      }
      setLoading(false);
    }
  }
  return (
    <div
      className={`flex flex-col gap-2 items-center w-full overflow-hidden transition-[max-height] duration-300 ease-in-out ${
        props.detail ? "max-h-[1000px] py-10" : "max-h-0"
      } `}
    >
      <h3 className="text-xl text-white">
        <span className="text-xl font-bold">Location : </span>
        {props.currLocation[0].place_name}
      </h3>
      <h2 className="text-2xl font-bold self-start">Select a Quiz</h2>
      <div className="flex justify-around w-full gap-5">
        <button
          className={`text-xl w-full rounded-md text-white py-2 px-5 cursor-pointer active:scale-95 transition-transform duration-200 ${game=="mcq"?"bg-blue-600":"border-dotted border-2"}`}
          onClick={() => setGame("mcq")}
        >
          Multiple choice
        </button>
        <button
          className={`text-xl w-full rounded-md text-white py-2 px-5 cursor-pointer active:scale-95 transition-transform duration-200 ${game=="fb"?"bg-blue-600":"border-dotted border-2"}`}
          onClick={() => setGame("fb")}
        >
          Fill in the blanks
        </button>
      </div>
      
      <h2 className="text-2xl font-bold self-start">Select a Theme</h2>
      <div className="flex flex-wrap justify-around w-full gap-5">
        <button
          className={`text-xl w-fit rounded-md text-white py-2 px-5 cursor-pointer active:scale-95 transition-transform duration-200 ${theme=="language"?"bg-blue-600":"border-dotted border-2"}`}
          onClick={() => setTheme("language")}
        >
          Language
        </button>
        <button
          className={`text-xl w-fit rounded-md text-white py-2 px-5 cursor-pointer active:scale-95 transition-transform duration-200 ${theme=="history"?"bg-blue-600":"border-dotted border-2"}`}
          onClick={() => setTheme("history")}
        >
          History
        </button>
        <button
          className={`text-xl w-fit rounded-md text-white py-2 px-5 cursor-pointer active:scale-95 transition-transform duration-200 ${theme=="games"?"bg-blue-600":"border-dotted border-2"}`}
          onClick={() => setTheme("games")}
        >
          Games
        </button>
        <button
          className={`text-xl w-fit rounded-md text-white py-2 px-5 cursor-pointer active:scale-95 transition-transform duration-200 ${theme=="festival"?"bg-blue-600":"border-dotted border-2"}`}
          onClick={() => setTheme("festival")}
        >
          Festival
        </button>
        <button
          className={`text-xl w-fit rounded-md text-white py-2 px-5 cursor-pointer active:scale-95 transition-transform duration-200 ${theme=="food"?"bg-blue-600":"border-dotted border-2"}`}
          onClick={() => setTheme("food")}
        >
          Food
        </button>
      </div>

      <button className={`text-xl w-full rounded-md py-2 px-5 ${(game!="" && theme!="")?"bg-green-600 active:scale-95 transition-transform duration-200 cursor-pointer text-white border-2":"border-2 bg-green-800 text-white/50"} mt-5`} onClick={handleCreateQuiz}>{loading?"Creating Quiz":"Start"}</button>
    </div>
  );
};

export default Location;
