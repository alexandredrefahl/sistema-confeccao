import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DataTableMui from '../../multiuso/DataTableMui';
import FormCliente from './FormCliente';
import { useState, useContext } from 'react';
import Context from '../../multiuso/Context';
import objCliente from '../../objetosParaRequest/objCliente';

function CadastroDeCliente() {
  const [cliente, setCliente] = useContext(Context);
  const [oQueMostrar, setOqueMostrar] = useState('tabela');
  const qualTabelaUsar = 'clientes';

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
          <b>Clientes</b>
        </Button>
      </Grid>
      {oQueMostrar === 'tabela' ? (
        <>
          <Grid item xs={12} sx={{ p: 1 }}>
            <DataTableMui
              setOqueMostrar={setOqueMostrar}
              obj={cliente}
              setObj={setCliente}
              objReseter={objCliente}
              columns={[
                { field: 'id', headerName: 'ID', flex: 1 / 10 },
                {
                  field: 'razaoSocial',
                  headerName: 'Razão Social',
                  flex: 9 / 10,
                },
              ]}
              tableReaderArgs={{
                tabela: qualTabelaUsar,
                escolhaDeColunas: 'id, razaoSocial, telefone1, email',
                ordenar: 'id',
              }}
            />
          </Grid>
        </>
      ) : (
        <FormCliente
          setOqueMostrar={setOqueMostrar}
          qualTabelaUsar={qualTabelaUsar}
        />
      )}
    </>
  );
}

export default CadastroDeCliente;
