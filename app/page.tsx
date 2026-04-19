'use client';
import { useState } from 'react';

export default function Home() {
  const [description, setDescription] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOutput('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, analysis }),
      });
      const data = await res.json();
      setOutput(data.result || data.error || 'No response');
    } catch(err: any) { setOutput('Error: ' + err.message); }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <div className="text-4xl mb-3">📷</div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">AI Photo Composition Advisor</h1>
            <p className="text-gray-400">Get expert composition feedback using classical photography principles</p>
          </div>
          <form onSubmit={handleGenerate} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Photo Description</label>
              <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={4}
                placeholder="Describe your photo: subject(s), setting, lighting, what you were trying to capture..."
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">What You Want to Improve (optional)</label>
              <input type="text" value={analysis} onChange={e=>setAnalysis(e.target.value)} placeholder="e.g. better framing, more dynamic composition"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-white disabled:opacity-50 transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #6366f1, #2563eb)' }}>
              {loading ? '📷 Analyzing...' : '📷 Analyze Composition'}
            </button>
          </form>
          {output && (
            <div className="mt-6 p-5 bg-gray-800/70 border border-gray-700 rounded-xl">
              <h3 className="text-sm font-semibold text-indigo-400 mb-3">Composition Analysis</h3>
              <pre className="whitespace-pre-wrap text-sm text-gray-200 font-mono">{output}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
