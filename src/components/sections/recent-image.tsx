'use client';
import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MediaItem } from '@/types/media';


interface RecentMediaSectionProps {
    title: string;
    media_list: MediaItem[];
}

const RecentMediaSection: React.FC<RecentMediaSectionProps> = ({ title, media_list }) => {
    // React Slick settings
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 640, // Mobile devices
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 768, // Medium devices (tablets)
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 1024, // Large devices (desktops)
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <div className="w-full relative border rounded-lg overflow-hidden">
            {/* Header with View All button */}
            <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 dark:text-white">
                <h2 className="text-lg font-semibold">{title}</h2>
                <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                </button>
            </div>

            {/* React Slick Carousel */}
            <div className="p-4">
                <Slider {...settings}>
                    {media_list.map((media) => (
                        <div key={media.id} className="px-2">
                            <div className="relative rounded-md overflow-hidden h-48 w-full shadow-sm">
                                {media.type === 'image' ? (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={media.thumbnailUrl}
                                            alt={media.name || 'Media'}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                ) : (
                                    <video
                                        src={media.thumbnailUrl}
                                        controls
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-sm">
                                    {media.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default RecentMediaSection;
