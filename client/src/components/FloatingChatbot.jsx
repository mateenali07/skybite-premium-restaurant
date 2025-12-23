import React, { useState } from 'react';
import Chatbot from './Chatbot';
import { MessageCircle, X } from 'lucide-react';

const FloatingChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            <div className={`pointer-events-auto transition-all duration-300 transform origin-bottom-right mb-4 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                <Chatbot />
            </div>

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>
        </div>
    );
};

export default FloatingChatbot;
