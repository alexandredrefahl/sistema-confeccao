import { myurl } from './myurl';

export const itemListDoBackEnd = (rota, json, setStates) => {
  return (
    fetch(myurl + rota, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tabelas: json,
      }),
    })
      // aqui que está a questão da volta das duas variáveis
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('Aqui');
          console.log(result);
          {
            setStates.map((item, index) => {
              let oQueVaiDentroDoOps_Array = result.itemLists[index];

              setStates[index](oQueVaiDentroDoOps_Array);
            });
          }
        },
        (error) => {
          console.log(error);
        }
      )
  );
};
