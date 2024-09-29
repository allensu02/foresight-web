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
          { question: 'Environmental awareness', answer: '5' },
          { question: 'Social issues', answer: '4' },
          { question: 'Governance practices', answer: '3' },
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
      style={{ background: 'url(bg.png) no-repeat center center fixed', backgroundSize: 'cover', fontFamily: 'Arial, sans-serif', height: '100vh', boxSizing: 'border-box' }}
    >
      <div className="logo-text" style={{ fontSize: '12px', marginBottom: '1px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img
                src="./images/your-logo.png"
                style={{ height: '100px' }} // Significantly smaller height // Center the image
              />
      </div>
      <h1 className="text-4xl font-bold text-center mb-10" style={{ color: '#afcbe8' }}>Your Preferences</h1>
      
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-lg p-8 flex flex-col items-center"
        style={{ background: 'rgba(255, 255, 255, 0.5)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', margin: '5px 0', padding: '5px', borderRadius: '15px', width: '80%', maxWidth: '600px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
      >
        {preferences ? (
          <>
            <ul className="mb-8 w-full">
              {preferences.map((preference, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-6"
                  style={{ marginBottom: '4px' }}
                >
                  <h2 className="text-xl font-semibold" style={{ fontSize: '10px' }}>{preference.question}</h2>
                  <p className="text-gray-700" style={{ color: '#333' }}>{preference.answer}</p>
                </motion.li>
              ))}
            </ul>

            <div className="flex justify-center w-full">
              <div className="w-full max-w-xs">
                <div className="chart-container flex justify-around items-end h-48 mt-6">
                  {preferences.map((preference, index) => (
                    <div key={index} className="chart-bar" style={{ width: '30px', height: `${preference.answer * 20}px`, backgroundColor: '#7f9f80', textAlign: 'center', color: '#fff', borderRadius: '5px' }}>
                      <span style={{ position: 'relative', top: '-20px' }}>{preference.answer}</span>
                    </div>
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