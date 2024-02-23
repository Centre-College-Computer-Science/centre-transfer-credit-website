// utils.js
export const makeTitleCase = (string) => {
    return string.split(/\s+/).map(word => word === 'of' ? word : word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()).join(' ');
  };
  