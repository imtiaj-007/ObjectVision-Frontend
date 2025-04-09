export interface ImageMetadata {
    extension: string;
    mime_type: string;
    file_type: string;
    file_size?: number;
    width?: number;
    height?: number;
}

export interface DbImageData {
    id: string;
    filename: string;
    image_metadata: ImageMetadata;
    image_url?: string;
    local_file_path: string;
    cloud_file_path?: string;
    uploaded_at?: string;
    updated_at?: string;
    processed?: boolean;
}

export interface MediaItem {
    id: string
    name: string
    type: 'image' | 'video'
    thumbnailUrl: string
    originalUrl: string
    createdAt: string
    predicitonCount: number
    width?: number
    height?: number
    duration?: string
    predictions?: Prediction[]
}

export interface Prediction {
    id: string
    label: string
    confidence: number
    boundingBox?: {
        x: number
        y: number
        width: number
        height: number
    }
    timestamp?: string
}

export const demoMediaItems: MediaItem[] = [
    {
        id: 'media-1',
        name: 'Sunset at the beach',
        type: 'image',
        thumbnailUrl: 'https://source.unsplash.com/random/300x300/?sunset,beach',
        originalUrl: 'https://source.unsplash.com/random/800x600/?sunset,beach',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        predicitonCount: 5,
        width: 1920,
        height: 1080,
    },
    {
        id: 'media-2',
        name: 'Mountain hiking adventure',
        type: 'video',
        thumbnailUrl: 'https://source.unsplash.com/random/300x300/?mountain',
        originalUrl: 'https://example.com/videos/mountain-hiking.mp4',
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        predicitonCount: 8,
        width: 1280,
        height: 720,
        duration: '2:45',
    },
    {
        id: 'media-3',
        name: 'City skyline at night',
        type: 'image',
        thumbnailUrl: 'https://source.unsplash.com/random/300x300/?city,night',
        originalUrl: 'https://source.unsplash.com/random/800x600/?city,night',
        createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        predicitonCount: 3,
        width: 1200,
        height: 800,
    },
    {
        id: 'media-4',
        name: 'Wildlife documentary clip',
        type: 'video',
        thumbnailUrl: 'https://source.unsplash.com/random/300x300/?wildlife',
        originalUrl: 'https://example.com/videos/wildlife.mp4',
        createdAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
        predicitonCount: 12,
        width: 1920,
        height: 1080,
        duration: '4:22',
    },
    {
        id: 'media-5',
        name: 'Coffee cup macro',
        type: 'image',
        thumbnailUrl: 'https://source.unsplash.com/random/300x300/?coffee',
        originalUrl: 'https://source.unsplash.com/random/800x600/?coffee',
        createdAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
        predicitonCount: 2,
        width: 800,
        height: 600,
    },
    {
        id: 'media-6',
        name: 'Cooking tutorial part 1',
        type: 'video',
        thumbnailUrl: 'https://source.unsplash.com/random/300x300/?cooking',
        originalUrl: 'https://example.com/videos/cooking-tutorial.mp4',
        createdAt: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
        predicitonCount: 7,
        width: 1280,
        height: 720,
        duration: '5:18',
    },
    {
        id: 'media-7',
        name: 'Autumn forest path',
        type: 'image',
        thumbnailUrl: 'https://source.unsplash.com/random/300x300/?autumn,forest',
        originalUrl: 'https://source.unsplash.com/random/800x600/?autumn,forest',
        createdAt: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
        predicitonCount: 4,
        width: 1600,
        height: 900,
    },
    {
        id: 'media-8',
        name: 'Product unboxing video',
        type: 'video',
        thumbnailUrl: 'https://source.unsplash.com/random/300x300/?product,box',
        originalUrl: 'https://example.com/videos/unboxing.mp4',
        createdAt: new Date(Date.now() - 691200000).toISOString(), // 8 days ago
        predicitonCount: 6,
        width: 1080,
        height: 1920, // Portrait video
        duration: '3:15',
    },
    {
        id: 'media-9',
        name: 'Portrait photography',
        type: 'image',
        thumbnailUrl: 'https://source.unsplash.com/random/300x300/?portrait',
        originalUrl: 'https://source.unsplash.com/random/800x600/?portrait',
        createdAt: new Date(Date.now() - 777600000).toISOString(), // 9 days ago
        predicitonCount: 1,
        width: 1200,
        height: 1800,
    },
    {
        id: 'media-10',
        name: 'Drone footage of valley',
        type: 'video',
        thumbnailUrl: 'https://source.unsplash.com/random/300x300/?drone,valley',
        originalUrl: 'https://example.com/videos/drone-footage.mp4',
        createdAt: new Date(Date.now() - 864000000).toISOString(), // 10 days ago
        predicitonCount: 9,
        width: 3840,
        height: 2160, // 4K video
        duration: '1:52',
    },
    {
        id: 'media-11',
        name: 'Abstract art closeup',
        type: 'image',
        thumbnailUrl: 'https://source.unsplash.com/random/300x300/?abstract,art',
        originalUrl: 'https://source.unsplash.com/random/800x600/?abstract,art',
        createdAt: new Date(Date.now() - 950400000).toISOString(), // 11 days ago
        predicitonCount: 3,
        width: 1500,
        height: 1000,
    },
    {
        id: 'media-12',
        name: 'Time-lapse of clouds',
        type: 'video',
        thumbnailUrl: 'https://source.unsplash.com/random/300x300/?clouds,sky',
        originalUrl: 'https://example.com/videos/cloud-timelapse.mp4',
        createdAt: new Date(Date.now() - 1036800000).toISOString(), // 12 days ago
        predicitonCount: 5,
        width: 1920,
        height: 1080,
        duration: '0:45',
    },
]