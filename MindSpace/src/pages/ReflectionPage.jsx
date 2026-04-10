import React, { useState, useEffect } from 'react';
import { apiFetch } from '../utils/api';

const ReflectionPage = ({ onUnauthorized }) => {
    const [selectedPrompt, setSelectedPrompt] = useState('What emotion did I experience most today?');
    const [reflectionText, setReflectionText] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);

    const prompts = [
        'What emotion did I experience most today?',
        'What situation affected my mood today?',
        'What is something small I am grateful for?',
        'What challenge helped me grow today?',
    ];

    useEffect(() => {
        fetchReflectionHistory();
    }, []);

    const fetchReflectionHistory = async () => {
        setError(null);
        try {
            const data = await apiFetch('/api/reflection');
            setHistory(data);
        } catch (err) {
            if (err.status === 401) {
                onUnauthorized?.();
                return;
            }
            setError(err.message);
        }
    };

    const handleSave = async () => {
        if (!reflectionText.trim()) return;

        setError(null);
        try {
            await apiFetch('/api/reflection', {
                method: 'POST',
                body: JSON.stringify({ prompt: selectedPrompt, text: reflectionText }),
            });

            setShowConfirmation(true);
            setReflectionText('');
            setTimeout(() => setShowConfirmation(false), 3000);
            fetchReflectionHistory();
        } catch (err) {
            if (err.status === 401) {
                onUnauthorized?.();
                return;
            }
            setError(err.message);
        }
    };

    return (
        <div className="h-full max-w-4xl mx-auto flex flex-col py-8">
            <div className="mb-10 px-4">
                <h2 className="text-[28px] font-bold text-gray-800 dark:text-gray-100 tracking-tight">Daily Reflection</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-[15px]">A private place to journal your thoughts.</p>
                {error && <p className="text-sm text-red-600 dark:text-red-400 mt-2">{error}</p>}
            </div>

            <div className="card flex-1 flex flex-col bg-white/90 dark:bg-gray-800/90 transition-colors duration-300 backdrop-blur-xl shadow-[0_15px_60px_rgba(0,0,0,0.03)] dark:shadow-none border-0 px-8 py-10">
                <div className="mb-8">
                    <label className="block text-[14px] font-semibold text-gray-400 tracking-wide uppercase mb-3 ml-2">Choose a prompt</label>
                    <div className=" relative">
                        <select
                            value={selectedPrompt}
                            onChange={(e) => setSelectedPrompt(e.target.value)}
                            className="w-full appearance-none bg-gray-50/50 dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-[1.5rem] px-6 py-4.5 text-gray-700 dark:text-gray-200 outline-none focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 focus:border-blue-200 dark:focus:border-blue-700 transition-all font-medium pr-10 text-[15px] shadow-[0_2px_10px_rgba(0,0,0,0.01)] dark:shadow-none cursor-pointer"
                        >
                            {prompts.map((p, i) => (
                                <option key={i} value={p}>
                                    {p}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-gray-400 dark:text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path
                                    fillRule="evenodd"
                                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex-1 min-h-[300px] mb-8 relative">
                    <textarea
                        value={reflectionText}
                        onChange={(e) => setReflectionText(e.target.value)}
                        placeholder="Write your reflection here..."
                        className="w-full h-full bg-[#fcfdff] dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 rounded-[2rem] p-8 outline-none focus:ring-4 focus:ring-blue-100/40 dark:focus:ring-blue-900/40 focus:border-blue-200 dark:focus:border-blue-700 transition-all resize-none text-gray-700 dark:text-gray-200 text-[16px] leading-[1.8] shadow-inner dark:shadow-none placeholder-gray-300 dark:placeholder-gray-500"
                    ></textarea>
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-700/50 pt-8 px-2">
                    <div className="h-8">
                        {showConfirmation && (
                            <span className="text-green-600 dark:text-green-400 font-semibold text-[14px] animate-fade-in-up flex items-center gap-2 bg-green-50/80 dark:bg-green-900/30 px-4 py-2 rounded-full border border-green-100/50 dark:border-green-800/50 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                </svg>
                                Reflection saved to journal
                            </span>
                        )}
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={!reflectionText.trim()}
                        className={`px-10 py-4 rounded-full font-semibold transition-all duration-300 ${reflectionText.trim()
                            ? 'bg-wellness-accent text-white hover:bg-wellness-accent-hover shadow-[0_8px_20px_rgba(96,165,250,0.3)] hover:shadow-[0_12px_25px_rgba(96,165,250,0.4)] hover:-translate-y-0.5'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        Save Reflection
                    </button>
                </div>

                {history.length > 0 && (
                    <div className="mt-10 text-sm text-gray-600 dark:text-gray-300">
                        <h3 className="font-semibold mb-2">Recent reflections</h3>
                        <ul className="space-y-4">
                            {history.slice(-3).reverse().map((entry) => (
                                <li key={entry.id} className="border border-gray-100 dark:border-gray-700 rounded-2xl p-4">
                                    <div className="text-xs text-gray-400 mb-1 ">{new Date(entry.timestamp).toLocaleString()}</div>
                                    <div className="font-semibold mb-1">{entry.prompt}</div>
                                    <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">{entry.text}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReflectionPage;
