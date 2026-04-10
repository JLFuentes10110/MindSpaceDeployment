import React from 'react';

const ChatBubble = ({ message, isUser }) => {
    return (
        <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-wellness-accent/80 to-wellness-lavender flex-shrink-0 flex items-center justify-center text-white text-sm font-bold mr-3 mt-auto shadow-sm">
                    M
                </div>
            )}

            <div
                className={`max-w-[80%] px-6 py-4 relative transition-colors duration-300 ${isUser
                    ? 'bg-wellness-accent text-white rounded-3xl rounded-br-[4px] shadow-[0_4px_15px_rgba(96,165,250,0.2)]'
                    : 'bg-white dark:bg-gray-700/80 border border-gray-50 dark:border-gray-600/50 text-gray-700 dark:text-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-none rounded-3xl rounded-bl-[4px]'
                    }`}
            >
                <p className="leading-relaxed whitespace-pre-wrap text-[15px]">{message}</p>
            </div>
        </div>
    );
};

export default ChatBubble;
