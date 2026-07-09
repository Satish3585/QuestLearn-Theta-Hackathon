import { useState } from "react";

export default function SequenceActivity({ activity, onSubmit }) {
  const [order, setOrder] = useState(activity.shuffled_steps);
  const [locked, setLocked] = useState(false);

  const move = (index, direction) => {
    if (locked) return;
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= order.length) return;
    const next = [...order];
    [next[index], next[newIndex]] = [next[newIndex], next[index]];
    setOrder(next);
  };

  const handleSubmit = () => {
    setLocked(true);
    onSubmit({ sequence_answer: order });
  };

  return (
    <div className="bg-white rounded-xl2 shadow-pop p-6">
      <p className="font-body text-sm text-ink/60 mb-4">
        Use the arrows to put these steps in the correct order.
      </p>
      <div className="space-y-2">
        {order.map((step, i) => (
          <div
            key={step}
            className="flex items-center gap-3 border-2 border-ink/10 rounded-lg px-4 py-3 font-body"
          >
            <span className="font-display text-violet w-6">{i + 1}</span>
            <span className="flex-1">{step}</span>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => move(i, -1)}
                disabled={locked || i === 0}
                aria-label="Move up"
                className="w-7 h-7 rounded bg-ink/5 hover:bg-violet/20 disabled:opacity-30 font-bold"
              >
                ↑
              </button>
              <button
                onClick={() => move(i, 1)}
                disabled={locked || i === order.length - 1}
                aria-label="Move down"
                className="w-7 h-7 rounded bg-ink/5 hover:bg-violet/20 disabled:opacity-30 font-bold"
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={locked}
        className="w-full mt-6 bg-coral hover:bg-coralDark disabled:opacity-40 text-white font-display text-lg py-3 rounded-lg shadow-popSm transition-colors"
      >
        {locked ? "Submitted!" : "Submit Order"}
      </button>
    </div>
  );
}
