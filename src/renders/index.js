import render from './render';
import renderPlant from './renderPlant';

const renders = {
  plant: renderPlant,
};

export default format => (data) => {
  const rend = renders[format];
  if (!rend) {
    return render(data);
  }
  return rend(data);
};

