'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';


const OAuthSuccessPage = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Extract token from URL hash
    const hash = window.location.hash.substring(1);    
    if (hash) {
      try {
        const params = new URLSearchParams(hash);
        const tokenData = {
          access_token: params.get('access_token'),
          token_type: params.get('token_type')
        };

        if (!tokenData.access_token) {
          throw new Error('No access token found');
        }
        
        // Store token in localStorage
        localStorage.setItem('access_token', tokenData.access_token);
        if (tokenData.token_type) {
          localStorage.setItem('token_type', tokenData.token_type);
        }
        
        // Start countdown
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              router.push('/user/dashboard');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(timer);
      } catch (error) {
        console.error('Error processing token:', error);
        router.push('/login?error=invalid_token');
      }
    } else {
      router.push('/login?error=no_token');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Successfully Verified!
        </h1>
        
        <p className="text-gray-600 mb-4">
          Your account has been successfully verified. 
          Redirecting to dashboard in {countdown} seconds...
        </p>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${((3 - countdown) / 3) * 100}%` }}
          />
        </div>
        
        <button
          onClick={() => router.push('/user/dashboard')}
          className="text-sm text-gray-600 hover:text-gray-900 underline"
        >
          Click here if you are not redirected automatically
        </button>
      </div>
    </div>
  );
};

export default OAuthSuccessPage;