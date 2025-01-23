import { Camera } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 dark:bg-black border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Camera className="h-6 w-6 text-blue-600" />
            <span className="text-gray-900 dark:text-gray-200 font-semibold">ObjectVision</span>
          </div>
          <p className="text-gray-500 dark:text-gray-200">© 2025 ObjectVision. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer