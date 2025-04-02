/**
 * Properly capitalizes text for display in titles
 * Handles edge cases like 'san francisco' -> 'San Francisco'
 * and 'new york city' -> 'New York City'
 * 
 * @param {string} text - The string to format in title case
 * @return {string} The properly formatted string
 */
export const toTitleCase = (text) => {
    if (!text) return '';
    
    // Define words that should remain lowercase
    const lowercaseWords = new Set([
      'a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 
      'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'
    ]);
    
    // Define words that have special capitalization
    const specialCaseWords = {
      'usa': 'USA',
      'us': 'US',
      'usaw': 'USAW',
      'ny': 'NY',
      'la': 'LA',
      'sf': 'SF',
      'dc': 'DC',
      'nj': 'NJ',
      'nz': 'NZ',
      'uk': 'UK'
    };
    
    return text.toLowerCase().split(' ').map((word, index) => {
      // Check for special case words first
      if (specialCaseWords[word]) {
        return specialCaseWords[word];
      }
      
      // Check for hyphenated words
      if (word.includes('-')) {
        return word.split('-').map(part => {
          if (specialCaseWords[part]) return specialCaseWords[part];
          return part.charAt(0).toUpperCase() + part.slice(1);
        }).join('-');
      }
      
      // Always capitalize the first word
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      
      // Don't capitalize certain words unless they're the first word
      if (lowercaseWords.has(word)) {
        return word;
      }
      
      // Regular capitalization for other words
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  };