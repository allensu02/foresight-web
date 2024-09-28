"use client";

import React from "react";

// Section 1: Real-life metrics
const section1 = [
  {
    id: 1,
    text: "How much do you think environmental awareness should impact a company's actions?",
    options: [1, 2, 3, 4, 5],
  },
  {
    id: 2,
    text: "How much should concern over social issues (awareness of LGBT/BIPOC communities, human rights issues) impact a company's actions?",
    options: [1, 2, 3, 4, 5],
  },
  {
    id: 3,
    text: "How much does the ethicality of a company's internal governance practices impact your willingness to support them?",
    options: [1, 2, 3, 4, 5],
  },
];

// Section 2: User-driven questions
const section2 = [
  {
    id: 4,
    text: "Rate Company A based on their social/ethical practices.",
    options: [1, 2, 3, 4, 5],
  },
  {
    id: 5,
    text: "Rate Company B based on their social/ethical practices.",
    options: [1, 2, 3, 4, 5],
  },
  {
    id: 6,
    text: "Rate Company C based on their social/ethical practices.",
    options: [1, 2, 3, 4, 5],
  },
];

export default function AccountPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
        Ethical Metric Quiz
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Real Life Metrics
          </h2>
          {section1.map((question) => (
            <div key={question.id} className="mb-6">
              <p className="font-medium text-lg text-gray-700 mb-2">
                {question.text}
              </p>
              <div className="flex space-x-4">
                {question.options.map((option, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      className="form-radio text-blue-500"
                    />
                    <span className="text-gray-600">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Section 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            User Data-Driven Questions
          </h2>
          {section2.map((question) => (
            <div key={question.id} className="mb-6">
              <p className="font-medium text-lg text-gray-700 mb-2">
                {question.text}
              </p>
              <div className="flex space-x-4">
                {question.options.map((option, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      className="form-radio text-blue-500"
                    />
                    <span className="text-gray-600">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Submit Your Answers
          </button>
        </div>
      </form>
    </div>
  );
}
