
const stringifyPlant = (data) => {
  if (data instanceof Object) {
    return 'complex value';
  }
  return `value: ${data}`;
};

export default stringifyPlant;
