import React, { useState, useEffect } from 'react';
import { Frown, Meh, Smile, CloudRain, Sun, Zap } from 'lucide-react';
import { apiFetch } from '../utils/api';

const MoodTrackerPage = ({ onUnauthorized }) => {
    const [selectedMood, setSelectedMood] = useState('Calm');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [error, setError] = useState(null);
    const [moodHistory, setMoodHistory] = useState([]);

    const moods = [
        { label: 'Very Sad', emoji: <CloudRain size={40} strokeWidth={1.5} />, color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
        { label: 'Sad', emoji: <Frown size={40} strokeWidth={1.5} />, color: 'bg-blue-50 text-blue-600 border-blue-100' },
        { label: 'Neutral', emoji: <Meh size={40} strokeWidth={1.5} />, color: 'bg-gray-50 text-gray-600 border-gray-100' },
        { label: 'Calm', emoji: <Smile size={40} strokeWidth={1.5} />, color: 'bg-teal-50 text-teal-600 border-teal-100' },
        { label: 'Happy', emoji: <Sun size={40} strokeWidth={1.5} />, color: 'bg-green-50 text-green-600 border-green-100' },
        { label: 'Very Happy', emoji: <Zap size={40} strokeWidth={1.5} />, color: 'bg-yellow-50 text-yellow-600 border-yellow-100' },
    ];

    useEffect(() => {
        fetchMoodHistory();
    }, []);

    const fetchMoodHistory = async () => {
        setError(null);
        try {
            const data = await apiFetch('/api/mood');
            setMoodHistory(data);
            if (data.length) {
                setSelectedMood(data[data.length - 1].mood);
            }
        } catch (err) {
            if (err.status === 401) {
                onUnauthorized?.();
                return;
            }
            setError(err.message);
        }
    };

    const handleLogMood = async () => {
        setError(null);
        try {
            await apiFetch('/api/mood', {
                method: 'POST',
                body: JSON.stringify({ mood: selectedMood }),
            });
            setShowConfirmation(true);
            setTimeout(() => setShowConfirmation(false), 3000);
            fetchMoodHistory();
        } catch (err) {
            if (err.status === 401) {
                onUnauthorized?.();
                return;
            }
            setError(err.message);
        }
    };

    return (
        <div className="h-full max-w-3xl mx-auto flex flex-col py-8">
            <div className="mb-10 px-4">
                <h2 className="text-[28px] font-bold text-gray-800 dark:text-gray-100 tracking-tight">Mood Tracker</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-[15px]">Take a moment to check in with yourself.</p>
                {error && <p className="text-sm text-red-600 dark:text-red-400 mt-2">{error}</p>}
            </div>

            <div className="card shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-none border-0 bg-white/90 dark:bg-gray-800/90 transition-colors duration-300 backdrop-blur-xl self-center w-full max-w-2xl px-10 py-12">
                <h3 className="text-[19px] font-semibold text-gray-700 dark:text-gray-200 text-center mb-10">How are you feeling right now?</h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-12">
                    {moods.map((mood) => {
                        const isSelected = selectedMood === mood.label;
                        return (
                            <button
                                key={mood.label}
                                onClick={() => setSelectedMood(mood.label)}
                                className={`p-6 rounded-[2rem] border transition-all duration-300 flex flex-col items-center gap-3
                  ${isSelected ? `${mood.color} shadow-[0_8px_25px_rgba(0,0,0,0.08)] dark:shadow-none scale-[1.02] border-transparent ring-2 ring-offset-2 dark:ring-offset-gray-900 ring-blue-100 dark:ring-blue-800/50` : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-blue-100 dark:hover:border-blue-900/50 text-gray-400 dark:text-gray-500 hover:bg-blue-50/30 dark:hover:bg-gray-700/50 hover:shadow-[0_8px_25px_rgba(0,0,0,0.03)] dark:hover:shadow-none hover:-translate-y-1'}`}
                            >
                                <div className="mb-1">{mood.emoji}</div>
                                <span className={`font-semibold text-[15px] ${isSelected ? 'text-inherit' : 'text-gray-500 dark:text-gray-400'}`}>{mood.label}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="flex flex-col items-center mt-4">
                    <button
                        onClick={handleLogMood}
                        className="btn-primary w-full max-w-sm text-[16px] py-4 rounded-full"
                    >
                        Log Mood
                    </button>

                    <div className="h-10 mt-6 flex items-center justify-center">
                        {showConfirmation && (
                            <div className="px-6 py-2.5 bg-green-50/80 dark:bg-green-900/30 backdrop-blur-sm text-green-700 dark:text-green-400 rounded-full text-[14px] font-semibold flex items-center gap-2 animate-fade-in-up border border-green-100/50 dark:border-green-800/50 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" /></svg>
                                Mood logged successfully
                            </div>
                        )}
                    </div>

                    {moodHistory.length > 0 && (
                        <div className="mt-8 w-full text-sm text-gray-500 dark:text-gray-400">
                            <div className="font-semibold mb-2">Recent logs:</div>
                            <ul className="space-y-1">
                                {moodHistory.slice(-3).reverse().map((entry) => (
                                    <li key={entry.id} className="flex items-center justify-between">
                                        <span>{entry.mood}</span>
                                        <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString()}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MoodTrackerPage;
