import { myurl } from './myurl';

export const rowReader = (obj) => {
  fetch(myurl + 'rowReader', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      obj: obj,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    });
};
