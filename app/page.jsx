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

  const handleRegister = () => {
    // Navigate to the registration page
    router.push('/register'); // Make sure this matches the actual path to your register page
  };

  return (
    <section className="flex min-h-screen bg-gray-100">
      <div className="hidden lg:block lg:w-1/2" style={{
        backgroundImage: 'url(/images/cs-logo.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat' 
      }}></div>
      
      <div className="flex w-full max-w-md px-6 py-8 mx-auto lg:w-1/2">
        <div className="flex-1">
          <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">Login to Climate Sensei</h1>
          <form onSubmit={handleLogin} className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl bg-white">
            <p className="text-lg font-medium">Sign in to your account</p>
            <div>
              <label className="block text-sm font-semibold text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            {successMessage && <p className="mt-2 text-sm text-green-500">{successMessage}</p>}
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Login
            </button>
            <div className="mt-4 text-center">
              <p className="text-sm">Don't have an account? <button onClick={handleRegister} className="text-blue-600 hover:underline focus:outline-none">Register</button></p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Home;