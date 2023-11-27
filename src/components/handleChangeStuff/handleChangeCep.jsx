import { itemListDoBackEnd } from "../requestStuff/itemListDoBackEnd";

const cepRequest = (cep) => {
  if (cep.length === 8) {
    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch(() => {});
  }
};

export const handleChangeCep = (
  event,
  setObject,
  campos,
  setAlerta,
  alerta,
  setCidadeDesteEstado
  // setCodigosDesteEstado
) => {
  const { name, value } = event.target;

  const cep = value.replace(".", "").replace("-", "");
  if (cep.length === 8) {
    cepRequest(cep)
      .then((result) => {
        if (!result.erro) {
          {
            campos.map((item) =>
              setObject((prevObj) => ({
                ...prevObj,
                [item[1]]: result[item[0]],
              }))
            );
          }
          itemListDoBackEnd("buscar_cidades", { estado: result["uf"] }, [
            setCidadeDesteEstado,
          ]);
        } else {
          setAlerta(true);
          campos.map((item) =>
            setObject((prevObj) => ({
              ...prevObj,
              [item[1]]: "",
            }))
          );
        }

        setObject((prevObj) => ({
          ...prevObj,
          [name]: value,
        }));
      })
      .catch(() => {
        {
          campos.map((item) =>
            setObject((prevObj) => ({
              ...prevObj,
              [item[1]]: "",
            }))
          );
        }
        setAlerta(true);
      });
  } else {
    setAlerta(true);
    {
      campos.map((item) =>
        setObject((prevObj) => ({
          ...prevObj,
          [item[1]]: "",
        }))
      );
    }
  }
};
