import MissPlete from 'miss-plete';

new MissPlete({
  input: document.querySelector('input[name="city"]'),
  options: [["Barcelona", "BCN"], ["San Francisco", "SF"]]
});
