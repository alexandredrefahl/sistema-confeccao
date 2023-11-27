import { myurl } from './myurl';

export const buscar_cidades = (obj) => {
  return fetch(myurl + 'buscar_cidades', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      estado: obj,
    }),
  })
    .then((res) => res.json())
    .then(
      (result) => {
        return result;
      },
      (error) => {
        console.log(error);
      }
    );
};
