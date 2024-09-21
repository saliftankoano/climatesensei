"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const router = useRouter(); // Initialize the router

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in: ', userCredential.user);
      setSuccessMessage('Login successful!');
      
      // Navigate to the experience page after successful login
      router.push('/experience');
    } catch (error) {
      console.error('Login failed: ', error);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen" style={{ backgroundImage: 'url(/images/background.jpg)', backgroundSize: 'cover' }}>
      <div className="w-full max-w-md bg-white/90 p-8 rounded-lg shadow-lg" style={{ backdropFilter: 'blur(5px)' }}>
        <h1 className="text-2xl font-semibold text-center mb-6">Login to Climate Sensei</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        {successMessage && <p className="mt-4 text-sm text-green-500">{successMessage}</p>}
      </div>
    </div>
  );
};

export default Home;
