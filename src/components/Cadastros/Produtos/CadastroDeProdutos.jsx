import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DataTableMui from '../../multiuso/DataTableMui';
import { useState, useContext } from 'react';
import Context from '../../multiuso/Context';
import objProduto from '../../objetosParaRequest/objProduto';
import FormDeProdutos from './FormDeProdutos';

function CadastroDeProdutos() {
  const [produto, setProduto] = useContext(Context);
  const [oQueMostrar, setOqueMostrar] = useState('tabela');
  const qualTabelaUsar = 'produtos';

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
          <b>Produtos</b>
        </Button>
      </Grid>
      {oQueMostrar === 'tabela' ? (
        <>
          <Grid item xs={12} sx={{ p: 1 }}>
            <DataTableMui
              setOqueMostrar={setOqueMostrar}
              obj={produto}
              setObj={setProduto}
              objReseter={objProduto}
              columns={[
                { field: 'id', headerName: 'ID', flex: 1 / 10 },
                {
                  field: 'nome',
                  headerName: 'nome',
                  flex: 9 / 10,
                },
              ]}
              tableReaderArgs={{
                tabela: qualTabelaUsar,
                escolhaDeColunas: 'id, nome',
                ordenar: 'id',
              }}
            />
          </Grid>
        </>
      ) : (
        <FormDeProdutos
          setOqueMostrar={setOqueMostrar}
          qualTabelaUsar={qualTabelaUsar}
        />
      )}
    </>
  );
}

export default CadastroDeProdutos;
