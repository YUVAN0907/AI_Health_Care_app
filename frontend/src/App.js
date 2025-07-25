import React, { useState } from 'react';
import './App.css';

function App() {
  const [symptoms, setSymptoms] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setReport(null);
    const formData = new FormData();
    formData.append('symptoms', symptoms);
    if (file) formData.append('report', file);
    try {
      const res = await fetch('http://localhost:5000/api/diagnose', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to get diagnosis');
      const data = await res.json();
      setReport(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">AI Health Care Diagnostic</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Symptoms (comma separated)</label>
            <textarea
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
              value={symptoms}
              onChange={e => setSymptoms(e.target.value)}
              placeholder="e.g. fever, cough, headache"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Upload Medical Report (PDF or Image)</label>
            <input
              type="file"
              accept=".pdf,image/*"
              className="w-full"
              onChange={e => setFile(e.target.files[0])}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Get Diagnostic Report'}
          </button>
        </form>
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
        {report && (
          <div className="mt-6 bg-gray-50 p-4 rounded border border-gray-200">
            <h2 className="text-lg font-bold mb-2 text-blue-700">Diagnostic Report</h2>
            <div><span className="font-semibold">Probable Condition(s):</span> {report.conditions}</div>
            <div><span className="font-semibold">Recommended Tests:</span> {report.tests}</div>
            <div><span className="font-semibold">Specialist Suggestion:</span> {report.specialist}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
