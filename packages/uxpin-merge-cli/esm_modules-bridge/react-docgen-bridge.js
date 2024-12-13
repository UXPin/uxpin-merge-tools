const loadReactDocgen = async () => {
  const module = await import('react-docgen');
  return module;
};

module.exports = loadReactDocgen;
