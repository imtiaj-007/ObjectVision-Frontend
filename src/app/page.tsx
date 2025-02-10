'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, Search, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen dark:bg-gradient-dark bg-gradient-light">
      
      {/* Hero Section */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 py-12">
            <h1 className="text-5xl font-bold dark:text-gray-200 text-gray-900 sm:text-6xl">
              Advanced Object Detection
              <span className="block text-blue-600 mt-3">Made Simple</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl dark:text-gray-300 text-gray-600">
              Transform your images into intelligent insights with our state-of-the-art
              object detection technology. Fast, accurate, and easy to use.
            </p>
            <div className="flex justify-center">
              <Link href="auth/signup">
                <Button size="lg" className="text-lg dark:bg-gray-300 px-8 py-6 rounded-full">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 py-12">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Camera className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Real-time Detection</h3>
                <p className="text-gray-400">
                  Instantly detect and classify objects in images with high accuracy
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Advanced Analytics</h3>
                <p className="text-gray-400">
                  Get detailed insights and analysis for each detected object
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Lightning Fast</h3>
                <p className="text-gray-400">
                  Process images quickly with our optimized detection algorithms
                </p>
              </div>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-50 dark:bg-blue-200 rounded-2xl p-8 mt-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Join thousands of users who trust our platform for object detection
            </p>
            <Link href="auth/signup">
              <Button size="lg" className="text-lg dark:bg-blue-600 dark:text-white px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default HomePage;