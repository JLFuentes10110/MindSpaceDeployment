import React, { useState } from 'react';

const BreathingExercisePage = () => {
    const [isExercising, setIsExercising] = useState(false);

    const startExercise = () => {
        setIsExercising(true);
    };

    return (
        <div className="h-full max-w-3xl mx-auto flex flex-col py-4">
            <div className="mb-8 px-2">
                <h2 className="text-2xl font-semibold text-wellness-text dark:text-gray-100">Breathing Exercise</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Centering your mind through intentional breathing.</p>
            </div>

            <div className="card flex-1 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-800/80 transition-colors duration-300 backdrop-blur-sm border-0 min-h-[400px]">

                {!isExercising ? (
                    <div className="text-center max-w-md mx-auto fade-in">
                        <h3 className="text-xl font-medium mb-6 text-wellness-text dark:text-gray-200">Box Breathing Technique</h3>

                        <div className="bg-wellness-lavender/50 dark:bg-gray-700/50 rounded-2xl p-6 mb-10 text-left border border-indigo-50 dark:border-gray-600 leading-loose">
                            <ul className="space-y-3 text-wellness-text/80 dark:text-gray-300 font-medium">
                                <li className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-white dark:bg-gray-600 flex justify-center items-center text-indigo-500 dark:text-indigo-400 shadow-sm">1</span> Inhale for 4 seconds</li>
                                <li className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-white dark:bg-gray-600 flex justify-center items-center text-indigo-500 dark:text-indigo-400 shadow-sm">2</span> Hold for 4 seconds</li>
                                <li className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-white dark:bg-gray-600 flex justify-center items-center text-indigo-500 dark:text-indigo-400 shadow-sm">3</span> Exhale for 4 seconds</li>
                                <li className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-white dark:bg-gray-600 flex justify-center items-center text-indigo-500 dark:text-indigo-400 shadow-sm">4</span> Hold for 4 seconds</li>
                            </ul>
                        </div>

                        <button onClick={startExercise} className="btn-primary px-10">
                            Start Exercise
                        </button>
                    </div>
                ) : (
                    <div className="text-center w-full fade-in flex flex-col items-center">

                        <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
                            {/* Outer pulsing ring */}
                            <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/40 rounded-full animate-[pulse_4s_ease-in-out_infinite_alternate] opacity-50"></div>
                            {/* Inner static circle */}
                            <div className="relative w-48 h-48 bg-gradient-to-tr from-wellness-blue to-wellness-lavender dark:from-gray-700 dark:to-gray-600 rounded-full shadow-inner flex items-center justify-center">
                                <span className="text-2xl font-medium text-wellness-accent/80 dark:text-blue-300 tracking-widest text-center px-4">
                                    Breathe in slowly...
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsExercising(false)}
                            className="text-gray-400 dark:text-gray-500 hover:text-wellness-text dark:hover:text-gray-300 transition-colors mt-8 font-medium"
                        >
                            Stop Exercise
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default BreathingExercisePage;
