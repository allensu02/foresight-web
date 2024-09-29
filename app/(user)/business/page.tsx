"use client";

import { useState, useEffect } from 'react';
import { auth } from '../../../firebase';
import { useRouter } from 'next/navigation';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Tooltip } from 'react-tooltip';

// Define types for our data structure
type Issue = {
  name: string;
  score: number;
  info: string; // Add an info field for tooltip content
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
        { name: "LGBTQ+ Rights", score: 9, info: "Score based on policies supporting LGBTQ+ rights." },
        { name: "Women's Rights", score: 8, info: "Score based on gender equality initiatives." },
        { name: "Workers' Rights", score: 7, info: "Score based on labor practices and worker treatment." },
        { name: "Racial Equality", score: 8, info: "Score based on diversity and inclusion efforts." },
        { name: "Immigration Stance", score: 7, info: "Score based on policies regarding immigration." },
      ]
    },
    {
      name: "Environmental Impact",
      score: 7,
      issues: [
        { name: "Carbon Emissions", score: 6, info: "Score based on carbon footprint and emissions." },
        { name: "Renewable Energy Use", score: 8, info: "Score based on the use of renewable energy sources." },
        { name: "Waste Management & Recycling", score: 7, info: "Score based on waste management practices." },
        { name: "Water Conservation", score: 7, info: "Score based on water usage and conservation efforts." },
        { name: "Deforestation Practices", score: 6, info: "Score based on practices affecting deforestation." },
      ]
    },
    {
      name: "Corporate Ethics",
      score: 9,
      issues: [
        { name: "Corporate Transparency", score: 9, info: "Score based on transparency in operations." },
        { name: "Ethical Supply Chain Practices", score: 7, info: "Score based on ethical sourcing and supply chain." },
        { name: "Corruption & Bribery Policies", score: 8, info: "Score based on anti-corruption measures." },
        { name: "Employee & Board Diversity", score: 8, info: "Score based on diversity in leadership." },
      ]
    },
    {
      name: "Political Impact",
      score: 7,
      issues: [
        { name: "Philanthropic Initiatives", score: 8, info: "Score based on charitable contributions." },
        { name: "Community Impact", score: 7, info: "Score based on community engagement and support." },
        { name: "Political Contributions", score: 6, info: "Score based on political contributions and lobbying." },
      ]
    },
    {
      name: "Technological Ethics",
      score: 8,
      issues: [
        { name: "Data Privacy & Security", score: 9, info: "Score based on data protection measures." },
        { name: "AI & Automation Ethics", score: 7, info: "Score based on ethical use of AI technologies." },
        { name: "Net Neutrality Support", score: 8, info: "Score based on support for net neutrality." },
        { name: "Sustainability in Tech", score: 8, info: "Score based on sustainable tech practices." },
      ]
    }
  ]
};

const getScoreColor = (score: number) => {
  if (score >= 8) return '#4caf50'; // Green
  if (score >= 5) return '#ffeb3b'; // Yellow
  return '#f44336'; // Red
};

export default function BusinessDashboard() {
  const [loading, setLoading] = useState(true);
  const [visibleTooltips, setVisibleTooltips] = useState<{ [key: number]: boolean }>({}); // State for tooltip visibility
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

  // Get the color for the overall score
  const overallScoreColor = getScoreColor(businessData.overallScore);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Business Dashboard</h1>
      
      {/* Overall Score as a Circular Progress Bar */}
      <div className="flex justify-center mb-6">
        <div style={{ width: '200px', height: '200px' }}>
          <CircularProgressbar
            value={businessData.overallScore}
            text={`${businessData.overallScore}`}
            styles={buildStyles({
              pathColor: overallScoreColor,
              textColor: overallScoreColor, // Set text color to match the progress bar
              trailColor: '#d6d6d6',
              textSize: '32px', // Increase text size
              strokeWidth: 10, // Increase stroke width for the ring
              textMargin: 10, // Adjust margin if needed
            })}
          />
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
                  <span className="text-gray-500 cursor-pointer">ℹ️</span> {/* Tooltip removed */}
                </li>
              ))}
            </ul>
            
          </div>
        ))}
      </div>
    </div>
  );
}