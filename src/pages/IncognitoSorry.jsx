import React, { useState } from "react";

const SHEETDB_API_URL = "https://sheetdb.io/api/v1/c6636bqs59ks5";

export default function IncognitoSorry() {
  const [apology, setApology] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    setLoading(true);
    setError("");
    try {
      // Save to Google Sheet
      await fetch(SHEETDB_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [{
            Name: "Anonymous",
            Relationship: "",
            Tone: "",
            Length: "",
            Language: "",
            Apology: apology,
            Timestamp: new Date().toLocaleString(),
            Incognito: "Yes"
          }]
        })
      });
      setSent(true);
    } catch (err) {
      setError("Failed to send apology. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white/90 rounded-2xl shadow-xl p-8 border-2 border-gray-300">
      <h2 className="text-3xl font-bold text-gray-700 mb-4">Incognito Sorry</h2>
      <p className="mb-4 text-gray-500">Send an anonymous apology. No names, no judgment, just pure regret.</p>
      <textarea
        className="w-full rounded border p-2 mb-4 min-h-[80px]"
        placeholder="Type your anonymous apology here..."
        value={apology}
        onChange={e => setApology(e.target.value)}
        disabled={sent || loading}
      />
      <button
        className="w-full py-3 bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-lg shadow-lg transition-all mb-4 disabled:bg-gray-400"
        onClick={handleSend}
        disabled={sent || !apology.trim() || loading}
      >
        {loading ? "Sending..." : sent ? "Sent!" : "Send Anonymously"}
      </button>
      {error && <div className="text-red-600 font-medium mb-2">{error}</div>}
      {sent && <div className="text-green-600 text-center font-bold">Your anonymous sorry has been sent! 🕵️‍♂️</div>}
    </div>
  );
} 