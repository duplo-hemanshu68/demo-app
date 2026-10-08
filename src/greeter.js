function greet(name = 'world') {
  return `Hello, ${name}!`;
}

// Works in Node (tests/CLI) and in the browser (GitHub Pages)
if (typeof module !== 'undefined') module.exports = { greet };
