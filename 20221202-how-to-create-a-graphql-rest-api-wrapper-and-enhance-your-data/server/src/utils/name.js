const nameFormatter = (name) => {
  const [first, last] = name.split(' ');

  if (last === undefined) {
    return first;
  }
  return `${first} ${last[0].toUpperCase()}.`;
};

module.exports = nameFormatter;
