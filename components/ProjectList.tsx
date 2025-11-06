import React from 'react';
import { CourseCard, CourseCardSkeleton } from './ProjectCard';
import type { Course } from '../types';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface CourseListProps {
  courses: Course[];
  isLoading: boolean;
  progress: Record<string, boolean[]>;
  onToggleTopic: (courseTitle: string, topicIndex: number) => void;
}

export const CourseList: React.FC<CourseListProps> = ({ courses, isLoading, progress, onToggleTopic }) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <CourseCardSkeleton />
        <CourseCardSkeleton />
        <CourseCardSkeleton />
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-gray-800/20 border border-dashed border-gray-700 rounded-xl">
        <BookOpenIcon className="mx-auto w-12 h-12 text-gray-600" />
        <h3 className="mt-4 text-xl font-semibold text-gray-300">Ready to start your learning journey?</h3>
        <p className="mt-2 text-gray-500">Tell us what you want to learn, and our AI will craft a personalized path for you.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {courses.map((course, index) => (
        <CourseCard 
          key={index} 
          course={course}
          progress={progress[course.title] || []}
          onToggleTopic={(topicIndex) => onToggleTopic(course.title, topicIndex)}
        />
      ))}
    </div>
  );
};