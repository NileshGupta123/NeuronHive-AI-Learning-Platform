import React from 'react';
import type { Course } from '../types';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';

interface CourseCardProps {
  course: Course;
  progress: boolean[];
  onToggleTopic: (topicIndex: number) => void;
}

const Tag: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <span className={`inline-block bg-gray-700/50 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full ${className}`}>
        {children}
    </span>
);

export const CourseCard: React.FC<CourseCardProps> = ({ course, progress, onToggleTopic }) => {
  const completedTopics = progress.filter(Boolean).length;
  const totalTopics = progress.length;
  const progressPercentage = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;
  
  const platformSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(`${course.platform} ${course.title}`)}`;

  return (
    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/60 p-6 rounded-xl shadow-lg hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-xl font-bold text-purple-300">{course.title}</h3>
        <Tag className="bg-purple-900/50 text-purple-300 flex-shrink-0">{course.difficulty}</Tag>
      </div>
      <p className="mt-3 text-gray-400">{course.description}</p>
      
      <div className="mt-5 border-t border-gray-700 pt-4">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">Key Topics:</h4>
        <ul className="space-y-2">
          {course.keyTopics.map((topic, index) => (
            <li key={index} className="flex items-center">
                <label className="flex items-center gap-3 text-gray-400 text-sm cursor-pointer group">
                    <input 
                        type="checkbox"
                        checked={progress[index]}
                        onChange={() => onToggleTopic(index)}
                        className="appearance-none h-4 w-4 border border-gray-600 rounded-sm bg-gray-700/50 checked:bg-purple-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-all"
                    />
                    <span className={`group-hover:text-gray-200 transition ${progress[index] ? 'line-through text-gray-500' : ''}`}>
                        {topic}
                    </span>
                </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 border-t border-gray-700 pt-4">
        <div className="flex justify-between items-center mb-2 text-xs text-gray-400">
          <span>Progress</span>
          <span>{completedTopics} / {totalTopics}</span>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

       <div className="mt-5 border-t border-gray-700 pt-4 flex items-center justify-between text-sm">
         <p className="text-gray-400">Suggested Platform: <Tag className="bg-gray-700 text-gray-200">{course.platform}</Tag></p>
         <a 
            href={platformSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium border border-purple-800/50 hover:bg-purple-900/30 px-3 py-1.5 rounded-md transition-all duration-200">
            Find on {course.platform}
            <ExternalLinkIcon className="w-4 h-4" />
         </a>
       </div>
    </div>
  );
};

export const CourseCardSkeleton: React.FC = () => {
    return (
        <div className="bg-gray-800/40 border border-gray-700/60 p-6 rounded-xl shadow-lg animate-pulse">
            <div className="flex justify-between items-start">
                <div className="h-6 bg-gray-700 rounded w-3/5"></div>
                <div className="h-6 bg-gray-700 rounded w-1/5"></div>
            </div>
            <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
            <div className="mt-6 border-t border-gray-700/50 pt-4 space-y-3">
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
            <div className="mt-6 border-t border-gray-700/50 pt-4 flex justify-between items-center">
                <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                <div className="h-6 bg-gray-700 rounded w-1/3"></div>
            </div>
        </div>
    );
};