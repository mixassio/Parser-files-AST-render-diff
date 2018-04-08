import renderDefault from './render';
import renderPlant from './renderPlant';

const renders = {
  plant: renderPlant,
  stylish: renderDefault,
  json: JSON.stringify,
};

export default format => (data) => {
  const render = renders[format];
  return render(data);
};

