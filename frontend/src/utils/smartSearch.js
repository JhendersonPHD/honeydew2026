import Fuse from 'fuse.js';

/**
 * Creates a smart search instance using Fuse.js.
 * @param {Array} list The list of items to search.
 * @param {Array} keys The keys to search within each item.
 * @returns {Object} An object with a search method.
 */
export const createSmartSearch = (list, keys = ['name', 'description', 'category']) => {
  const options = {
    includeScore: true,
    shouldSort: true,
    threshold: 0.4, // lower is more exact
    keys: keys
  };

  const fuse = new Fuse(list, options);

  return {
    search: (query) => {
      if (!query) return list.map(item => ({ item, score: 0 })); // Return all if no query
      return fuse.search(query);
    }
  };
};

/**
 * Custom debouncer utility.
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
