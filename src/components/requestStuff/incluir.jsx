import { myurl } from './myurl';

function isFloat(str) {
  const num = parseFloat(str);
  return !isNaN(num) && Number.isFinite(num);
}

function isInteger(str) {
  const num = parseInt(str, 10); // Use base 10 for decimal numbers
  return !isNaN(num) && Number.isFinite(num);
}

export const incluir = (obj, callback) => {
  const qualTabelaUsar = obj['tabela'];

  fetch(myurl + 'validacao_da_tabela', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      obj: obj,
    }),
  })
    .then((res) => res.json())
    .then(
      (result) => {
        let objParaRequest = {};
        let objParaValidacao = result['objParaValidacao'];

        const objParaValidacao2 = {};

        objParaValidacao.forEach((columnInfo) => {
          const columnName = columnInfo['Column Name'];
          const maxLength = columnInfo['Maximum Length'];
          const dataType = columnInfo['Data Type'];
          const nullability = columnInfo['Nullability'];
          const autoIncrement = columnInfo['Auto Increment'];

          objParaValidacao2[columnName] = {
            maxLength,
            dataType,
            nullability,
            autoIncrement,
          };
        });

        delete obj['tabela'];

        const keys = Object.keys(obj);

        for (const key of keys) {
          let value = obj[key];

          if (
            value == '' &&
            objParaValidacao2[key]['Auto Increment'] == 'Auto Increment'
          ) {
            delete objParaValidacao2[key];
          }

          if (
            objParaValidacao2[key]['dataType'] == 'int' ||
            objParaValidacao2[key]['dataType'] == 'tinyint(1)' ||
            objParaValidacao2[key]['dataType'] == 'int unsigned'
          ) {
            if (isInteger(value) == true) {
              objParaRequest[key] = parseInt(value);
            } else if (value == '') {
              objParaRequest[key] = null;
            }
          } else if (objParaValidacao2[key]['dataType'] == 'float') {
            value = value.toString().replace(',', '.');
            if (isFloat(value) == true) {
              objParaRequest[key] = parseFloat(value);
            } else if (value == '') {
              objParaRequest[key] = null;
            }
          } else if (
            objParaValidacao2[key]['dataType'].slice(0, 7) == 'varchar'
          ) {
            objParaRequest[key] = value;
          }
        }

        if (
          objParaRequest['id'] == '' ||
          objParaRequest['id'] == null ||
          objParaRequest['id'] == undefined
        ) {
          fetch(myurl + 'aux_incluir_cadastro', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              obj: {
                dados: objParaRequest,
                tabela: qualTabelaUsar,
              },
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.message == 'Dados salvos com sucesso!') {
                if (typeof callback === 'function') {
                  callback();
                }
              }
            });
        } else {
          fetch(myurl + 'aux_alterar_cadastro', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              obj: {
                tabela: qualTabelaUsar,
                dados: objParaRequest,
                campoid: 'id',
              },
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.message == 'Dados salvos com sucesso!') {
                if (typeof callback === 'function') {
                  callback();
                }
              }
            });
        }
      },
      (error) => {
        console.log(error);
      }
    );
};
