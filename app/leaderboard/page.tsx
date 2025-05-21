"use client";

import { useEffect, useState } from "react";

interface ScoreEntry {
  address: string;
  score: number;
  attestationId: string;
  createdAt: string;
}

export default function Leaderboard() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch("https://sign2048-backend.onrender.com/api/scores/top");
        const data = await res.json();
        setScores(data);
      } catch (err) {
        console.error("❌ Failed to fetch leaderboard:", err);
      }
    };
    fetchScores();
  }, []);

  return (
    <main className="min-h-screen bg-orangeDynasty text-white flex flex-col items-center py-10 font-press">
      <h1 className="text-2xl animate-pulse drop-shadow-[0_3px_3px_rgba(0,0,0,0.4)] mb-10">
        Top Scores on SiGN2048
      </h1>

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl px-6 py-8 animate-fade-in text-orange-800">
        {scores.length > 0 ? (
          <ul className="divide-y divide-orange-200 space-y-4">
            {scores.map((entry, idx) => (
              <li
                key={entry.attestationId}
                className="flex justify-between items-center pt-2"
              >
                <span className="text-xl font-bold">#{idx + 1}</span>
                <span className="text-sm truncate w-[55%]">{entry.address}</span>
                <span className="bg-orangeDynasty text-white px-4 py-1 rounded-full shadow text-lg">
                  {entry.score}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-1xl text-orange-600">No scores yet. Be the first to play!</p>
        )}
      </div>
    </main>
  );
}
