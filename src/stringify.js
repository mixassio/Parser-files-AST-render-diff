import _ from 'lodash';

const stringify = (data) => {
  if (data instanceof Object) {
    const key = _.keys(data)[0];
    return `${key}: ${data[key]}`;
  }
  return data;
};

export default stringify;
