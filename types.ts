export interface LearningQuery {
  learningGoal: string;
  currentKnowledge: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Course {
  title: string;
  description: string;
  keyTopics: string[];
  difficulty: string;
  platform: string;
}
