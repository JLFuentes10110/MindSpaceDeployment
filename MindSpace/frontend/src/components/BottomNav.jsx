import React from 'react';
import { MessageCircle, BarChart2, Wind, BookOpen, Moon, Sun, LogOut } from 'lucide-react';

const BottomNav = ({ activePage, setActivePage, isDarkMode, setIsDarkMode, onSignOut }) => {
    const navItems = [
        { id: 'chat', label: 'Chat', icon: <MessageCircle size={22} strokeWidth={1.5} /> },
        { id: 'mood', label: 'Mood', icon: <BarChart2 size={22} strokeWidth={1.5} /> },
        { id: 'breathing', label: 'Breathe', icon: <Wind size={22} strokeWidth={1.5} /> },
        { id: 'reflection', label: 'Journal', icon: <BookOpen size={22} strokeWidth={1.5} /> },
    ];

    return (
        // visible on mobile only, hidden from lg breakpoint up
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-700/50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">

            {/* Main nav items */}
            <div className="flex items-center justify-around px-2 pt-2 pb-1">
                {navItems.map((item) => {
                    const isActive = activePage === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActivePage(item.id)}
                            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200 min-w-[60px]
                                ${isActive
                                    ? 'text-wellness-accent bg-wellness-blue dark:bg-gray-700'
                                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                                }`}
                        >
                            {item.icon}
                            <span className={`text-[10px] font-semibold tracking-wide ${isActive ? 'text-wellness-accent' : 'text-gray-400 dark:text-gray-500'}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}

                {/* Dark mode toggle */}
                <button
                    onClick={() => setIsDarkMode(prev => !prev)}
                    className="flex flex-col items-center gap-1 px-3 py-2 rounded-2xl text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 min-w-[60px]"
                >
                    {isDarkMode
                        ? <Sun size={22} strokeWidth={1.5} />
                        : <Moon size={22} strokeWidth={1.5} />
                    }
                    <span className="text-[10px] font-semibold tracking-wide">
                        {isDarkMode ? 'Light' : 'Dark'}
                    </span>
                </button>

                {/* Sign out */}
                <button
                    onClick={onSignOut}
                    className="flex flex-col items-center gap-1 px-3 py-2 rounded-2xl text-red-400 hover:text-red-500 transition-all duration-200 min-w-[60px]"
                >
                    <LogOut size={22} strokeWidth={1.5} />
                    <span className="text-[10px] font-semibold tracking-wide">Out</span>
                </button>
            </div>

            {/* iOS home indicator spacer */}
            <div className="h-safe-bottom pb-1" />
        </div>
    );
};

export default BottomNav;