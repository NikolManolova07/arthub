import { IMAGE_URL } from "../api/constants";

// Helper function for generating the image URL.
export const getImageUrl = (imageUrl?: string) => imageUrl ? `${IMAGE_URL}${imageUrl}` : null

// Helper function for parsing the ISO 8601 string.
export const formatDate = (dateString: string) => {
    const date = new Date(dateString); // 
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

// Helper function for calculating elapsed time from start and end times in ISO 8601 format.
export const getElapsedTimeFormatted = (startISO: string, endISO: string): string => {
    const start = new Date(startISO);
    const end = new Date(endISO);

    const diffMs = end.getTime() - start.getTime();
    const totalSeconds = Math.floor(diffMs / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let result = '';

    if (hours > 0) {
        result += `${hours} ч. `;
    }
    if (minutes > 0 || hours > 0) {
        result += `${minutes} мин. `;
    }

    result += `${seconds} сек.`;

    return result.trim();
};

