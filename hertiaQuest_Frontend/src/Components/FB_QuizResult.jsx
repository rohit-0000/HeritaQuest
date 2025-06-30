import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

const FB_QuizResult = () => {
const { id } = useParams();
  const quiz = useSelector((state) =>
    state.heritaQuest.FBQuizHistory.find(
      (quiz) => Number(quiz.id) === Number(id)
    )
  );

  const marks = quiz?.marks;
  const radius = 90;
  const strokeWidth = 20;
  const center = 100;
  const r = radius;
  const fullCircle = 2 * Math.PI * r;
  const threeFourth = fullCircle * 0.75;
  const progress = (marks / 5) * threeFourth;

  return (
    <div className="w-screen h-screen flex flex-col justify- items-center bg-white pt-20 px-5">
        <h1 className="text-3xl font-bold pb-10">Fill in the Blanks Quiz Result</h1>
      <h2 className="text-2xl text-justify font-bold pb-10">{quiz?.name}</h2>
      <svg width={200} height={200}>
        <g transform={`rotate(135 ${center} ${center})`}>
          {/* Background Arc */}
          <circle
            r={r}
            cx={center}
            cy={center}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            strokeDasharray={`${threeFourth} ${fullCircle}`}
            strokeDashoffset="0"
            strokeLinecap="round"
          />
          {/* Progress Arc */}
          <circle
            r={r}
            cx={center}
            cy={center}
            fill="none"
            stroke={marks <= 2 ? "red" : marks < 4 ? "orange" : "green"}
            strokeWidth={strokeWidth}
            strokeDasharray={`${threeFourth} ${fullCircle}`}
            strokeDashoffset={threeFourth - progress}
            strokeLinecap="round"
          />
        </g>
        {/* Center Text */}
        <text
          x="100"
          y="100"
          textAnchor="middle"
          dy=".3em"
          fontSize="30"
          fill="black"
        >
          {marks}/5
        </text>
      </svg>

      <div className="flex gap-10 py-10 items-center justify-center">
        <NavLink to={`/fbQuizReview/${quiz?.id}`} className="px-8 py-2 bg-blue-500 rounded active:scale-95 transition-transform duration-75 cursor-pointer text-white text-xl">Review</NavLink>
        <NavLink to={`/fbQuiz/${quiz?.id}`} className="px-8 py-2 bg-green-500 rounded active:scale-95 transition-transform duration-75 cursor-pointer text-white text-xl">Re-Attempt</NavLink>
      </div>
      <NavLink to={"/"} className="px-5 py-2 bg-gray-400 rounded active:scale-95 transition-transform duration-75 cursor-pointer">Return To Home</NavLink>
    </div>
  );
};
export default FB_QuizResult