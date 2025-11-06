import React, { useState } from 'react';
import { BookOpenIcon } from '../components/icons/BookOpenIcon';
import { Footer } from '../components/Footer';

interface AuthPageProps {
  onLogin: () => void;
}

type AuthMode = 'signin' | 'signup';

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('signin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate a successful login/signup
    onLogin();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="flex-grow flex flex-col items-center justify-center w-full">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4">
            <BookOpenIcon className="w-10 h-10 md:w-12 md:h-12 text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              NeuronHive
            </h1>
          </div>
          <p className="mt-4 text-lg text-gray-400">Your AI-Powered Learning Co-Pilot</p>
        </div>

        <div className="w-full max-w-md bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-8 rounded-xl shadow-2xl">
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setMode('signin')}
              className={`w-1/2 py-3 text-sm font-medium transition-colors ${mode === 'signin' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`w-1/2 py-3 text-sm font-medium transition-colors ${mode === 'signup' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
            >
              Sign Up
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            {mode === 'signup' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full bg-gray-800/50 border border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              />
            </div>

            <div>
              <label htmlFor="password"className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                required
                className="w-full bg-gray-800/50 border border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500"
              >
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};