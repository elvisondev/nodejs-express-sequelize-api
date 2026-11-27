const validarCpf =  cpf => {
  if (cpf.length !== 11) return false;
  return true;
};


module.exports = validarCpf