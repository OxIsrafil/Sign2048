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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL || "https://sign2048-backend.onrender.com";

        const res = await fetch(`${backendUrl}/api/scores/leaderboard`);
        if (!res.ok) throw new Error("Backend error");

        const data = await res.json();
        setScores(data);
      } catch (err: any) {
        console.error("❌ Failed to fetch leaderboard:", err);
        setError("Something went wrong while loading the leaderboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  const shorten = (addr: string) =>
    addr.slice(0, 6) + "..." + addr.slice(-4);

  return (
    <main className="min-h-screen bg-orangeDynasty text-white flex flex-col items-center py-10 font-press">
      <h1 className="text-2xl text-center font-bold animate-pulse mt-10 drop-shadow-[0_3px_3px_rgba(0,0,0,0.4)] mb-10 font-press leading-snug px-4 sm:px-0">
  Top Scorers of <br className="sm:hidden" /> SiGN 2048
</h1>

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl px-6 py-8 animate-fade-in text-orange-800">
        {loading ? (
          <p className="text-center text-orange-600 animate-pulse">
            Loading leaderboard...
          </p>
        ) : error ? (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        ) : scores.length > 0 ? (
          <ul className="divide-y divide-orange-200 space-y-4">
            {scores.map((entry, idx) => (
              <li
                key={entry.attestationId}
                className="flex justify-between items-center pt-2"
              >
                <span className="text-xl font-bold">#{idx + 1}</span>
                <span className="text-sm truncate w-[55%]">
                  {shorten(entry.address)}
                </span>
                <span className="bg-orangeDynasty text-white px-4 py-1 rounded-full shadow text-lg">
                  {entry.score}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-orange-600">
            No scores yet. Be the first to play!
          </p>
        )}
      </div>
    </main>
  );
}
