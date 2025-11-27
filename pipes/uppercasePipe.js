// Pipe pentru transformarea unui șir în majuscule
const uppercasePipe = (text) => {
  if (typeof text !== 'string') {
    return text;
  }
  return text.toUpperCase();
};

module.exports = uppercasePipe;
