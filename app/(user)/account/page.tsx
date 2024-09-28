import React from 'react';

const questions = [
  { id: 1, text: "What is your favorite color?", options: ["Red", "Blue", "Green", "Yellow"] },
  { id: 2, text: "How old are you?", options: ["Under 18", "18-30", "31-50", "Over 50"] },
  { id: 3, text: "What's your preferred programming language?", options: ["JavaScript", "Python", "Java", "C++"] },
  { id: 4, text: "How often do you code?", options: ["Daily", "Weekly", "Monthly", "Rarely"] },
];

export default function AccountPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Account Quiz</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        // Handle form submission here
        console.log("Form submitted");
      }}>
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
                  className="mr-2"
                />
                <label htmlFor={`q${question.id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
}
