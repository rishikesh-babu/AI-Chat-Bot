import React, { useState, useEffect, useRef } from 'react';

function ChatMain() {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello! How can I help you today?', sender: 'bot' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    async function handleSendMessage(e) {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: newMessage,
            sender: 'user',
        };

        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setNewMessage('');
        setIsLoading(true);

        // Mock API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const botMessage = {
                id: Date.now() + 1,
                text: `This is a simulated response to "${newMessage}"`,
                sender: 'bot',
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage = {
                id: Date.now() + 1,
                text: 'Sorry, something went wrong. Please try again.',
                sender: 'bot',
            };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-[100dvh] bg-gray-900 text-gray-200 font-sans flex flex-col">
            <header className="sticky top-0 z-10 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
                <div className="max-w-4xl mx-auto p-4">
                    <h1 className="text-xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                        AiChatBot
                    </h1>
                </div>
            </header>
            <main className="flex-grow p-6 w-full max-w-4xl mx-auto overflow-y-auto flex flex-col gap-6">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex flex-col animate-fade-in-up ${message.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                        <div
                            className={`py-3 px-5 rounded-2xl max-w-[80%] break-words shadow-lg ${message.sender === 'user'
                                ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-br-lg'
                                : 'bg-gray-700 text-gray-200 rounded-bl-lg'
                                }`}
                        >
                            <p>{message.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-start">
                        <div className="py-2 px-4 rounded-2xl max-w-[75%] bg-gray-200 text-black rounded-bl-none">
                            <div className="flex items-center justify-center gap-1.5 h-5">
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '-0.32s' }}></span>
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '-0.16s' }}></span>
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </main>

            <div className="p-4 m-2 sm:mx-auto sm:w-full max-w-2xl border border-white rounded-2xl flex flex-col gap-3 ">
                <div className="flex items-center gap-2" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e => { e.key === 'Enter' && handleSendMessage(e) })}
                        placeholder="Type your message here..."
                        disabled={isLoading}
                        className="flex-grow py-2 px-4 text-white rounded-full  focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                    />
                </div>
                <div className='flex justify-between'>
                    <div className="hover:scale-105">
                        <label htmlFor="fileInput" className='cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="40px" fill="#fff">
                                <path d="M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z" />
                            </svg>
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                        />
                    </div>

                    <button
                        className='bg-gray-300 hover:bg-gray-100 border rounded-full select-none cursor-pointer hover:scale-105 transition-all duration-200'
                        onClick={handleSendMessage}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="black"><path d="M452-244v-400L282-477l-42-43 241-241 241 241-42 42-168-168v402h-60Z" /></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatMain
