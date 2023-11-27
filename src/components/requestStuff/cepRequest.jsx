export const cepRequest = (cep) => {
  if (cep.length === 8) {
    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error('Erro na consulta de CEP:', error);
      });
  }
};
