const formatCpf = (input) => {
  // Remove todos os caracteres não numéricos
  const numericInput = input.replace(/\D/g, '');

  // Aplica a máscara do CPF
  if (numericInput.length <= 3) {
    return numericInput;
  } else if (numericInput.length <= 6) {
    return `${numericInput.slice(0, 3)}.${numericInput.slice(3)}`;
  } else if (numericInput.length <= 9) {
    return `${numericInput.slice(0, 3)}.${numericInput.slice(
      3,
      6
    )}.${numericInput.slice(6)}`;
  } else {
    return `${numericInput.slice(0, 3)}.${numericInput.slice(
      3,
      6
    )}.${numericInput.slice(6, 9)}-${numericInput.slice(9, 11)}`;
  }
};

export const handleChangeCPF = (event, setObject) => {
  const { name, value } = event.target;

  const formattedValue = formatCpf(value);

  setObject((prevObj) => ({
    ...prevObj,
    [name]: formattedValue,
  }));
};
