import React, { useState, useEffect, useRef } from 'react';

const PHASES = [
    { label: 'Inhale',   duration: 4, instruction: 'Breathe in slowly...',  scale: 'scale-100' },
    { label: 'Hold',     duration: 4, instruction: 'Hold your breath...',    scale: 'scale-100' },
    { label: 'Exhale',   duration: 4, instruction: 'Breathe out slowly...', scale: 'scale-50'  },
    { label: 'Hold',     duration: 4, instruction: 'Hold your breath...',    scale: 'scale-50'  },
];

const TOTAL_CYCLE = PHASES.reduce((sum, p) => sum + p.duration, 0); // 16s

const BreathingExercisePage = () => {
    const [isExercising, setIsExercising] = useState(false);
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [countdown, setCountdown] = useState(PHASES[0].duration);
    const [cycles, setCycles] = useState(0);
    const intervalRef = useRef(null);

    const currentPhase = PHASES[phaseIndex];

    // Color per phase
    const phaseColors = {
        'Inhale':  'from-blue-200 to-blue-300 dark:from-blue-800 dark:to-blue-700',
        'Hold':    'from-indigo-200 to-indigo-300 dark:from-indigo-800 dark:to-indigo-700',
        'Exhale':  'from-teal-200 to-teal-300 dark:from-teal-800 dark:to-teal-700',
    };

    const phaseTextColors = {
        'Inhale': 'text-blue-500 dark:text-blue-300',
        'Hold':   'text-indigo-500 dark:text-indigo-300',
        'Exhale': 'text-teal-500 dark:text-teal-300',
    };

    useEffect(() => {
        if (!isExercising) return;

        intervalRef.current = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    // Move to next phase
                    setPhaseIndex(pi => {
                        const next = (pi + 1) % PHASES.length;
                        if (next === 0) setCycles(c => c + 1);
                        setCountdown(PHASES[next].duration);
                        return next;
                    });
                    return PHASES[(phaseIndex + 1) % PHASES.length].duration;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [isExercising, phaseIndex]);

    const handleStart = () => {
        setPhaseIndex(0);
        setCountdown(PHASES[0].duration);
        setCycles(0);
        setIsExercising(true);
    };

    const handleStop = () => {
        clearInterval(intervalRef.current);
        setIsExercising(false);
        setPhaseIndex(0);
        setCountdown(PHASES[0].duration);
    };

    // Circle size: expand on Inhale/Hold-after-inhale, shrink on Exhale/Hold-after-exhale
    const isExpanded = phaseIndex === 0 || phaseIndex === 1;

    return (
        <div className="h-full max-w-3xl mx-auto flex flex-col py-4">
            <div className="mb-8 px-2">
                <h2 className="text-2xl font-semibold text-wellness-text dark:text-gray-100">Breathing Exercise</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Centering your mind through intentional breathing.</p>
            </div>

            <div className="card flex-1 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-800/80 transition-colors duration-300 backdrop-blur-sm border-0 min-h-[400px]">

                {!isExercising ? (
                    /* ── Pre-exercise instructions ── */
                    <div className="text-center max-w-md mx-auto fade-in">
                        <h3 className="text-xl font-medium mb-6 text-wellness-text dark:text-gray-200">Box Breathing Technique</h3>

                        <div className="bg-wellness-lavender/50 dark:bg-gray-700/50 rounded-2xl p-6 mb-10 text-left border border-indigo-50 dark:border-gray-600 leading-loose">
                            <ul className="space-y-3 text-wellness-text/80 dark:text-gray-300 font-medium">
                                {PHASES.map((phase, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-full bg-white dark:bg-gray-600 flex justify-center items-center text-indigo-500 dark:text-indigo-400 shadow-sm font-bold">
                                            {i + 1}
                                        </span>
                                        {phase.label} for {phase.duration} seconds
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button onClick={handleStart} className="btn-primary px-10">
                            Start Exercise
                        </button>
                    </div>

                ) : (
                    /* ── Active exercise ── */
                    <div className="text-center w-full fade-in flex flex-col items-center gap-8">

                        {/* Cycle counter */}
                        <p className="text-sm font-medium text-gray-400 dark:text-gray-500 tracking-widest uppercase">
                            Cycle {cycles + 1}
                        </p>

                        {/* Animated circle */}
                        <div className="relative flex items-center justify-center w-64 h-64">
                            {/* Outer breathing ring */}
                            <div
                                className={`absolute rounded-full bg-gradient-to-br ${phaseColors[currentPhase.label]} opacity-30 transition-all ease-in-out
                                    ${isExpanded ? 'w-64 h-64' : 'w-36 h-36'}
                                `}
                                style={{ transitionDuration: `${currentPhase.duration * 1000}ms` }}
                            />

                            {/* Inner circle */}
                            <div
                                className={`relative rounded-full bg-gradient-to-br ${phaseColors[currentPhase.label]} flex flex-col items-center justify-center shadow-lg transition-all ease-in-out
                                    ${isExpanded ? 'w-48 h-48' : 'w-28 h-28'}
                                `}
                                style={{ transitionDuration: `${currentPhase.duration * 1000}ms` }}
                            >
                                {/* Countdown number */}
                                <span className={`text-4xl font-bold tabular-nums ${phaseTextColors[currentPhase.label]}`}>
                                    {countdown}
                                </span>
                                {/* Phase label */}
                                <span className={`text-xs font-semibold tracking-widest uppercase mt-1 ${phaseTextColors[currentPhase.label]}`}>
                                    {currentPhase.label}
                                </span>
                            </div>
                        </div>

                        {/* Instruction text */}
                        <p className="text-lg font-medium text-gray-500 dark:text-gray-400 transition-all duration-500">
                            {currentPhase.instruction}
                        </p>

                        {/* Phase progress dots */}
                        <div className="flex items-center gap-3">
                            {PHASES.map((phase, i) => (
                                <div
                                    key={i}
                                    className={`h-2 rounded-full transition-all duration-300
                                        ${i === phaseIndex
                                            ? 'w-8 bg-wellness-accent'
                                            : 'w-2 bg-gray-200 dark:bg-gray-600'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleStop}
                            className="text-gray-400 dark:text-gray-500 hover:text-wellness-text dark:hover:text-gray-300 transition-colors font-medium"
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