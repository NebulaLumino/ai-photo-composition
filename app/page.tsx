'use client';
import { useState } from 'react';

export default function Home() {
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('Portrait');
  const [lighting, setLighting] = useState('');
  const [goal, setGoal] = useState('General improvement');
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
        body: JSON.stringify({ description, genre, lighting, goal }),
      });
      const data = await res.json();
      setOutput(data.result || data.error || 'No response generated.');
    } catch (e: any) {
      setOutput('Error: ' + e.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white font-sans">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 mb-6">
            <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            AI Photo Composition Advisor
          </h1>
          <p className="text-gray-400 text-lg">Get expert composition & lighting advice for any photo</p>
        </header>

        <form onSubmit={handleGenerate} className="space-y-5 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Photo Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4}
              placeholder="Describe your photo: subject, setting, what you were trying to capture..." required
              className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Photo Genre</label>
              <select value={genre} onChange={e => setGenre(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors">
                {['Portrait', 'Landscape', 'Street', 'Wildlife', 'Architecture', 'Sports', 'Food', 'Fashion', 'Macro', 'Night', 'Astrophotography', 'Documentary'].map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Lighting Condition</label>
              <input value={lighting} onChange={e => setLighting(e.target.value)} placeholder="e.g. Golden hour, overcast, indoor mixed..."
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Your Goal</label>
            <select value={goal} onChange={e => setGoal(e.target.value)}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors">
              {['General improvement', 'Prepare for a competition', 'Social media post', 'Print/poster', 'Professional portfolio', 'Stock photography', 'Client work'].map(g => <option key={g}>{g}</option>)}
            </select>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-4 rounded-xl font-semibold text-white bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.01] active:scale-[0.99]">
            {loading ? '📷 Analyzing Composition...' : '📷 Get Composition Advice'}
          </button>
        </form>

        {output && (
          <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-3">Composition Analysis</h3>
            <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono leading-relaxed">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
