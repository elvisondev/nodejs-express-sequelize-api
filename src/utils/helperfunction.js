module.exports = ObjetoParams => {
  for (const propiedade in ObjetoParams) {
    if (/ID|id/.test(propiedade)) {
      ObjetoParams[propiedade] = Number(ObjetoParams[propiedade]);
    }
  }
  return ObjetoParams
};
