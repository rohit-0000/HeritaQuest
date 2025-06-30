import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { submitLocationQuiz } from "../Reducer/slice";

const LocationQuiz = () => {
  const { id } = useParams();
  const quiz = useSelector((state) =>
    state.heritaQuest.LocationQuizHistory.find((quiz) => quiz.id == id)
  );
  const [current, setCurrent] = useState(0);

  const [responses, setResponses] = useState(() => {
    const saved = localStorage.getItem("locationQuizResponse");
    return saved ? JSON.parse(saved) : {};
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("locationQuizResponse", JSON.stringify(responses));
  }, [responses]);
  if (!quiz) return <div>Quiz not found</div>;

  const question = quiz.questions?.[current];

  async function handleQuizSubmit() {
    let ct = 0;
    quiz.questions?.forEach((it) => {
      if (it.correct_answer === responses[String(it.id)]) ct += 1;
    });
    const quizResponse = {
      id: id,
      marks: ct,
      response: responses,
    };

    dispatch(submitLocationQuiz(quizResponse));
    navigate(`/locationQuizResult/${id}`);
  }
  return (
      <div className="px-2 w-full h-screen flex flex-col">
        <h1 className="text-2xl font-bold">
          Location : <span className="font-normal">{quiz?.name}</span>
        </h1>

        <div className="flex flex-col justify-center items-center h-full w-full gap-4">
          <div className="w-full md:w-10/12 lg:w-1/2">
            {question && (
              <div className="flex flex-col gap-5">
                <p className="text-xl md:text-2xl text-justify">
                  <strong>Q{current + 1}:</strong> {question.question_text}
                </p>
                <div className="flex flex-col w-full items-start gap-2 px-5">
                  {question.options.map((option, i) => (
                    <button
                      key={i}
                      className={`w-full px-5 py-2 rounded-xl md:text-xl active:scale-95 transition-transform duration-75 border-2 ${
                        responses[String(question.id)] === option
                          ? "bg-blue-100 border-blue-500 text-blue-800"
                          : "border-dashed border-black/40"
                      }`}
                      onClick={() => {
                        setResponses((prev) => ({
                          ...prev,
                          [String(question.id)]: option,
                        }));
                        localStorage.setItem("locationQuizResponse", responses);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
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
                setCurrent((c) => Math.min(quiz.questions.length - 1, c + 1))
              }
              disabled={current === quiz.questions.length - 1}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <button
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded active:scale-95 transition-transform duration-75 "
            onClick={handleQuizSubmit}
          >
            Submit
          </button>
        </div>
      </div>
  );
};

export default LocationQuiz;
