"use client";

import { useState, useEffect } from 'react';
import { auth } from '../../../firebase';
import { useRouter } from 'next/navigation';
import { Tooltip } from 'react-tooltip'; // Assuming you have a tooltip library

// Define types for our data structure
type Issue = {
  name: string;
  score: number;
};

type Category = {
  name: string;
  score: number;
  issues: Issue[];
};

type BusinessData = {
  overallScore: number;
  categories: Category[];
};

// Hard-coded business data with updated issues
const businessData: BusinessData = {
  overallScore: 75,
  categories: [
    {
      name: "Human Rights",
      score: 8,
      issues: [
        { name: "LGBTQ+ Rights", score: 9 },
        { name: "Women's Rights", score: 8 },
        { name: "Workers' Rights", score: 7 },
        { name: "Racial Equality", score: 8 },
        { name: "Immigration Stance", score: 7 },
      ]
    },
    {
      name: "Environmental Impact",
      score: 7,
      issues: [
        { name: "Carbon Emissions", score: 6 },
        { name: "Renewable Energy Use", score: 8 },
        { name: "Waste Management & Recycling", score: 7 },
        { name: "Water Conservation", score: 7 },
        { name: "Deforestation Practices", score: 6 },
      ]
    },
    {
      name: "Corporate Ethics",
      score: 9,
      issues: [
        { name: "Corporate Transparency", score: 9 },
        { name: "Ethical Supply Chain Practices", score: 7 },
        { name: "Corruption & Bribery Policies", score: 8 },
        { name: "Employee & Board Diversity", score: 8 },
      ]
    },
    {
      name: "Political Impact",
      score: 7,
      issues: [
        { name: "Philanthropic Initiatives", score: 8 },
        { name: "Community Impact", score: 7 },
        { name: "Political Contributions", score: 6 },
      ]
    },
    {
      name: "Technological Ethics",
      score: 8,
      issues: [
        { name: "Data Privacy & Security", score: 9 },
        { name: "AI & Automation Ethics", score: 7 },
        { name: "Net Neutrality Support", score: 8 },
        { name: "Sustainability in Tech", score: 8 },
      ]
    }
  ]
};

const getScoreColor = (score: number) => {
  if (score >= 8) return 'bg-green-500'; // High score
  if (score >= 5) return 'bg-yellow-500'; // Mid-range score
  return 'bg-red-500'; // Low score
};

export default function BusinessDashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/signin');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Business Dashboard</h1>
      
      {/* Overall Score */}
      <div className={`bg-white shadow-md rounded-lg p-6 mb-6 ${getScoreColor(businessData.overallScore)}`}>
        <h2 className="text-xl font-semibold mb-4">Overall Score</h2>
        <div className="text-6xl font-bold text-white">
          {businessData.overallScore}
        </div>
      </div>

      {/* Category Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businessData.categories.map((category, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h3 className="text-lg font-semibold mb-2 text-xl">{category.name}</h3>
            <div className={`text-3xl font-bold mb-4 ${getScoreColor(category.score)}`}>
              {category.score}/10
            </div>
            <h4 className="font-medium mb-2">Issues:</h4>
            <ul className="list-disc list-inside">
              {category.issues.map((issue, issueIndex) => (
                <li key={issueIndex} className="flex items-center">
                  <span className="mr-2">{issue.name}: <span className="font-medium">{issue.score}/10</span></span>
                  <Tooltip content={`Score: ${issue.score}/10`} placement="top">
                    <span className="text-gray-500 cursor-pointer">ℹ️</span>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}