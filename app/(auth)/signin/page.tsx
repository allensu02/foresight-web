"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Add this import
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import { useRouter } from 'next/navigation';
import { updateProfile } from 'firebase/auth'; // Add this import

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBusinessLogin, setIsBusinessLogin] = useState(false);
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    console.log("handle sign in")
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(email, password);
      if (result && result.user) {
        console.log('Sign-in successful!', result.user);
        
        // Update user profile with account type
        try {
          await updateProfile(result.user, {
            displayName: isBusinessLogin ? 'Business' : 'Individual'
          });
          console.log('Profile updated successfully');
        } catch (updateError) {
          console.error('Error updating profile:', updateError);
        }

        // Route based on account type
        console.log('Before routing, isBusinessLogin:', isBusinessLogin);
        if (isBusinessLogin) {
          console.log('Attempting to route to /business');
          router.push('/business');
        } else {
          console.log('Attempting to route to /account');
          router.push('/account');
        }
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <>
      {/* Replace the video with your logo image */}
      <div className="mb-10">
      <img
                src="./images/your-logo.png"
                style={{ height: '50px' }} // Significantly smaller height // Center the image
              />
      </div>

      {/* Login type toggle */}
      <div className="mb-6 flex justify-center">
        <button
          className={`px-4 py-2 ${!isBusinessLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setIsBusinessLogin(false)}
        >
          Individual
        </button>
        <button
          className={`px-4 py-2 ${isBusinessLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setIsBusinessLogin(true)}
        >
          Business
        </button>
      </div>

      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Sign in to your {isBusinessLogin ? 'business' : 'individual'} account
        </h1>
      </div>
      <form onSubmit={handleSignIn}>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="form-input w-full py-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="corybarker@email.com"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="form-input w-full py-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="on"
              placeholder="••••••••"
              required
            />
          </div>
        </div>
        <div className="mt-6">
          <button 
            type="submit" 
            className="btn w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%]"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
      </form>
      {error && <p className="mt-4 text-red-500">Error: {error.message}</p>}
      <div className="mt-6 text-center">
        <Link className="text-sm text-gray-700 underline hover:no-underline" href="/reset-password">
          Forgot password
        </Link>
      </div>
    </>
  );
}
