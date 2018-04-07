import _ from 'lodash';

const stringify = (data, countSpases) => {
  if (data instanceof Object) {
    const key = _.keys(data)[0];
    return `{\n${' '.repeat(countSpases + 4)}  ${key}: ${data[key]}\n${' '.repeat(countSpases + 2)}}`;
  }
  return data;
};

export default stringify;
