import { itemListDoBackEnd } from '../requestStuff/itemListDoBackEnd';

export const handleChangeEstado = (
  event,
  setObject,
  setCidadeDesteEstado,
  setCodigosDesteEstado
) => {
  const { name, value } = event.target;

  itemListDoBackEnd('buscar_cidades', { estado: value }, [
    setCidadeDesteEstado,
    setCodigosDesteEstado,
  ]);

  setObject((prevObj) => ({
    ...prevObj,
    [name]: value,
  }));
};
