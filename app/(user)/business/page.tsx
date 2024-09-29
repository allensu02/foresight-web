"use client";

import { useState, useEffect } from 'react';
import { auth } from '../../../firebase';
import { useRouter } from 'next/navigation';

export default function BusinessDashboard() {
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/signin');
      } else {
        // Fetch the business score
        fetchBusinessScore(user.uid);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchBusinessScore = async (userId: string) => {
    try {
      // This is a placeholder. Replace with your actual API call
      const response = await fetch(`/api/business-score/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch business score');
      }
      const data = await response.json();
      setScore(data.score);
    } catch (err) {
      setError('Failed to load business score');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Business Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Overall Score</h2>
        <div className="text-5xl font-bold text-blue-600">
          {score !== null ? score.toFixed(1) : 'N/A'}
        </div>
        <p className="mt-2 text-gray-600">
          This score represents your business's overall performance.
        </p>
      </div>
      {/* Add more dashboard widgets here */}
    </div>
  );
}
