export default (fn) => {
  const cache = {};

  return (...args) => {
    const key = JSON.stringify(args);
    return cache[key] || (
      cache[key] = fn.apply(null, args)
    );
  };
}
