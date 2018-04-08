import render from './render';
import renderPlant from './renderPlant';

const renders = {
  plant: renderPlant,
  undefined: render,
  json: JSON.stringify,
};

export default format => (data) => {
  const rend = renders[format];
  return rend(data);
};

