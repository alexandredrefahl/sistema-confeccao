import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DataTableMui from '../../multiuso/DataTableMui';
import { useState, useContext } from 'react';
import Context from '../../multiuso/Context';
import objFormPag from '../../objetosParaRequest/objFormPag';
import FormFormaPag from './FormFormaPag';

function CadastroFormaPag() {
  const [formPag, setFormPag] = useContext(Context);
  const [oQueMostrar, setOqueMostrar] = useState('tabela');
  const qualTabelaUsar = 'finFormaPag';

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
          <b>Formas de Pagamentos</b>
        </Button>
      </Grid>
      {oQueMostrar === 'tabela' ? (
        <>
          <Grid item xs={12} sx={{ p: 1 }}>
            <DataTableMui
              setOqueMostrar={setOqueMostrar}
              obj={formPag}
              setObj={setFormPag}
              objReseter={objFormPag}
              columns={[
                { field: 'id', headerName: 'ID', flex: 1 / 10 },
                {
                  field: 'forma',
                  headerName: 'Descricao',
                  flex: 9 / 10,
                },
              ]}
              tableReaderArgs={{
                tabela: qualTabelaUsar,
                escolhaDeColunas: 'id, forma',
                ordenar: 'id',
              }}
            />
          </Grid>
        </>
      ) : (
        <FormFormaPag
          setOqueMostrar={setOqueMostrar}
          qualTabelaUsar={qualTabelaUsar}
        />
      )}
    </>
  );
}

export default CadastroFormaPag;
