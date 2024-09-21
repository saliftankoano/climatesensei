"use client";

import React, { useState } from 'react';
import axios from 'axios'; // You need to install axios if you haven't yet

const LLMPage = () => {
  const [messages, setMessages] = useState([]); // Store the conversation
  const [input, setInput] = useState(''); // Store the user input
  const [loading, setLoading] = useState(false); // For showing loading status

  // Function to handle the user input submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return; // If input is empty, don't do anything

    const userMessage = { role: 'user', content: input };

    setMessages((prev) => [...prev, userMessage]); // Add the user message to the chat
    setInput(''); // Clear the input field
    setLoading(true);

    try {
      const response = await axios.post('/api/chat', {
        messages: [...messages, userMessage], // Send the entire conversation to the API
      });

      const assistantMessage = {
        role: 'assistant',
        content: response.data.message, // Get response from the backend (OpenAI)
      };

      setMessages((prev) => [...prev, assistantMessage]); // Add the AI message to the chat
    } catch (error) {
      console.error('Error fetching response:', error);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Test what you'll say to the teacher here</h1>
        
        {/* Chat Messages */}
        <div className="h-96 overflow-y-scroll mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${msg.role === 'user' ? 'text-blue-600' : 'text-green-600'}`}
            >
              <strong>{msg.role === 'user' ? 'You: ' : 'GPT: '}</strong>
              {msg.content}
            </div>
          ))}
          {loading && <p className="text-gray-500">GPT is typing...</p>}
        </div>

        {/* Input Box */}
        <form onSubmit={handleSubmit} className="w-full flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow p-2 border border-gray-300 rounded-l-md dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default LLMPage;
