import React, { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onSendMessage(text);
            setText('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (text.trim()) {
                onSendMessage(text);
                setText('');
            }
        }
    };

    return (
        <div className="bg-white/90 dark:bg-gray-800/90 transition-colors duration-300 backdrop-blur-md border border-gray-100 dark:border-gray-700/50 p-3 m-3 rounded-[2rem] flex items-center gap-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] relative z-10">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                className="flex-1 min-w-0 bg-transparent px-4 py-2 outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 text-[15px]"
            />
            <button
                onClick={handleSubmit}
                disabled={!text.trim()}
                className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                    text.trim()
                        ? 'bg-wellness-accent text-white hover:bg-wellness-accent-hover shadow-[0_4px_12px_rgba(96,165,250,0.4)] hover:shadow-[0_6px_16px_rgba(96,165,250,0.5)] hover:-translate-y-0.5'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-300 dark:text-gray-500 cursor-not-allowed'
                }`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                </svg>
            </button>
        </div>
    );
};

export default MessageInput;