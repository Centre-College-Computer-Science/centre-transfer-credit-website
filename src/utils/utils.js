// utils.js

// We might have to add some sort of way to handle different things and special characters
export const makeTitleCase = (string) => {
    return string.split(/\s+/).map(word => word === 'of' ? word : word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()).join(' ');
  };
  