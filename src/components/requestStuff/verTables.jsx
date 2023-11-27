import { myurl } from "./myurl";

export const verTables = () => {
  return fetch(myurl + "validacao_tabela", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(
      (result) => {
        console.log(result);
        alert(result);
        // return result;
      },
      (error) => {
        console.log(error);
      }
    );
};
