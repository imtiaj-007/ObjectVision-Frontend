export const formatFileSize = (bytes: number, include_size: boolean = true): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const file_size = parseFloat((bytes / Math.pow(k, i)).toFixed(2)).toString();
    return include_size ? file_size + ' ' + sizes[i] : file_size;
};