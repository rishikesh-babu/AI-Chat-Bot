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
        <div className="min-h-screen bg-gray-900 flex flex-col justify-between">
            <header className=" p-4 text-center shadow-md">
                <div className="font-bold text-2xl text-gray-300">AI Chat Bot</div>
            </header>
            <main className="flex-grow p-4 overflow-y-auto  flex flex-col gap-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                        <div
                            className={`py-2 px-4 rounded-2xl max-w-[75%] break-words ${message.sender === 'user'
                                ? 'bg-blue-500 text-white rounded-br-none'
                                : 'bg-gray-200 text-black rounded-bl-none'
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

            <div className="p-4 m-2 border border-white rounded-2xl flex flex-col gap-3 ">
                <div className="flex items-center gap-2" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message here..."
                        disabled={isLoading}
                        className="flex-grow py-2 px-4 text-white border border-gray-300 rounded-full  focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                    />
                </div>
                <div className='flex justify-between'>
                    <button className='cursor-pointer hover:scale-105'>
                      <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="40px" fill="#fff"><path d="M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z"/></svg>  
                    </button>
                    <button
                        className='bg-gray-300 hover:bg-gray-100 border rounded-full select-none cursor-pointer hover:scale-105 transition-all duration-200'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="black"><path d="M452-244v-400L282-477l-42-43 241-241 241 241-42 42-168-168v402h-60Z" /></svg>
                    </button>
                </div>
            </div>
        </div>

    )
}

export default ChatMain
