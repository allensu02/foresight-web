"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../firebase';
import { motion } from 'framer-motion';

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
          { question: 'Environmental awareness', answer: 5 },
          { question: 'Social issues', answer: 4 },
          { question: 'Governance practices', answer: 3 },
          { question: 'Economic impact', answer: -2 },
          { question: 'Community engagement', answer: 1 },
          { question: 'Employee welfare', answer: -3 },
          { question: 'Customer satisfaction', answer: 2 },
          { question: 'Innovation', answer: 4 },
          { question: 'Sustainability', answer: 5 },
          { question: 'Ethical sourcing', answer: -1 },
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 flex flex-col items-center justify-center"
      style={{ background: 'url(bg.png) no-repeat center center fixed', backgroundSize: 'cover', fontFamily: 'Arial, sans-serif', minHeight: '100vh', boxSizing: 'border-box' }}
    >
      <div className="logo-text mb-4 flex justify-center items-center" style={{ fontSize: '12px' }}>
      <img
                src="./images/your-logo.png"
                style={{ height: '100px' }} // Significantly smaller height // Center the image
              />
      </div>
      <h1 className="text-4xl font-bold text-center mb-6" style={{ color: '#afcbe8' }}>Your Preferences</h1>
      
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center"
        style={{ background: 'rgba(255, 255, 255, 0.5)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', margin: '5px 0', padding: '5px', borderRadius: '15px', width: '90%', maxWidth: '800px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
      >
        {preferences ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 w-full">
              {preferences.map((preference, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-2 bg-white rounded-lg shadow-md flex flex-col items-center"
                  style={{ background: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                >
                  <h2 className="text-lg font-semibold mb-1" style={{ color: '#333' }}>{preference.question}</h2>
                  <p className="text-gray-700 text-md" style={{ color: '#555' }}>{preference.answer}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center w-full">
              <div className="w-full max-w-2xl">
                <div className="chart-container flex justify-around items-end h-96 mt-2 relative" style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
                  {preferences.map((preference, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.abs(preference.answer) * 40}px` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="chart-bar"
                      style={{
                        width: '30px',
                        backgroundColor: preference.answer >= 0 ? '#7f9f80' : '#f44336',
                        textAlign: 'center',
                        color: '#fff',
                        borderRadius: '5px',
                        position: 'relative',
                        bottom: '0',
                        margin: '0 5px',
                      }}
                    >
                      <span style={{ position: 'relative', top: '-20px' }}>{preference.answer}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-around mt-2">
                  {preferences.map((preference, index) => (
                    <span key={index} style={{ fontSize: '10px', width: '30px', textAlign: 'center' }}>{preference.question}</span>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>No preferences found.</p>
        )}
      </motion.div>
    </motion.div>
  );
}