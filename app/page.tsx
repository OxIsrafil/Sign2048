import GameBoard from "../components/GameBoard";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-orangeDynasty text-white text-center">
      <GameBoard />
    </main>
  );
}