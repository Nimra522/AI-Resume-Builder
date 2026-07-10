/**
 * Format a date string or Date object into a human-readable format
 * @param date - ISO string or Date object
 * @param format - 'relative' for "2 hours ago" or 'absolute' for "Feb 10, 2026"
 * @returns Formatted date string
 */
export const formatLastEdited = (date: string | Date, format: 'relative' | 'absolute' = 'relative'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'absolute') {
    return formatAbsoluteDate(dateObj);
  }
  
  return formatRelativeTime(dateObj);
};

/**
 * Format date as relative time (e.g., "2 hours ago", "3 days ago")
 */
const formatRelativeTime = (date: Date): string => {
  try {
    const now = new Date();
    const timeDiff = now.getTime() - date.getTime();
    
    // Handle invalid dates
    if (isNaN(timeDiff) || timeDiff < 0) {
      console.warn('Invalid time difference:', timeDiff, 'for date:', date);
      return 'recently';
    }
    
    const diffInSeconds = Math.floor(timeDiff / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    }
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return `${diffInWeeks} week${diffInWeeks === 1 ? '' : 's'} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
    }
    
    const diffInYears = Math.floor(diffInDays / 365);
    // Handle potential NaN in year calculation
    if (isNaN(diffInYears) || diffInYears < 0) {
      return 'recently';
    }
    
    return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`;
  } catch (error) {
    console.error('Error in formatRelativeTime:', error);
    return 'recently';
  }
};

/**
 * Format date as absolute time (e.g., "Feb 10, 2026")
 */
const formatAbsoluteDate = (date: Date): string => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  return `on ${month} ${day}, ${year}`;
};

/**
 * Format date for display in the resume card
 * @param lastEdited - ISO string from resume.lastEdited
 * @returns Formatted string like "Edited 2 hours ago"
 */
export const formatResumeLastEdited = (lastEdited: string): string => {
  try {
    // Validate input
    if (!lastEdited || lastEdited === 'undefined' || lastEdited === 'null' || lastEdited === 'Invalid Date') {
      return 'Edited just now';
    }
    
    // Try to parse the date
    const dateObj = new Date(lastEdited);
    
    if (isNaN(dateObj.getTime())) {
      return 'Edited recently';
    }
    
    return `Edited ${formatLastEdited(lastEdited, 'relative')}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Edited recently';
  }
};

/**
 * Format date string (YYYY-MM-DD) to "D MMM, YYYY" format for resume display
 * @param dateString - Date string to format (YYYY-MM-DD format)
 * @returns Formatted date string like "2 Jan, 2022"
 */
export const formatResumeDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};