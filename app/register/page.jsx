"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter(); // Initialize the router

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered: ', userCredential.user);
      setSuccessMessage('Registration successful!');

    } catch (error) {
      console.error('Registration failed: ', error);
      setError(error.message);
    }
  };

  return (
    <section className="flex min-h-screen bg-gray-100">
      <div className="hidden lg:block lg:w-1/2" style={{
        backgroundImage: 'url(/images/register.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}></div>
      
      <div className="flex w-full max-w-md px-6 py-8 mx-auto lg:w-1/2">
        <div className="flex-1">
          <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">Register to Climate Sensei</h1>
          <form onSubmit={handleRegister} className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl bg-white">
            <p className="text-lg font-medium">Create your account</p>
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
              Register
            </button>
            <div className="mt-4 text-center">
              <p className="text-sm">Already have an account? <button onClick={() => router.push('/')} className="text-blue-600 hover:underline focus:outline-none">Login</button></p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
