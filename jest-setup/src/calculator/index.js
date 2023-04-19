const add = (a, b) => a + b;
const divide = (a, b) => {
  if (b === 0) {
    throw new Error('Cannot divide by 0');
  } else {
    return a / b;
  }
}

module.exports = {
  add,
  divide
} 