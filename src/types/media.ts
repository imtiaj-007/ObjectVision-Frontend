
export interface MediaItem {
    id: number;
    src: string;
    alt?: string;
    title: string;
    type: 'image' | 'video';
}