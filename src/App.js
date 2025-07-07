import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import ApologyGenerator from "./pages/ApologyGenerator";
import SorryTemplates from "./pages/SorryTemplates";
import CustomAIApology from "./pages/CustomAIApology";
import ApologyPacks from "./pages/ApologyPacks";
import IncognitoSorry from "./pages/IncognitoSorry";
import creatorImg from "./img/IMG-20250629-WA0004-removebg-preview.png";

function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
      <div className="max-w-xl w-full text-center bg-white/80 rounded-3xl shadow-2xl p-8 border-4 border-dashed border-pink-300 relative">
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl animate-bounce">🥲</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-pink-600 mb-2 drop-shadow-lg">
          Thousand Ways to Say Sorry
        </h1>
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative w-40 h-40 sm:w-56 sm:h-56 mx-auto mb-2">
            <img
              src={creatorImg}
              alt="Creator"
              className="w-full h-full object-contain rounded-full shadow-2xl border-4 border-pink-300 bg-gradient-to-tr from-yellow-100 via-pink-100 to-blue-100 hover:scale-105 transition-transform duration-300"
              style={{ filter: "drop-shadow(0 8px 24px rgba(255, 0, 128, 0.15))" }}
            />
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-xs px-3 py-1 rounded-full shadow-lg animate-bounce">✨ The Creator ✨</span>
          </div>
          <div className="text-pink-600 font-bold text-lg mt-2">Thank you, Dev Pratap Singh!</div>
          <a
            href="https://www.linkedin.com/in/maidevhoon/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg text-base transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.034 0 3.595 1.997 3.595 4.59v5.606z"/></svg>
            Connect on LinkedIn
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-6 mt-2">
          <span className="bg-yellow-200 rounded-full px-3 py-1 text-xs font-bold text-yellow-800 shadow">#ApologyMeme</span>
          <span className="bg-blue-200 rounded-full px-3 py-1 text-xs font-bold text-blue-800 shadow">#SorryNotSorry</span>
          <span className="bg-pink-100 rounded-full px-3 py-1 text-xs font-bold text-pink-700 shadow">#Oops</span>
          <span className="bg-green-100 rounded-full px-3 py-1 text-xs font-bold text-green-700 shadow">#ForgiveMe</span>
        </div>
        <Link to="/apology-generator">
          <button className="mt-2 px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white text-xl font-bold rounded-full shadow-lg transition-all duration-200 ease-in-out animate-pulse">
            Start Apologizing 🚀
          </button>
        </Link>
        <div className="mt-8 flex flex-col items-center gap-2">
          <span className="text-2xl">😂 🙏 😬 🥹 💌 🐶 👩‍💼 👨‍👩‍👧‍👦 🫣</span>
          <span className="text-xs text-gray-400">Meme-worthy. Relatable. 100% Sorry.</span>
        </div>
      </div>
      <footer className="mt-10 text-xs text-gray-400 text-center">
        © 2025 Thousand Ways to Say Sorry. Made with <span className="text-pink-400">&#10084;&#65039;</span> and by Dev Pratap Singh!
      </footer>
    </div>
  );
}

const navLinks = [
  { to: "/", label: "Apology Generator", className: "text-pink-600 font-bold" },
  { to: "/templates", label: "Sorry Personas", className: "text-yellow-700 font-bold" },
  { to: "/ai-apology", label: "AI Apology", className: "text-blue-700 font-bold" },
  { to: "/packs", label: "Apology Packs", className: "text-purple-600 font-bold" },
  { to: "/incognito", label: "Incognito Sorry", className: "text-gray-700 font-bold" },
];

function NavBar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative z-50">
      <button
        className="fixed top-4 left-4 z-50 bg-white/90 dark:bg-gray-900 text-gray-800 dark:text-white rounded-full p-3 shadow-lg border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open menu"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center" style={{zIndex: 1000}}>
          {/* Animated glassmorphism menu */}
          <div ref={menuRef} className="relative animate-fade-in-up">
            {/* Close button */}
            <button
              className="absolute -top-6 -right-6 bg-white/80 dark:bg-gray-800 text-gray-800 dark:text-white rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-pink-200 hover:text-pink-700 transition-colors z-10"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-900/70 rounded-3xl shadow-2xl border-4 border-pink-200 p-8 flex flex-col gap-6 min-w-[300px] max-w-xs items-center max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={
                    "text-black " +
                    link.className +
                    " text-lg font-bold px-6 py-4 rounded-2xl shadow-md border-2 border-transparent mb-1 bg-white/80 dark:bg-gray-800/80 hover:scale-105 hover:border-pink-400 hover:shadow-pink-200 dark:hover:shadow-pink-800 focus:outline-none focus:ring-2 focus:ring-pink-400 flex items-center justify-center transition-all duration-200 group relative overflow-hidden"
                  }
                  style={{ textDecoration: "none" }}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Animated border/glow on hover */}
                  <span className="absolute inset-0 rounded-2xl pointer-events-none group-hover:animate-glow group-focus:animate-glow" style={{boxShadow: '0 0 16px 4px #ec4899, 0 0 32px 8px #f472b6'}}></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/apology-generator" element={<ApologyGenerator />} />
        <Route path="/templates" element={<SorryTemplates />} />
        <Route path="/ai-apology" element={<CustomAIApology />} />
        <Route path="/packs" element={<ApologyPacks />} />
        <Route path="/incognito" element={<IncognitoSorry />} />
      </Routes>
    </Router>
  );
}

export default App;
