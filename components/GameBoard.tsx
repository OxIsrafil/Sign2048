"use client";

import { useEffect, useRef, useState } from "react";
import "../styles/board.css";
import { usePrivy } from "@privy-io/react-auth";
import { SignProtocolClient, EvmChains, SpMode } from "@ethsign/sp-sdk";
import Link from "next/link";

type Tile = number;
const SIZE = 4;

const generateEmpty = (): Tile[][] =>
  Array(SIZE).fill(0).map(() => Array(SIZE).fill(0));

const getEmptyCells = (board: Tile[][]) => {
  const cells: [number, number][] = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) cells.push([r, c]);
    }
  }
  return cells;
};

const addRandomTile = (board: Tile[][]): Tile[][] => {
  const empty = getEmptyCells(board);
  if (!empty.length) return board;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  board[r][c] = Math.random() < 0.9 ? 2 : 4;
  return board;
};

const transpose = (board: Tile[][]) =>
  board[0].map((_, i) => board.map((row) => row[i]));

const reverse = (board: Tile[][]) =>
  board.map((row) => [...row].reverse());

const compressRow = (row: Tile[]) =>
  row.filter((x) => x !== 0).concat(Array(SIZE).fill(0)).slice(0, SIZE);

const mergeRow = (row: Tile[]): [Tile[], number] => {
  let score = 0;
  for (let i = 0; i < SIZE - 1; i++) {
    if (row[i] !== 0 && row[i] === row[i + 1]) {
      row[i] *= 2;
      score += row[i];
      row[i + 1] = 0;
    }
  }
  return [compressRow(row), score];
};

const moveBoard = (board: Tile[][], dir: string): [Tile[][], boolean, number] => {
  let rotated = board.map((row) => [...row]);
  if (dir === "up") rotated = transpose(rotated);
  if (dir === "down") rotated = reverse(transpose(rotated));
  if (dir === "right") rotated = reverse(rotated);

  let moved = false;
  let score = 0;
  const newBoard = rotated.map((row) => {
    const compressed = compressRow(row);
    const [merged, gained] = mergeRow(compressed);
    if (JSON.stringify(row) !== JSON.stringify(merged)) moved = true;
    score += gained;
    return merged;
  });

  let result = newBoard;
  if (dir === "up") result = transpose(result);
  if (dir === "down") result = transpose(reverse(result));
  if (dir === "right") result = reverse(result);

  return [result, moved, score];
};

const isGameOver = (board: Tile[][]) => {
  const directions = ["up", "down", "left", "right"];
  return !directions.some((dir) => {
    const [_, moved] = moveBoard(board, dir);
    return moved;
  });
};

const getTileColor = (value: number) => {
  const colors: { [key: number]: string } = {
    0: "rgba(255,255,255,0.1)",
    2: "#eee4da",
    4: "#ede0c8",
    8: "#f2b179",
    16: "#f59563",
    32: "#f67c5f",
    64: "#f65e3b",
    128: "#edcf72",
    256: "#edcc61",
    512: "#edc850",
    1024: "#edc53f",
    2048: "#edc22e"
  };
  return colors[value] || "#3c3a32";
};

export default function GameBoard() {
  const [board, setBoard] = useState<Tile[][]>(generateEmpty());
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef({ x: 0, y: 0 });
  const { user } = usePrivy();

  const init = () => {
    let newBoard = generateEmpty();
    newBoard = addRandomTile(addRandomTile(newBoard));
    setBoard(newBoard);
    setScore(0);
    setSubmitted(false);
    setGameOver(false);
    setTimeout(() => containerRef.current?.focus(), 100);
  };


const submitScore = async () => {
  if (!user?.wallet?.address || typeof score !== "number" || isNaN(score)) {
    console.warn("⚠️ Invalid score or wallet address:", score, user?.wallet?.address);
    return;
  }

  try {
    console.log("📤 Submitting score to Sign Protocol:", score);

    const client = new SignProtocolClient(SpMode.OnChain, {
      chain: EvmChains.base,
    });

    const res = await client.createAttestation({
      schemaId: "0x4697e", // ✅ use plain string (hex only, no prefix!)
      recipients: [user.wallet.address],
      data: [
        {
          name: "score",
          type: "string",
          value: score.toString(),
        },
      ],
      indexingValue: user.wallet.address,
    });

    const attestationId = res.attestationId;
    console.log("✅ Score submitted on-chain! Attestation ID:", attestationId);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://sign2048-backend.onrender.com";

    const response = await fetch(`${backendUrl}/api/scores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: user.wallet.address,
        score,
        attestationId,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Backend error: ${errText}`);
    }

    console.log("✅ Score saved to backend DB");
  } catch (err) {
    console.error("❌ Failed to submit score:", err);
  }
};


  const handleMove = (dir: string) => {
    const [newBoard, moved, gained] = moveBoard(board, dir);
    if (moved) {
      const updatedBoard = addRandomTile(newBoard);
      setBoard(updatedBoard);
      setScore((prev) => prev + gained);

      if (isGameOver(updatedBoard) && !submitted) {
        setSubmitted(true);
        setGameOver(true);
        submitScore();
      }
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, string> = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right"
    };
    if (keys[e.key]) {
      e.preventDefault();
      handleMove(keys[e.key]);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;

    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    if (Math.max(absX, absY) > 30) {
      if (absX > absY) {
        handleMove(dx > 0 ? "right" : "left");
      } else {
        handleMove(dy > 0 ? "down" : "up");
      }
    }
  };

  const shareToX = () => {
    const text = `I scored ${score} in 2048 on @Sign Game built by @OxIsrafil.\n\nPowered by Sign Lab & @sign protocol.\nPlay & beat me if you can: https://2048sign.vercel.app/`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center mt-6 outline-none relative"
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKey}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <h1 className="text-2xl text-white animate-pulse drop-shadow-[0_3px_3px_rgba(0,0,0,0.4)] mb-2 font-press">2048 on SiGN</h1>
      <h2 className="text-1xl font-bold text-white mb-2 font-press">Score: {score}</h2>
      <Link href="/leaderboard">
        <button className="mb-4 px-4 py-2 bg-white text-orange-600 font-bold rounded shadow hover:bg-gray-100 transition">
          View Leaderboard
        </button>
      </Link>

      <div className="relative">
        <div className="grid grid-cols-4 gap-2 bg-orange-700 p-4 rounded-lg relative z-0 transition-all duration-200">
          {board.flat().map((val, i) => (
            <div
              key={i}
              className="tile filled animate-pop"
              style={{
                backgroundColor: getTileColor(val),
                color: val <= 4 ? "#776e65" : "#f9f6f2",
              }}
            >
              {val !== 0 && <span>{val}</span>}
            </div>
          ))}
        </div>

        {gameOver && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-60 animate-fade-in">
            <h2 className="text-1xl font-bold text-grey-500 mb-4 font-press drop-shadow-[0_2px_2px_rgba(255,255,255,0.7)]">
              Game Over!
            </h2>
            <button
              onClick={init}
              className="mb-3 px-6 py-2 bg-white text-orange-600 font-bold rounded shadow hover:bg-gray-100 transition"
            >
              Play Again
            </button>
            <button
              onClick={shareToX}
              className="px-6 py-2 bg-blue-600 text-white font-bold rounded shadow hover:bg-blue-700 transition"
            >
              Share Score to X (Twitter)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
