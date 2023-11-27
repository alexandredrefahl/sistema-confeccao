import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DataTableMui from '../../multiuso/DataTableMui';
import { useState, useContext } from 'react';
import Context from '../../multiuso/Context';
import objProdutoFilho from '../../objetosParaRequest/objProdutoFilho';
import Form from './FormDeProdutosFilhos';

function CadastroDeProdutosFilhos() {
  const [produtoFilho, setProdutoFilho] = useContext(Context);
  const [oQueMostrar, setOqueMostrar] = useState('form');
  const qualTabelaUsar = 'produtos_filho';

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
          <b>Produtos Filhos</b>
        </Button>
      </Grid>
      {oQueMostrar === 'tabela' ? (
        <>
          <Grid item xs={12} sx={{ p: 1 }}>
            <DataTableMui
              setOqueMostrar={setOqueMostrar}
              obj={produtoFilho}
              setObj={setProdutoFilho}
              objReseter={objProdutoFilho}
              columns={[
                { field: 'id', headerName: 'ID', flex: 1 / 2 },
                {
                  field: 'produtos_id',
                  headerName: 'Produtos ID',
                  flex: 1 / 2,
                },
              ]}
              tableReaderArgs={{
                tabela: 'produtos_filho',
                escolhaDeColunas: 'id, produtos_id',
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

export default CadastroDeProdutosFilhos;
