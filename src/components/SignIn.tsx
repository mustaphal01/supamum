// filepath: /c:/Users/m/Desktop/m/src/components/SignIn.tsx
'use client';

import { useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' instead of 'next/router'
import { googleProvider } from '../lib/firebase';

const SignIn = () => {
  const router = useRouter();
  const auth = getAuth();

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/admin');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/admin');
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={handleSignIn}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;