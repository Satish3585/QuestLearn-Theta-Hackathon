import { useState } from "react";

export default function QuizActivity({ activity, onSubmit }) {
  const [answers, setAnswers] = useState(Array(activity.questions.length).fill(null));
  const [locked, setLocked] = useState(false);

  const selectAnswer = (qIndex, optIndex) => {
    if (locked) return;
    const next = [...answers];
    next[qIndex] = optIndex;
    setAnswers(next);
  };

  const handleSubmit = () => {
    setLocked(true);
    onSubmit({ quiz_answers: answers });
  };

  const allAnswered = answers.every((a) => a !== null);

  return (
    <div className="space-y-6">
      {activity.questions.map((q, qi) => (
        <div key={qi} className="bg-white rounded-xl2 shadow-pop p-5">
          <p className="font-display text-lg text-ink mb-3">{qi + 1}. {q.q}</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {q.options.map((opt, oi) => {
              const selected = answers[qi] === oi;
              return (
                <button
                  key={oi}
                  onClick={() => selectAnswer(qi, oi)}
                  disabled={locked}
                  className={`text-left px-4 py-2.5 rounded-lg border-2 font-body transition-colors ${
                    selected ? "border-violet bg-violet/10 text-violet font-bold" : "border-ink/10 hover:border-violet/40"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={!allAnswered || locked}
        className="w-full bg-coral hover:bg-coralDark disabled:opacity-40 text-white font-display text-lg py-3 rounded-lg shadow-popSm transition-colors"
      >
        {locked ? "Submitted!" : "Submit Answers"}
      </button>
    </div>
  );
}
