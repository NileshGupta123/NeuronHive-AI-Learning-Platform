import React, { useState, useCallback } from 'react';
import { Header } from '../components/Header';
import { CourseQueryForm } from '../components/ProjectForm';
import { CourseList } from '../components/ProjectList';
import { generateCourseSuggestions } from '../services/geminiService';
import type { LearningQuery, Course } from '../types';
import { Footer } from '../components/Footer';

interface HomePageProps {
  onLogout: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onLogout }) => {
  const [learningQuery, setLearningQuery] = useState<LearningQuery>({
    learningGoal: 'Learn frontend development with React',
    currentKnowledge: 'Beginner',
  });
  const [suggestedCourses, setSuggestedCourses] = useState<Course[]>([]);
  const [courseProgress, setCourseProgress] = useState<Record<string, boolean[]>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCourses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSuggestedCourses([]);
    setCourseProgress({});

    try {
      const courses = await generateCourseSuggestions(learningQuery);
      setSuggestedCourses(courses);
      const initialProgress = courses.reduce((acc, course) => {
        acc[course.title] = course.keyTopics.map(() => false);
        return acc;
      }, {} as Record<string, boolean[]>);
      setCourseProgress(initialProgress);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      console.error(errorMessage);
      setError(`Failed to generate course suggestions. Please check your API key and try again. Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [learningQuery]);

  const handleToggleTopic = useCallback((courseTitle: string, topicIndex: number) => {
    setCourseProgress(prevProgress => {
      const newProgress = { ...prevProgress };
      const courseTopics = [...newProgress[courseTitle]];
      courseTopics[topicIndex] = !courseTopics[topicIndex];
      newProgress[courseTitle] = courseTopics;
      return newProgress;
    });
  }, []);

  return (
    <div className="relative isolate min-h-screen flex flex-col">
      <Header onLogout={onLogout} />

      <main className="container mx-auto px-4 pb-8 md:pb-12 flex-grow">
        <div className="max-w-3xl mx-auto">
          <CourseQueryForm
            query={learningQuery}
            setQuery={setLearningQuery}
            onSubmit={handleGenerateCourses}
            isLoading={isLoading}
          />

          <div className="mt-12">
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
                <p className="font-bold">Oops! Something went wrong.</p>
                <p className="text-sm">{error}</p>
              </div>
            )}
            <CourseList
              courses={suggestedCourses}
              isLoading={isLoading}
              progress={courseProgress}
              onToggleTopic={handleToggleTopic}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};