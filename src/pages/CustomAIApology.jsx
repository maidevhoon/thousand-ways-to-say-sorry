import React, { useState } from "react";

const styles = [
  "Genuine & Heartfelt",
  "Funny & Sarcastic",
  "Overdramatic Bollywood Style",
  "Passive-Aggressive",
  "Gaslight Special",
  "Corporate Sorry"
];

const GEMINI_API_KEY = "AIzaSyDMd88FUr6mhfxsU7JK9q2nbCCh6MMSXS0";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
const SHEETDB_API_URL = "https://sheetdb.io/api/v1/c6636bqs59ks5";

export default function CustomAIApology() {
  const [name, setName] = useState("");
  const [input, setInput] = useState("");
  const [style, setStyle] = useState(styles[0]);
  const [apology, setApology] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!input.trim()) {
      setError("Please describe what you did wrong first!");
      return;
    }

    setLoading(true);
    setError("");
    setApology("");

    const prompt = `Write a ${style.toLowerCase()} apology for: "${input}". Make it creative, relatable, and in the style requested. Keep it under 200 words.`;

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
                Relationship: "",
                Tone: style,
                Length: "",
                Language: "",
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
    <div className="max-w-2xl mx-auto mt-10 bg-white/90 rounded-2xl shadow-xl p-8 border-2 border-blue-200">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">AI-Powered Custom Apology</h2>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Your Name <span className="text-red-500">*</span></label>
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
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">What did you do wrong?</label>
        <textarea
          className="w-full rounded-lg border-2 border-gray-200 p-3 min-h-[80px] focus:border-blue-400 focus:outline-none transition-colors"
          placeholder="Describe what you did wrong... (e.g., 'I forgot our anniversary', 'I broke the coffee machine at work', 'I ghosted my friend for a week')"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Apology Style</label>
        <select 
          className="w-full rounded-lg border-2 border-gray-200 p-3 focus:border-blue-400 focus:outline-none transition-colors" 
          value={style} 
          onChange={e => setStyle(e.target.value)}
          disabled={loading}
        >
          {styles.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <button 
        onClick={handleGenerate} 
        className="w-full py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold rounded-lg shadow-lg transition-all text-lg"
        disabled={loading || !input.trim() || !name.trim()}
      >
        {loading ? "🤖 AI is crafting your apology..." : "✨ Generate AI Apology"}
      </button>
      
      <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4 min-h-[120px]">
        {error && (
          <div className="text-red-600 font-medium mb-2">❌ {error}</div>
        )}
        {loading && (
          <div className="text-blue-600 font-medium">⏳ Generating your perfect apology...</div>
        )}
        {!loading && !error && apology && (
          <div className="text-gray-800 whitespace-pre-line leading-relaxed">
            <div className="font-semibold text-blue-700 mb-2">🤖 AI Generated Apology:</div>
            {apology}
          </div>
        )}
        {!loading && !error && !apology && (
          <div className="text-gray-500 italic">
            Your AI-generated apology will appear here...
          </div>
        )}
      </div>
    </div>
  );
} 