import _ from 'lodash';

const genDiff = (a, b) => {
  const allKeys = Object.keys({ ...a, ...b });
  const res = allKeys.reduce((acc, key) => {
    if (_.has(a, key) && _.has(b, key)) {
      return (a[key] === b[key]) ? [`    ${key}: ${a[key]}`, ...acc] : [`  - ${key}: ${a[key]}\n  + ${key}: ${b[key]}`, ...acc]
    } else if (_.has(a, key)) {
      return [`  - ${key}: ${a[key]}`, ...acc];
    } else if (_.has(b, key)) {
      return [`  + ${key}: ${b[key]}`, ...acc];
    }
  }, []);
  return res.join('\n');
};

export default genDiff;
