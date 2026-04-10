import React from 'react';
import { ArrowRight, Heart, Shield, Activity } from 'lucide-react';

const LandingPage = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-wellness-gray dark:bg-gray-900 transition-colors duration-300 flex flex-col font-sans overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-wellness-blue/60 to-transparent dark:from-blue-900/20 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-wellness-lavender/60 to-transparent dark:from-indigo-900/20 rounded-full blur-3xl opacity-60 translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

            {/* Navigation */}
            <nav className="w-full px-8 lg:px-16 py-8 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-wellness-accent to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-[0_4px_12px_rgba(96,165,250,0.3)]">
                        M
                    </div>
                    <span className="text-[22px] font-bold text-gray-800 dark:text-white tracking-tight">MindSpace</span>
                </div>
                <button
                    onClick={() => onNavigate('signin')}
                    className="px-6 py-2.5 rounded-full font-medium text-wellness-accent hover:text-wellness-accent-hover bg-blue-50/50 dark:bg-blue-900/20 hover:bg-blue-50 dark:hover:bg-blue-900/40 transition-colors border border-blue-100 dark:border-blue-800/50"
                >
                    Sign In
                </button>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center px-6 text-center z-10 pb-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm mb-10 animate-fade-in-up">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Your safe space for reflection</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.15] mb-6 max-w-4xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    Find clarity in the <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-wellness-accent to-indigo-400">chaos of everyday life.</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mb-12 animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
                    MindSpace is a digital emotional reflection assistant designed to help you track moods, practice breathing exercises, and write guided reflections.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <button
                        onClick={() => onNavigate('signin')}
                        className="btn-primary px-10 py-5 rounded-[2rem] text-lg flex items-center justify-center gap-2 group"
                    >
                        Start Your Journey
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                        className="px-10 py-5 rounded-[2rem] text-lg font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm hover:shadow-md"
                    >
                        Learn More
                    </button>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto px-4 w-full animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="bg-white/60 dark:bg-gray-800/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 dark:border-gray-700/50 text-left">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center text-wellness-accent mb-6">
                            <Heart size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Emotional Tracking</h3>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">Log your daily moods and identify patterns in your emotional well-being over time.</p>
                    </div>

                    <div className="bg-white/60 dark:bg-gray-800/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 dark:border-gray-700/50 text-left">
                        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl flex items-center justify-center text-indigo-500 mb-6">
                            <Activity size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Guided Exercises</h3>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">Center your mind through intentional box breathing techniques and immediate stress relief.</p>
                    </div>

                    <div className="bg-white/60 dark:bg-gray-800/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 dark:border-gray-700/50 text-left">
                        <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/40 rounded-2xl flex items-center justify-center text-teal-500 mb-6">
                            <Shield size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Private Sandbox</h3>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">A completely secure and non-clinical space to express your thoughts completely privately.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
