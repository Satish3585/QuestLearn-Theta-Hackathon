import { useState } from "react";

export default function MatchActivity({ activity, onSubmit }) {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches, setMatches] = useState({}); // left -> right
  const [locked, setLocked] = useState(false);
  const [usedRights, setUsedRights] = useState([]);

  const pickLeft = (left) => {
    if (locked) return;
    setSelectedLeft(left);
  };

  const pickRight = (right) => {
    if (locked || !selectedLeft || usedRights.includes(right)) return;
    setMatches((prev) => ({ ...prev, [selectedLeft]: right }));
    setUsedRights((prev) => [...prev, right]);
    setSelectedLeft(null);
  };

  const resetPair = (left) => {
    if (locked) return;
    const right = matches[left];
    setMatches((prev) => {
      const next = { ...prev };
      delete next[left];
      return next;
    });
    setUsedRights((prev) => prev.filter((r) => r !== right));
  };

  const handleSubmit = () => {
    setLocked(true);
    onSubmit({ match_answers: matches });
  };

  const allMatched = activity.left_items.every((l) => matches[l]);

  return (
    <div className="bg-white rounded-xl2 shadow-pop p-6">
      <p className="font-body text-sm text-ink/60 mb-4">
        Tap a term on the left, then its matching answer on the right.
      </p>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          {activity.left_items.map((left) => {
            const matched = matches[left];
            const isSelected = selectedLeft === left;
            return (
              <button
                key={left}
                onClick={() => (matched ? resetPair(left) : pickLeft(left))}
                disabled={locked}
                className={`w-full text-left px-4 py-2.5 rounded-lg border-2 font-body font-semibold transition-colors ${
                  matched
                    ? "border-mint bg-mint/10 text-mintDark"
                    : isSelected
                    ? "border-violet bg-violet/10 text-violet"
                    : "border-ink/10 hover:border-violet/40"
                }`}
              >
                {left} {matched && <span className="text-xs opacity-70">→ {matched}</span>}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {activity.right_items.map((right) => {
            const used = usedRights.includes(right);
            return (
              <button
                key={right}
                onClick={() => pickRight(right)}
                disabled={locked || used}
                className={`w-full text-left px-4 py-2.5 rounded-lg border-2 font-body transition-colors ${
                  used ? "border-mint bg-mint/10 text-mintDark opacity-60" : "border-ink/10 hover:border-violet/40"
                }`}
              >
                {right}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!allMatched || locked}
        className="w-full mt-6 bg-coral hover:bg-coralDark disabled:opacity-40 text-white font-display text-lg py-3 rounded-lg shadow-popSm transition-colors"
      >
        {locked ? "Submitted!" : "Submit Matches"}
      </button>
    </div>
  );
}
