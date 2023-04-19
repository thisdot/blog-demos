const { add, divide } = require(".")

describe('when adding two numbers', () => {
  it('returns the sum', () => {
    expect(add(2, 3)).toEqual(5);
  })
})

describe('when dividing by two numbers', () => {
  it('returns the result', () => {
    expect(divide(6, 3)).toEqual(2);
  })
})

describe('when dividing by zero', () => {
  it('throws an error', () => {
    expect(() => divide(6, 0)).toThrowError('Cannot divide by 0');
  })
})