import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function LearningPathGenerator() {
  const [topic, setTopic] = useState('');
  const [experience, setExperience] = useState('beginner');
  const [timeframe, setTimeframe] = useState('3-months');
  const [learningPath, setLearningPath] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Scroll to learning path when generated
  useEffect(() => {
    if (learningPath) {
      document.getElementById('learning-path')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [learningPath]);

  const generateLearningPath = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic you want to learn');
      return;
    }

    setLoading(true);
    setError('');
    setLearningPath('');

    try {
      const response = await fetch('/api/generate-courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, level: experience }) // send experience as "level"
      });

      const data = await response.json();

      if (data.courses) {
        // Convert structured JSON courses into Markdown
        const markdown = data.courses.map((course, i) => `
### ${i + 1}. ${course.title}

**Platform:** ${course.platform}  
**Difficulty:** ${course.difficulty}  

**Description:**  
${course.description}

**Key Topics:**  
- ${course.keyTopics.join('\n- ')}
        `).join('\n\n');

        setLearningPath(markdown);
      } else if (data.error) {
        setError(data.error);
      } else {
        setError('Failed to generate learning path. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error connecting to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) generateLearningPath();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-12 h-12 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">AI Learning Path Generator</h1>
          </div>
          <p className="text-lg text-gray-600">
            Get a personalized learning roadmap powered by AI
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What do you want to learn?
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., Machine Learning, Web Development, Digital Marketing..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Experience Level
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                >
                  <option value="complete-beginner">Complete Beginner</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Timeframe
                </label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                >
                  <option value="1-month">1 Month</option>
                  <option value="3-months">3 Months</option>
                  <option value="6-months">6 Months</option>
                  <option value="1-year">1 Year</option>
                </select>
              </div>
            </div>

            <button
              onClick={generateLearningPath}
              disabled={loading || !topic.trim()}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Your Learning Path...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Learning Path
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Learning Path Display */}
        {learningPath && (
          <div
            id="learning-path"
            className="bg-white rounded-2xl shadow-xl p-8 animate-fadeIn"
          >
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Your Personalized Learning Path</h2>
            </div>
            <div className="prose prose-indigo max-w-none">
              <ReactMarkdown>{learningPath}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
      `}</style>
    </div>
  );
}
