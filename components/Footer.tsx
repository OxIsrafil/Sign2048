"use client";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-bgDark text-center text-white text-sm font-press animate-fade-in border-t border-orangeDynasty shadow-inner">
      <p className="animate-pulse">
        Built by{" "}
        <a
          href="https://x.com/OxIsrafil"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orangeDynasty hover:underline hover:drop-shadow-md transition-all duration-300"
        >
          ISRAFIL
        </a>{" "}
        — Follow on{" "}
        <a
          href="https://github.com/OxIsrafil"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orangeDynasty hover:underline hover:drop-shadow-md transition-all duration-300"
        >
          GitHub
        </a>
      </p>
      <p className="mt-3 text-xs text-gray-400 tracking-wider">
        A product of SignLab
      </p>
      <p className="mt-1 text-xs text-gray-400 tracking-wider">
Part of the Sign ecosystem

      </p>
    </footer>
  );
}
