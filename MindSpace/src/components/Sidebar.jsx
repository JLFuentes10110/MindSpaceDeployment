import React from 'react';
import { MessageCircle, BarChart2, Wind, BookOpen, Moon, Sun, LogOut } from 'lucide-react';

const Sidebar = ({ activePage, setActivePage, isDarkMode, setIsDarkMode, onSignOut }) => {
    const navItems = [
        { id: 'chat', label: 'Chat', icon: <MessageCircle strokeWidth={1.5} /> },
        { id: 'mood', label: 'Mood Tracker', icon: <BarChart2 strokeWidth={1.5} /> },
        { id: 'breathing', label: 'Breathing Exercise', icon: <Wind strokeWidth={1.5} /> },
        { id: 'reflection', label: 'Daily Reflection', icon: <BookOpen strokeWidth={1.5} /> },
    ];

    return (
        <div className="w-[280px] bg-white dark:bg-gray-800 transition-colors duration-300 h-screen border-r border-gray-50 dark:border-gray-700/50 flex flex-col pt-10 pb-8 px-6 shadow-[10px_0_40px_rgba(0,0,0,0.02)] z-10 relative">
            <div className="flex items-center gap-4 px-2 mb-12">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-wellness-accent to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-[0_4px_12px_rgba(96,165,250,0.3)]">
                    M
                </div>
                <h1 className="text-[22px] font-bold text-gray-800 dark:text-white tracking-tight">MindSpace</h1>
            </div>

            <nav className="flex-1 flex flex-col gap-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActivePage(item.id)}
                        className={`btn-nav flex items-center gap-4 ${activePage === item.id ? 'active' : ''}`}
                    >
                        <span className="text-2xl drop-shadow-sm">{item.icon}</span>
                        <span className="text-[15px]">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="mt-auto flex flex-col gap-4">
                <button
                    onClick={() => setIsDarkMode(prev => !prev)}
                    className="flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm transition-all duration-300 font-medium text-[14px]"
                >
                    {isDarkMode ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
                    <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>

                <button
                    onClick={onSignOut}
                    className="flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl border border-red-50 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:shadow-sm transition-all duration-300 font-medium text-[14px]"
                >
                    <LogOut size={18} strokeWidth={2} />
                    <span>Sign Out</span>
                </button>

                <div className="bg-gray-50/80 dark:bg-gray-800/80 transition-colors duration-300 border border-gray-100 dark:border-gray-700/50 p-5 rounded-[1.5rem] text-[13px] text-gray-400 dark:text-gray-500 text-center leading-relaxed">
                    MindSpace is not a replacement for therapy.
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
