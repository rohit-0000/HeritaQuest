import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

const FB_QuizReview = () => {
  const { id } = useParams();
  const quiz = useSelector((state) =>
    state.heritaQuest.FBQuizHistory.find((quiz) => quiz.id == id)
  );
  const [current, setCurrent] = useState(0);
  const question = quiz?.questions?.[current];
  return (
    <div className="px-5 w-full h-screen flex flex-col pt-20 ">
      <h1 className="text-2xl font-bold">
        Location : <span className="font-normal">{quiz?.name}</span>
      </h1>

      <div className="flex flex-col justify-center items-center h-full w-full gap-4">
        <div className="w-full md:w-10/12 lg:w-1/2">
          {question && (
            <div className="flex flex-col gap-5">
              <p className="text-xl md:text-2xl text-justify">
                <strong>Q{current + 1}:</strong> {question.question}
              </p>
              <div>
                {question.correctAns.replace(/\s+/g, "").toLowerCase() ===
                question.user_response.replace(/\s+/g, "").toLowerCase() ? (
                  <p className="text-blue-600 ">Correct Answer</p>
                ) : (
                  <p className="text-red-600">Wrong Answer</p>
                )}
                <input
                  className={`border rounded px-5 py-2 text-xl ${
                    question.correctAns.replace(/\s+/g, "").toLowerCase() ===
                    question.user_response.replace(/\s+/g, "").toLowerCase()
                      ? "bg-blue-100 border-blue-500 text-blue-800"
                      : "bg-red-100 border-red-500 text-red-800"
                  }`}
                  value={question.user_response}
                  disabled
                />
              </div>
              {question.correctAns.replace(/\s+/g, "").toLowerCase() !=
                question.user_response.replace(/\s+/g, "").toLowerCase() && (
                <div>
                  <p className="text-green-600">Correct Answer</p>
                  <input
                    className="border rounded px-5 py-2 text-xl bg-green-100 border-green-500 text-green-800"
                    value={question.correctAns}
                    disabled
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-4 ">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrent((c) => Math.min(quiz?.questions.length - 1, c + 1))
            }
            disabled={current === quiz?.questions.length - 1}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="flex">
          <NavLink
            to={`/fbQuizResult/${id}`}
            className="bg-green-600 text-white px-5 py-2 rounded"
          >
            Return To Result
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default FB_QuizReview;
