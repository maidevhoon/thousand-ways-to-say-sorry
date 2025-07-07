import React from "react";

const packs = [
  {
    title: "The Breakup Bundle",
    emoji: "💔",
    desc: "A collection of apologies for when love goes wrong. Includes: 'It's not you, it's Mercury Retrograde.'"
  },
  {
    title: "The Office Disaster Pack",
    emoji: "💼",
    desc: "For when you CC'd the wrong person or broke the coffee machine. Includes: 'Sorry for the chaos, boss.'"
  },
  {
    title: "Parent Pleaser Pack",
    emoji: "👨‍👩‍👧‍👦",
    desc: "For all the times you forgot to call home. Includes: 'Sorry, Mom, I'll do the dishes.'"
  },
  {
    title: "Ghosted & Guilty",
    emoji: "👻",
    desc: "For when you disappeared from chats. Includes: 'Sorry, I was abducted by aliens (again).'"
  },
  {
    title: "Sorry for Existing Today",
    emoji: "😅",
    desc: "For those days when you're just... sorry for everything. Includes: 'Sorry for breathing too loud.'"
  }
];

export default function ApologyPacks() {
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white/90 rounded-2xl shadow-xl p-8 border-2 border-purple-200">
      <h2 className="text-3xl font-bold text-purple-600 mb-4">Themed Apology Packs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {packs.map((p, i) => (
          <div key={i} className="bg-purple-50 border border-purple-300 rounded-xl p-4 flex flex-col items-center shadow hover:scale-105 transition-transform cursor-pointer">
            <span className="text-4xl mb-2">{p.emoji}</span>
            <div className="font-bold text-lg mb-1">{p.title}</div>
            <div className="text-gray-700 text-center text-sm">{p.desc}</div>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-400 text-center mt-6">(More packs coming soon!)</div>
    </div>
  );
} 