import React, { useState } from "react";

const relationships = ["Partner", "Mom", "Dad", "Friend", "Boss", "Stranger"];
const tones = [
  "Genuine & Heartfelt",
  "Funny & Sarcastic",
  "Overdramatic Bollywood Style",
  "Passive-Aggressive",
  "Gaslight Special",
  "Corporate Sorry"
];
const lengths = ["Short", "Medium", "Long"];
const languages = ["English", "Hindi", "Hinglish", "Shakespearean", "Gen-Z slang", "Formal apology"];

const GEMINI_API_KEY = "AIzaSyDMd88FUr6mhfxsU7JK9q2nbCCh6MMSXS0";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
const SHEETDB_API_URL = "https://sheetdb.io/api/v1/c6636bqs59ks5";

export default function ApologyGenerator() {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState(relationships[0]);
  const [tone, setTone] = useState(tones[0]);
  const [length, setLength] = useState(lengths[0]);
  const [language, setLanguage] = useState(languages[0]);
  const [apology, setApology] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    setLoading(true);
    setError("");
    setApology("");
    const prompt = `Write a ${tone.toLowerCase()} apology to my ${relationship} in ${language.toLowerCase()} style. Make it ${length.toLowerCase()}. Be creative and engaging.`;
    try {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      const data = await response.json();
      if (data && data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        setApology(data.candidates[0].content.parts[0].text);
        // Save to Google Sheet
        try {
          await fetch(SHEETDB_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              data: [{
                Name: name,
                Relationship: relationship,
                Tone: tone,
                Length: length,
                Language: language,
                Apology: data.candidates[0].content.parts[0].text,
                Timestamp: new Date().toLocaleString(),
                Incognito: "No"
              }]
            })
          });
        } catch (sheetErr) {
          // Optionally handle sheet error
        }
      } else if (data && data.error && data.error.message) {
        setError(`API Error: ${data.error.message}`);
      } else {
        setError("Failed to get response from AI. Please try again.");
      }
    } catch (err) {
      setError("Error connecting to AI service. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white/90 rounded-2xl shadow-xl p-8 border-2 border-pink-200">
      <h2 className="text-3xl font-bold text-pink-600 mb-4">Apology Generator</h2>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Your Name <span className="text-red-500">*</span></label>
        <input
          type="text"
          className="w-full rounded p-2 border"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter your name"
          disabled={loading}
          required
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-1">Relationship</label>
          <select className="w-full rounded p-2 border" value={relationship} onChange={e => setRelationship(e.target.value)} disabled={loading}>
            {relationships.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Tone</label>
          <select className="w-full rounded p-2 border" value={tone} onChange={e => setTone(e.target.value)} disabled={loading}>
            {tones.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Length</label>
          <select className="w-full rounded p-2 border" value={length} onChange={e => setLength(e.target.value)} disabled={loading}>
            {lengths.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Language/Tone</label>
          <select className="w-full rounded p-2 border" value={language} onChange={e => setLanguage(e.target.value)} disabled={loading}>
            {languages.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
      </div>
      <button onClick={handleGenerate} className="w-full py-3 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-400 text-white font-bold rounded-lg shadow-lg transition-all mb-6" disabled={loading || !name.trim()}>
        {loading ? "🤖 Generating..." : "✨ Generate Apology"}
      </button>
      <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 min-h-[100px] text-gray-700 whitespace-pre-line">
        {error && <div className="text-red-600 font-medium mb-2">❌ {error}</div>}
        {loading && <div className="text-pink-600 font-medium">⏳ AI is crafting your perfect apology...</div>}
        {!loading && !error && apology && (
          <div>
            <div className="font-semibold text-pink-700 mb-2">🤖 AI Generated Apology:</div>
            {apology}
          </div>
        )}
        {!loading && !error && !apology && <span className="text-gray-400">Your generated apology will appear here...</span>}
      </div>
    </div>
  );
} 