import type { LearningQuery, Course } from '../types';

export async function generateCourseSuggestions(query: LearningQuery): Promise<Course[]> {
  try {
    const response = await fetch('/api/generate-courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userPrompt: `
Please return a JSON array of courses for the following learning goal:
Learning goal: ${query.learningGoal}
Current knowledge: ${query.currentKnowledge}

Format the response like this:

[
  {
    "title": "Course Title",
    "keyTopics": ["Topic 1", "Topic 2", "Topic 3"]
  },
  ...
]
Only return valid JSON.
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse JSON from the API response
    const data = await response.json();

    // Make sure we always return an array
    return Array.isArray(data.courses) ? data.courses : [];
  } catch (error) {
    console.error('Error generating course suggestions:', error);
    throw error;
  }
}
