"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast

const ethicalMetrics = [
  {
    category: "Human Rights",
    color: "#007bff",
    questions: [
      {
        id: 1,
        text: "How much should concern over social issues (awareness of LGBT/BIPOC communities, human rights issues) impact a company's actions?",
        defaultValue: 3,
      },
      {
        id: 2,
        text: "How important is it for a company to support LGBTQ+ rights and inclusion in the workplace?",
        defaultValue: 3,
      },
      {
        id: 3,
        text: "How much do a company's policies on gender equality and women's rights impact your decision to support them?",
        defaultValue: 3,
      },
    ],
  },
  {
    category: "Environmental Impact",
    color: "#28a745",
    questions: [
      {
        id: 4,
        text: "How much do you think environmental awareness should impact a company's actions?",
        defaultValue: 3,
      },
      {
        id: 5,
        text: "How much does reducing carbon emissions factor into your opinion of a company's sustainability efforts?",
        defaultValue: 3,
      },
      {
        id: 6,
        text: "How essential is it that a company uses renewable energy sources in its operations?",
        defaultValue: 3,
      },
    ],
  },
  {
    category: "Corporate Ethics",
    color: "#ffc107",
    questions: [
      {
        id: 7,
        text: "How much does the ethicality of a company's internal governance practices impact your willingness to support them?",
        defaultValue: 3,
      },
      {
        id: 8,
        text: "How important is transparency in a company's operations and decision-making process?",
        defaultValue: 3,
      },
      {
        id: 9,
        text: "How much does a company’s policy against corruption and bribery impact your support for them?",
        defaultValue: 3,
      },
    ],
  },
];

// General Info Questions
const generalQuestions = [
  {
    id: 1,
    text: "What is your age range?",
    options: ["Under 18", "18-30", "31-50", "Over 50"],
  },
  {
    id: 2,
    text: "What is the highest level of education you have completed?",
    options: [
      "High School",
      "Associate's Degree",
      "Bachelor's Degree",
      "Master's Degree",
      "Doctorate",
      "Other",
    ],
  },
  {
    id: 3,
    text: "Where do you usually get information about company ethics or social issues?",
    options: [
      "News outlets",
      "Social media",
      "Company websites",
      "Word of mouth",
      "Other",
    ],
  },
  {
    id: 4,
    text: "How often do you consider a company's ethical practices when purchasing their products or services?",
    options: ["Always", "Often", "Sometimes", "Rarely", "Never"],
  },
  {
    id: 5,
    text: "Which of the following social issues is the most important to you when evaluating a company?",
    options: [
      "Environmental Impact",
      "Workers' Rights",
      "Diversity and Inclusion",
      "Data Privacy",
      "Corporate Governance",
    ],
  },
  {
    id: 6,
    text: "How informed do you feel about the ethical practices of companies you support?",
    options: [
      "Very informed",
      "Somewhat informed",
      "Neutral",
      "Not very informed",
      "Not informed at all",
    ],
  },
];

export default function AccountPage() {
  const router = useRouter();
  const [sliderValues, setSliderValues] = useState(
    ethicalMetrics.flatMap((section) =>
      section.questions.map((q) => q.defaultValue)
    )
  );
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleSliderChange = (index: number, value: number) => {
    const newSliderValues = [...sliderValues];
    newSliderValues[index] = value;
    setSliderValues(newSliderValues);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const combinedData = {
      generalResponses: formData,
      ethicalMetrics: sliderValues,
    };

    try {
      const docRef = await addDoc(collection(db, "responses"), combinedData);

      // Custom styled toast
      toast.custom(
        <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg text-center text-xl">
          🎉 Form submitted successfully! 🎉
        </div>,
        {
          duration: 1000,
          position: "top-center",
        }
      );
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } catch (error) {
      // Custom styled error toast
      toast.custom(
        <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg text-center text-xl">
          ❌ Error submitting form. Please try again.
        </div>,
        {
          duration: 1000,
          position: "top-center",
        }
      );
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-50 rounded-lg shadow-2xl max-w-4xl">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700">
        User Quiz and Ethical Metric Survey
      </h1>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Section 1: General Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            General Information
          </h2>
          {generalQuestions.map((question) => (
            <div key={question.id} className="mb-6">
              <p className="font-medium text-lg text-gray-700 mb-2">
                {question.text}
              </p>
              <div className="space-y-2">
                {question.options.map((option, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      onChange={handleInputChange}
                      className="form-radio text-blue-500"
                    />
                    <span className="text-gray-600">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Section 2: Ethical Metrics */}
        {ethicalMetrics.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="bg-white p-8 rounded-lg shadow-md mb-8"
          >
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {section.category}
                </h2>
              </div>
              {section.questions.map((question, questionIndex) => (
                <div key={question.id} className="mb-8">
                  <p className="font-medium text-lg text-gray-700 mb-2">
                    {question.text}
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">1</span>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={
                        sliderValues[
                          sectionIndex * section.questions.length +
                            questionIndex
                        ]
                      }
                      onChange={(e) =>
                        handleSliderChange(
                          sectionIndex * section.questions.length +
                            questionIndex,
                          Number(e.target.value)
                        )
                      }
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, ${
                          section.color
                        } ${(
                          ((sliderValues[
                            sectionIndex * section.questions.length +
                              questionIndex
                          ] -
                            1) /
                            4) *
                          100
                        ).toFixed(2)}%, #d3d3d3 ${(
                          ((sliderValues[
                            sectionIndex * section.questions.length +
                              questionIndex
                          ] -
                            1) /
                            4) *
                          100
                        ).toFixed(2)}% 100%)`,
                      }}
                    />
                    <span className="text-gray-600">5</span>
                  </div>
                  <p className={`mt-2`} style={{ color: section.color }}>
                    Value:{" "}
                    {
                      sliderValues[
                        sectionIndex * section.questions.length + questionIndex
                      ]
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

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
