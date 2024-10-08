"use client";

import { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import { useRouter } from 'next/navigation';
import { updateProfile } from 'firebase/auth';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isBusinessSignup, setIsBusinessSignup] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(email, password);
      if (result && result.user) {
        console.log('Sign-up successful!', result.user);
        // Update user profile with account type
        try {
          await updateProfile(result.user, {
            displayName: isBusinessSignup ? 'Business' : 'Individual'
          });
          console.log('Profile updated successfully');
        } catch (updateError) {
          console.error('Error updating profile:', updateError);
        }
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAlertClose = () => {
    console.log('going back to login page');
    setShowAlert(false);
    router.push('/signin');  
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      if (result) {
        console.log('Signed in with Google successfully');
        // You might want to add logic here to set the account type for Google sign-ins
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <>
      {showAlert && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Account Created Successfully!</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Your account has been created. You can now sign in.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={handleAlertClose}
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Go back to login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-10">
        <h1 className="text-4xl font-bold">Create your account</h1>
      </div>

      {/* Signup type toggle */}
      <div className="mb-6 flex justify-center">
        <button
          className={`px-4 py-2 ${!isBusinessSignup ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setIsBusinessSignup(false)}
        >
          Individual
        </button>
        <button
          className={`px-4 py-2 ${isBusinessSignup ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setIsBusinessSignup(true)}
        >
          Business
        </button>
      </div>

      <form onSubmit={handleSignUp}>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="name">
              {isBusinessSignup ? 'Business Name' : 'Full Name'}
            </label>
            <input
              id="name"
              className="form-input w-full py-2"
              type="text"
              placeholder={isBusinessSignup ? 'Acme Inc.' : 'John Doe'}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="form-input w-full py-2"
              type="email"
              placeholder="corybarker@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              autoComplete="on"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-6 space-y-3">
          <button 
            type="submit" 
            className={`btn w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </>
            ) : (
              'Register'
            )}
          </button>
          <div className="text-center text-sm italic text-gray-400">Or</div>
          <button 
            type="button"
            onClick={handleGoogleSignIn}
            className="btn w-full bg-white text-gray-800 shadow hover:bg-gray-50 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </form>

      {/* Bottom link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          By signing up, you agree to the{" "}
          <a className="whitespace-nowrap font-medium text-gray-700 underline hover:no-underline" href="#0">
            Terms of Service
          </a>{" "}
          and{" "}
          <a className="whitespace-nowrap font-medium text-gray-700 underline hover:no-underline" href="#0">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </>
  );
}