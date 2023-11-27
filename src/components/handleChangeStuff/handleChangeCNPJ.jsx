const formatCnpj = (input) => {
  // Remove todos os caracteres não numéricos
  const numericInput = input.replace(/\D/g, '');

  // Aplica a máscara do CNPJ
  if (numericInput.length <= 2) {
    return numericInput;
  } else if (numericInput.length <= 5) {
    return `${numericInput.slice(0, 2)}.${numericInput.slice(2)}`;
  } else if (numericInput.length <= 8) {
    return `${numericInput.slice(0, 2)}.${numericInput.slice(
      2,
      5
    )}.${numericInput.slice(5)}`;
  } else if (numericInput.length <= 12) {
    return `${numericInput.slice(0, 2)}.${numericInput.slice(
      2,
      5
    )}.${numericInput.slice(5, 8)}/${numericInput.slice(8)}`;
  } else {
    return `${numericInput.slice(0, 2)}.${numericInput.slice(
      2,
      5
    )}.${numericInput.slice(5, 8)}/${numericInput.slice(
      8,
      12
    )}-${numericInput.slice(12, 14)}`;
  }
};
export const handleChangeCNPJ = (event, setObject) => {
  const { name, value } = event.target;

  const formattedValue = formatCnpj(value);

  setObject((prevObj) => ({
    ...prevObj,
    [name]: formattedValue,
  }));
};
