function validaData(value) {
  if (typeof value !== 'string' || value.trim() === '') {
    return false;
  }
  
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return false;

  return date.toISOString().slice(0, 10) === value;
}

module.exports = validaData;
