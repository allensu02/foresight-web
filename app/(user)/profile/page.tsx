"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../firebase';

export default function ProfilePage() {
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/signin');
      } else {
        // Hardcoded preferences
        const hardcodedPreferences = [
          { question: 'How much do you think environmental awareness should impact a company\'s actions?', answer: '5' },
          { question: 'How much should concern over social issues impact a company\'s actions?', answer: '4' },
          { question: 'How much does the ethicality of a company\'s internal governance practices impact your willingness to support them?', answer: '3' },
        ];
        setPreferences(hardcodedPreferences);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Preferences</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {preferences ? (
          <ul>
            {preferences.map((preference, index) => (
              <li key={index} className="mb-4">
                <h2 className="text-xl font-semibold">{preference.question}</h2>
                <p className="text-gray-600">{preference.answer}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No preferences found.</p>
        )}
      </div>
    </div>
  );
}