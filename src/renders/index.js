import renderTree from './renderTree';
import renderPlant from './renderPlant';

const renders = {
  plant: renderPlant,
  stylish: renderTree,
  json: JSON.stringify,
};

export default format => (data) => {
  const render = renders[format];
  return render(data);
};

