import { parse } from 'ini';
import { safeLoad } from 'js-yaml';

export default (format, data) => {
  switch (format) {
    case '':
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return safeLoad(data);
    case '.ini':
      return parse(data);
    default:
      throw new Error(`unkown format: ${format}`);
  }
};
