import Image from 'next/image'
import React from 'react'


const Footer = () => {
  return (
    <footer className="w-full bg-background/80 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-1">
            <Image
              src={'/logo.png'}
              alt="Object Vision Logo"
              width={30}
              height={30}
            />
            <span className="text-xl font-bold text-blue-500">bjectVision</span>
          </div>
          <p className="text-gray-500 dark:text-gray-200">© 2025 ObjectVision. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer