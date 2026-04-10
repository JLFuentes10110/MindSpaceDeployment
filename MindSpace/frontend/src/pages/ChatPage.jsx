import React, { useState, useRef, useEffect } from 'react';
import ChatBubble from '../components/ChatBubble';
import MessageInput from '../components/MessageInput';
import { apiFetch } from '../utils/api';

const ChatPage = ({ onUnauthorized }) => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchHistory = async () => {
        setError(null);
        try {
            const data = await apiFetch('/api/chat/history');
            setMessages(
                data.map((item) => ({
                    id: item.id,
                    text: item.message,  //i made changes here item.text
                    isUser: item.sender === 'user',
                }))
            );
        } catch (err) {
            if (err.status === 401) {
                onUnauthorized?.();
                return;
            }
            setError(err.message);
        }
    };

    const handleSendMessage = async (text) => {
        if (!text.trim()) return;

        const userMsg = { id: Date.now(), text, isUser: true };
        setMessages((prev) => [...prev, userMsg]);

        try {
            const { assistant } = await apiFetch('/api/chat/message', {
                method: 'POST',
                body: JSON.stringify({ text }),
            });

            const assistantMsg = {
                id: assistant.id,
                text: assistant.text, //made changes here as well .text
                isUser: false,
            };
            setMessages((prev) => [...prev, assistantMsg]);
        } catch (err) {
            if (err.status === 401) {
                onUnauthorized?.();
                return;
            }
            setError(err.message);
        }
    };

    return (
        <div className="h-full flex flex-col max-w-4xl mx-auto">
            <div className="mb-6 px-2">
                <h2 className="text-2xl font-semibold text-wellness-text dark:text-gray-100">Reflection Chat</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">A safe space to share your thoughts.</p>
                {error && <p className="text-sm text-red-600 dark:text-red-400 mt-2">{error}</p>}
            </div>

            <div className="card flex-1 flex flex-col p-0 overflow-hidden bg-white/80 dark:bg-gray-800/80 transition-colors duration-300 backdrop-blur-sm">
                <div className="flex-1 overflow-y-auto p-6 flex flex-col">
                    {messages.map((msg) => (
                        <ChatBubble key={msg.id} message={msg.text} isUser={msg.isUser} />
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <MessageInput onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
};

export default ChatPage;
