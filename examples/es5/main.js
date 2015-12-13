var MissPlete = require('miss-plete').default;

new MissPlete({
  input: document.querySelector('input[name="city"]'),
  options: [["Barcelona", "BCN"], ["San Francisco", "SF"]]
});
