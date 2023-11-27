import { useState, useContext } from 'react';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// import MyGridTextField from '../multiuso/MyGridTextField';
// import MySelect from '../multiuso/MySelect';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../../multiuso/TabPanel';
import PropTypes from 'prop-types';
import Context from '../../multiuso/Context';
import AlertDialog from '../../multiuso/AlertDialog';

import { handleChange } from '../../handleChangeStuff/handleChange';
import { Divider } from '@mui/material';
import GeradorDeInputs from '../../multiuso/GeradorDeInputs';

import { incluir } from '../../requestStuff/incluir';

function FormFaixaEtarias(props) {
  const [condPag, setCondPag] = useContext(Context);
  const [retornoDoBackEnd, setRetornoDoBackEnd] = useState(false);

  const [value, setValue] = useState(0);

  const btnSalvar = () => {
    condPag['tabela'] = props.qualTabelaUsar;
    incluir(condPag, () => {
      setRetornoDoBackEnd(true);
    });
  };

  const depoisDeClicarNoOk_salvarAlterar = () => {
    props.setOqueMostrar('tabela');
    setRetornoDoBackEnd(false);
  };

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };

  const tab1 = [
    {
      tamanho: 2,
      label: 'id',
      name: 'id',
      qualComponente: 'text',
      itemlist: '',
      disabled: true,
      value: condPag['id'],

      handleChangeProp: (e) => handleChange(e, setCondPag),
    },
    {
      tamanho: 10,
      label: '',
      name: '',
      qualComponente: 'espaco',
      itemlist: '',
      value: '',
      handleChangeProp: '',
    },
    {
      tamanho: 4,
      label: 'Descrição',
      name: 'descricao',
      qualComponente: 'text',
      itemlist: '',
      maxLength: 45,
      value: condPag['descricao'],
      handleChangeProp: (e) => handleChange(e, setCondPag),
    },
    {
      tamanho: 8,
      label: '',
      name: '',
      qualComponente: 'espaco',
      itemlist: '',
      value: '',
      handleChangeProp: '',
    },
    {
      tamanho: 4,
      label: 'Inicial',
      name: 'inicial',
      qualComponente: 'text',
      itemlist: '',
      value: condPag['inicial'],
      handleChangeProp: (e) => handleChange(e, setCondPag),
    },
    {
      tamanho: 4,
      label: 'Final',
      name: 'final',
      qualComponente: 'text',
      itemlist: '',
      value: condPag['final'],
      handleChangeProp: (e) => handleChange(e, setCondPag),
    },
  ];

  return (
    <>
      {retornoDoBackEnd === true ? (
        <AlertDialog
          setAlerta={depoisDeClicarNoOk_salvarAlterar}
          qualMsg={'Dados Lançados com Sucesso!'}
        />
      ) : null}
      <Grid
        item
        xs={12}
        style={{ overflowY: 'scroll', width: '100%', height: '80vh' }}
      >
        <Divider />
        <Tabs
          value={value}
          onChange={handleChange2}
          sx={{
            p: 1,
            paddingLeft: 3,
            '& .Mui-selected': {
              outline: 'none',
            },
          }}
        >
          <Tab label='Cadastro de Faixa Etária' />
        </Tabs>
        <Divider />

        <TabPanel value={value} index={0}>
          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={12}>
              <b>Cadastro de Faixa Etária</b>
            </Grid>
            {tab1.map((item, index) => (
              <GeradorDeInputs item={item} key={index} index={index} />
            ))}
          </Grid>
        </TabPanel>
      </Grid>
      <Grid item xs={12} sx={{ p: 1, height: '20vh' }}>
        <Divider />
        <Grid container spacing={1} sx={{ p: 1 }}>
          <Grid item xs={12} style={{ overflow: 'auto' }}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Button
                  fullWidth
                  variant='contained'
                  color='error'
                  onClick={() => {
                    props.setOqueMostrar('tabela');
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
              <Grid item xs={8}></Grid>
              <Grid item xs={2}>
                <Button
                  fullWidth
                  variant='contained'
                  onClick={() => {
                    btnSalvar();
                  }}
                >
                  Salvar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
      </Grid>
    </>
  );
}
FormFaixaEtarias.propTypes = {
  setOqueMostrar: PropTypes.func.isRequired,
  qualTabelaUsar: PropTypes.string.isRequired,
};
export default FormFaixaEtarias;
