
import type { LearningQuery, Course } from '../types';

export const generateCourseSuggestions = async (query: LearningQuery): Promise<Course[]> => {
  const { learningGoal, currentKnowledge } = query;

  try {
    const response = await fetch('http://localhost:5000/api/generate-courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        learningGoal,
        currentKnowledge,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const courses: Course[] = await response.json();
    return courses;
  } catch (error) {
    console.error("Error calling backend API:", error);
    const message = error instanceof Error ? error.message : "An unknown error occurred.";
    throw new Error(`Failed to communicate with the backend. ${message}`);
  }
};
