import React, { useState } from 'react';
import { motion } from 'framer-motion';

const initialMessages = [
  { sender: 'ai', text: 'Namaste! I am Bodhi AI. Ask me anything about Hindu mythology.' }
];

const AIChatScreen = ({ onBack }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    // Simulate AI response
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { sender: 'ai', text: `Sorry, I am a demo! You asked: "${input}"` },
      ]);
    }, 600);
    setInput('');
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-white"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
    >
      <div className="p-4 border-b flex items-center">
        <button onClick={onBack} className="text-orange-600 hover:underline mr-3">&larr; Back</button>
        <h2 className="text-xl font-bold text-orange-700">AI Chat</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-lg px-4 py-2 rounded-lg shadow ${msg.sender === 'ai' ? 'bg-orange-50 text-orange-700 self-start' : 'bg-yellow-100 text-orange-900 self-end ml-auto'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-4 border-t flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Type your question..."
        />
        <button
          onClick={handleSend}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded"
        >
          Send
        </button>
      </div>
    </motion.div>
  );
};

export default AIChatScreen;
