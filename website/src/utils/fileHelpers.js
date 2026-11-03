const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'];

const getExtension = (url) => {
    if (!url) return '';
    try {
        const path = decodeURIComponent(url.split('?')[0]);
        const lastDot = path.lastIndexOf('.');
        return lastDot === -1 ? '' : path.slice(lastDot + 1).toLowerCase();
    } catch {
        return '';
    }
};

export const isImageUrl = (url) => IMAGE_EXTENSIONS.includes(getExtension(url));

// Firebase Storage paths are uploaded as `${Date.now()}_${originalFileName}`,
// so strip that leading timestamp to recover something close to the original name.
export const getFileNameFromUrl = (url) => {
    if (!url) return '첨부파일';
    try {
        const path = decodeURIComponent(url.split('?')[0]);
        const lastSegment = path.substring(path.lastIndexOf('/') + 1);
        return lastSegment.replace(/^\d+_/, '') || '첨부파일';
    } catch {
        return '첨부파일';
    }
};
