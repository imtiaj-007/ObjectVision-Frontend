'use client'
import React from 'react'
import Image from 'next/image'

const WebsiteLogo: React.FC = () => {
    return (
        <Image
            src="/object-vision-logo.png"
            alt="Object Vision Logo"
            width={1789}
            height={743}
            className="h-auto object-contain -ml-4 w-[145px] md:w-[165px] lg:w-[180px]"
            sizes="(max-width: 768px) 145px, (max-width: 1024px) 165px, 180px"
        />
    )
}

export default WebsiteLogo;
