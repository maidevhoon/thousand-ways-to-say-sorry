import React from "react";

const templates = [
  {
    title: "Sorry as your Dog",
    emoji: "🐶",
    text: "Woof woof... I chewed up your trust, but I promise to wag my tail extra hard in apology! 🦴"
  },
  {
    title: "Sorry in Emojis Only",
    emoji: "😭🙏💔🥺",
    text: "😭🙏💔🥺"
  },
  {
    title: "Sorry from Your Inner Child",
    emoji: "🧸",
    text: "I'm just a little me, scared and sorry. Can we have a do-over and a hug? 🧸"
  },
  {
    title: "Sorry... but Blaming Mercury Retrograde",
    emoji: "🪐",
    text: "It's not me, it's Mercury Retrograde. Sorry for all the chaos! 🪐✨"
  }
];

export default function SorryTemplates() {
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white/90 rounded-2xl shadow-xl p-8 border-2 border-yellow-200">
      <h2 className="text-3xl font-bold text-yellow-600 mb-4">Sorry Personas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {templates.map((t, i) => (
          <div key={i} className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 flex flex-col items-center shadow hover:scale-105 transition-transform cursor-pointer">
            <span className="text-4xl mb-2">{t.emoji}</span>
            <div className="font-bold text-lg mb-1">{t.title}</div>
            <div className="text-gray-700 text-center text-sm">{t.text}</div>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-400 text-center mt-6">(More templates coming soon!)</div>
    </div>
  );
} 