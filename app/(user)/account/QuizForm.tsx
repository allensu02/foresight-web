'use client';

import React, { useState } from 'react';
import { db } from '../../../firebase';
import { collection, addDoc } from 'firebase/firestore';

const questions = [
  { id: 1, text: "What is your favorite color?", options: ["Red", "Blue", "Green", "Yellow"] },
  { id: 2, text: "How old are you?", options: ["Under 18", "18-30", "31-50", "Over 50"] },
  { id: 3, text: "What's your preferred programming language?", options: ["JavaScript", "Python", "Java", "C++"] },
  { id: 4, text: "How often do you code?", options: ["Daily", "Weekly", "Monthly", "Rarely"] },
];

export default function QuizForm() {
  const [answers, setAnswers] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleInputChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setAlertMessage('');

    try {
      await addDoc(collection(db, 'quizResponses'), {
        answers,
        timestamp: new Date()
      });
      setAlertMessage('Quiz saved successfully!');
      setAlertType('success');
      setAnswers({});
    } catch (error) {
      console.error('Error saving quiz:', error);
      setAlertMessage(`An error occurred while saving the quiz: ${error.message}`);
      setAlertType('error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      {alertMessage && (
        <div className={`p-4 mb-4 rounded ${alertType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {alertMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.id} className="mb-4">
            <p className="font-semibold mb-2">{question.text}</p>
            {question.options.map((option, index) => (
              <div key={index} className="mb-2">
                <input
                  type="radio"
                  id={`q${question.id}-${index}`}
                  name={`question-${question.id}`}
                  value={option}
                  onChange={() => handleInputChange(question.id, option)}
                  checked={answers[question.id] === option}
                  className="mr-2"
                />
                <label htmlFor={`q${question.id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        ))}
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}