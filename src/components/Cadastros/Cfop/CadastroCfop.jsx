import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DataTableMui from '../../multiuso/DataTableMui';
import { useState, useContext } from 'react';
import Context from '../../multiuso/Context';
import objCfop from '../../objetosParaRequest/objCfop';
import Form from './FormCfop';

function CadastroCfop() {
  const [obj, setObj] = useContext(Context);

  const [oQueMostrar, setOqueMostrar] = useState('tabela');

  const qualTabelaUsar = 'cadcfop';

  const buttonStyles = {
    '&.Mui-disabled': {
      color: '#007BFF',
      borderColor: '#007BFF',
    },
  };

  return (
    <>
      <Grid item xs={12} sx={{ p: 1 }}>
        <Button
          color='primary'
          variant='outlined'
          sx={buttonStyles}
          fullWidth
          disabled
          size='large'
        >
          <b>Cadastro de CFOP</b>
        </Button>
      </Grid>
      {oQueMostrar === 'tabela' ? (
        <>
          <Grid item xs={12} sx={{ p: 1 }}>
            <DataTableMui
              setOqueMostrar={setOqueMostrar}
              obj={obj}
              setObj={setObj}
              objReseter={objCfop}
              columns={[
                { field: 'id', headerName: 'id', flex: 1 / 10 },
                { field: 'CFOP', headerName: 'CFOP', flex: 1 / 10 },
                {
                  field: 'Descricao',
                  headerName: 'Descrição da Operação',
                  flex: 8 / 10,
                },
              ]}
              tableReaderArgs={{
                tabela: qualTabelaUsar,
                escolhaDeColunas: 'id, CFOP, Descricao',
                ordenar: 'id',
              }}
            />
          </Grid>
        </>
      ) : (
        <Form setOqueMostrar={setOqueMostrar} qualTabelaUsar={qualTabelaUsar} />
      )}
    </>
  );
}

export default CadastroCfop;
