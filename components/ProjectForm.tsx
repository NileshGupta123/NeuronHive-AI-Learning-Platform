import React from 'react';
import type { LearningQuery } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface CourseQueryFormProps {
  query: LearningQuery;
  setQuery: React.Dispatch<React.SetStateAction<LearningQuery>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const Label: React.FC<{ htmlFor: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-300 mb-2">
        {children}
    </label>
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
    <select {...props} className={`w-full bg-gray-800/50 border border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition ${props.className}`}>
        {props.children}
    </select>
);

// Renamed from ProjectForm to CourseQueryForm to reflect the new purpose
export const CourseQueryForm: React.FC<CourseQueryFormProps> = ({ query, setQuery, onSubmit, isLoading }) => {
  
  const handleInputChange = <K extends keyof LearningQuery,>(key: K, value: LearningQuery[K]) => {
    setQuery(prev => ({ ...prev, [key]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-6 md:p-8 rounded-xl shadow-2xl space-y-6">
      <div>
        <Label htmlFor="learning-goal">What do you want to learn?</Label>
        <input
          id="learning-goal"
          type="text"
          value={query.learningGoal}
          onChange={(e) => handleInputChange('learningGoal', e.target.value)}
          placeholder="e.g., 'Build interactive web apps with React and Next.js'"
          className="w-full bg-gray-800/50 border border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
        />
        <p className="text-xs text-gray-500 mt-2">Be specific for better suggestions!</p>
      </div>
      
      <div>
        <Label htmlFor="current-knowledge">Your Current Knowledge Level</Label>
        <Select 
          id="current-knowledge" 
          value={query.currentKnowledge}
          onChange={(e) => handleInputChange('currentKnowledge', e.target.value as LearningQuery['currentKnowledge'])}
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </Select>
      </div>
     
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500"
        >
          {isLoading ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Path...
            </>
          ) : (
            <>
                <SparklesIcon className="w-5 h-5" />
                Suggest Courses
            </>
          )}
        </button>
      </div>
    </form>
  );
};