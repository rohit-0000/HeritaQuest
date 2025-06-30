import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { submitFBQuiz } from "../Reducer/slice";

const FB_Quiz = () => {
  const { id } = useParams();
  const quiz = useSelector((state) =>
    state.heritaQuest.FBQuizHistory.find((quiz) => quiz.id == id)
  );
  const [current, setCurrent] = useState(0);
  const [responses, setResponses] = useState(() => {
    const saved = localStorage.getItem("FBQuizResponse");
    return saved ? JSON.parse(saved) : {};
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("FBQuizResponse", JSON.stringify(responses));
  }, [responses]);
  if (!quiz) return <div>Quiz not found</div>;
  const question = quiz.questions?.[current];
  async function handleQuizSubmit() {
    let ct = 0;
    quiz.questions?.forEach((it) => {
      if (
        it.correctAns.replace(/\s+/g, "").toLowerCase() ===
        (responses[String(it.id)] || "").replace(/\s+/g, "").toLowerCase()
      )
        ct += 1;
    });
    const quizResponse = {
      id: id,
      marks: ct,
      response: responses,
    };

    dispatch(submitFBQuiz(quizResponse));
    navigate(`/fbQuizResult/${id}`);
  }

  return (
    <div className="px-2 w-full h-screen flex flex-col">
      <h1 className="text-2xl font-bold">
        Location : <span className="font-normal">{quiz?.name}</span>
      </h1>

      <div className="flex flex-col justify-center items-center h-full w-full gap-4">
        <div className="w-full md:w-10/12 lg:w-1/2">
          {question && (
            <div className="flex flex-col gap-5 text-justify">
              <p className="text-xl md:text-2xl text-justify">
                <strong>Q{current + 1}:</strong> {question.question}
              </p>
              <p>
                <span className="font-bold md:text-xl">Hint:</span>{" "}
                <span className="text-black/70 md:text-xl">
                  {question.hint}
                </span>
              </p>
              <input
                className="border rounded px-5 py-2 text-xl"
                value={responses[question?.id] || ""}
                onChange={(e) =>
                  setResponses((prev) => ({
                    ...prev,
                    [question?.id]: e.target.value,
                  }))
                }
              />
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

export default FB_Quiz;

/*
FBQuizHistory:[
0:{
  "id": 1,
  "name": "Bagroda, Madhya Pradesh Location and Theme Quiz",
  "marks": 0,
  "time": "2025-06-30T03:32:12.0709927",
  "questions": [
    {
      "id": 1,
      "question": "Bagroda is a location situated in the state of _________, India.",
      "correctAns": "Madhya Pradesh",
      "hint": "It's in central India.",
      "user_response": null
    },
    {
      "id": 2,
      "question": "The primary language spoken in Bagroda, like most of Madhya Pradesh, is _________.",
      "correctAns": "Hindi",
      "hint": "It is the official language of the state.",
      "user_response": null
    },
    {
      "id": 3,
      "question": "Agriculture is a significant _________ in Bagroda and the surrounding areas.",
      "correctAns": "occupation",
      "hint": "Related to farming and land use.",
      "user_response": null
    },
    {
      "id": 4,
      "question": "Bagroda is located in a region primarily characterized by its _________ climate.",
      "correctAns": "tropical",
      "hint": "It experiences hot summers and monsoon seasons.",
      "user_response": null
    },
    {
      "id": 5,
      "question": "The cultural theme commonly found in Bagroda and Madhya Pradesh, is a blend of various regional _________ and traditions.",
      "correctAns": "dialects",
      "hint": "These variations include specific forms of speech and local rituals.",
      "user_response": null
    }
    }
]

*/
