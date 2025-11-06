import React from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface HeaderProps {
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="py-8 md:py-12">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center justify-start gap-4">
          <BookOpenIcon className="w-10 h-10 md:w-12 md:h-12 text-purple-400" />
          <div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              NeuronHive
            </h1>
            <p className="hidden md:block mt-1 text-md text-gray-400">Your AI-Powered Learning Co-Pilot</p>
          </div>
        </div>
        
        {onLogout && (
          <button
            onClick={onLogout}
            className="bg-gray-700/50 hover:bg-gray-700 text-white font-medium py-2 px-4 border border-gray-600 rounded-lg shadow-sm transition-colors duration-200"
          >
            Log Out
          </button>
        )}
      </div>
    </header>
  );
};
