import { useState, useContext, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TabPanel from '../../multiuso/TabPanel';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Context from '../../multiuso/Context';
import GeradorDeInputs from '../../multiuso/GeradorDeInputs';
import { handleChange } from '../../handleChangeStuff/handleChange';
import PropTypes from 'prop-types';
import { Divider } from '@mui/material';
import AlertDialog from '../../multiuso/AlertDialog';
import { handleChangeFloat } from '../../handleChangeStuff/handleChangeFloat';
import { incluir } from '../../requestStuff/incluir';
import DataTableMuiSimple from '../../multiuso/DataTableMuiSimple';
import { itemListDoBackEnd } from '../../requestStuff/itemListDoBackEnd';

function FormDeProdutosFilhos(props) {
  const [obj, setObj] = useContext(Context);
  const [retornoDoBackEnd, setRetornoDoBackEnd] = useState(false);

  const [combinacoesEstoque, setCombinacoeEstoques] = useState([]);
  const [combinacoesPrecos, setCombinacoesPrecos] = useState([]);

  const [triggerVariable, setTriggerVariable] = useState(0);

  const [optCor, setOptCor] = useState([]);
  const [optCorHEX, setOptCorHEX] = useState([]);
  const [optTamanho, setOptTamanho] = useState([]);

  const [value, setValue] = useState(0);

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    itemListDoBackEnd(
      'preenche_multi_select',
      [
        ['cadcor', 'Cor'],
        ['cadcor', 'Hexa'],
        ['cadtamanho', 'Tamanho'],
      ],
      [setOptCor, setOptCorHEX, setOptTamanho]
    );
  }, []);

  const btnSalvar = () => {
    obj['tabela'] = props.qualTabelaUsar;
    incluir(obj, () => {
      setRetornoDoBackEnd(true);
    });
  };

  useEffect(() => {
    computeCombinacoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerVariable]);

  const computeCombinacoes = () => {
    let Tamanhos = obj['Tamanho'];
    let cor = obj['cor'];
    let arrTemporaria = [];

    for (let i = 0; i < Tamanhos.length; i++) {
      for (let j = 0; j < cor.length; j++) {
        arrTemporaria.push(
          {
            tamanho: 12,
            texto: Tamanhos[i] + '-' + cor[j],
            qualComponente: 'titulo',
          },
          {
            tamanho: 4,
            label: 'estoque',
            qualComponente: 'text',
          }
        );
      }
    }
    setCombinacoeEstoques(arrTemporaria);

    arrTemporaria = [];

    for (let i = 0; i < Tamanhos.length; i++) {
      for (let j = 0; j < cor.length; j++) {
        arrTemporaria.push(
          {
            tamanho: 12,
            texto: Tamanhos[i] + '-' + cor[j],
            qualComponente: 'titulo',
          },
          {
            tamanho: 3,
            label: 'Varejo Original',
            qualComponente: 'text',
          },
          {
            tamanho: 3,
            label: 'Varejo Promoção',
            qualComponente: 'text',
          },
          {
            tamanho: 3,
            label: 'Data Inicio',
            qualComponente: 'text',
          },
          {
            tamanho: 3,
            label: 'Data Fim',
            qualComponente: 'text',
          },
          {
            tamanho: 3,
            label: 'Atacado Original',
            qualComponente: 'text',
          },
          {
            tamanho: 3,
            label: 'Atacado Promoção',
            qualComponente: 'text',
          },
          {
            tamanho: 3,
            label: 'Data Inicio',
            qualComponente: 'text',
          },
          {
            tamanho: 3,
            label: 'Data Fim',
            qualComponente: 'text',
          },
          {
            qualComponente: 'divider',
          }
        );
      }
    }
    setCombinacoesPrecos(arrTemporaria);
  };

  const dadosGerais = [
    {
      tamanho: 2,
      label: 'Id',
      name: 'id',
      disabled: true,
      qualComponente: 'text',
      itemlist: '',
      value: obj['id'],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 2,
      label: 'produtos_id',
      name: 'produtos_id',
      disabled: true,
      qualComponente: 'text',
      itemlist: '',
      value: obj['produtos_id'],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 2,
      label: 'sku',
      name: 'sku',
      qualComponente: 'text',
      itemlist: '',
      value: obj['sku'],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 2,
      label: 'referencia',
      name: 'referencia',
      qualComponente: 'text',
      itemlist: '',
      value: obj['referencia'],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 12,
      qualComponente: 'divider',
    },
    {
      tamanho: 2,
      label: 'preco_varejo',
      name: 'preco_varejo',
      qualComponente: 'text',
      itemlist: '',
      value: obj['preco_varejo'],
      handleChangeProp: (e) => handleChangeFloat(e, setObj),
    },
    {
      tamanho: 2,
      label: 'preco_atacado',
      name: 'preco_atacado',
      qualComponente: 'text',
      itemlist: '',
      value: obj['preco_atacado'],
      handleChangeProp: (e) => handleChangeFloat(e, setObj),
    },
    {
      tamanho: 2,
      label: 'preco_promo_varejo',
      name: 'preco_promo_varejo',
      qualComponente: 'text',
      itemlist: '',
      value: obj['preco_promo_varejo'],
      handleChangeProp: (e) => handleChangeFloat(e, setObj),
    },
    {
      tamanho: 2,
      label: 'preco_promo_atacado',
      name: 'preco_promo_atacado',
      qualComponente: 'text',
      itemlist: '',
      value: obj['preco_promo_atacado'],
      handleChangeProp: (e) => handleChangeFloat(e, setObj),
    },
    {
      tamanho: 2,
      label: 'peso',
      name: 'peso',
      qualComponente: 'text',
      itemlist: '',
      value: obj['peso'],
      handleChangeProp: (e) => handleChangeFloat(e, setObj),
    },
    {
      tamanho: 2,
      label: 'estoque',
      name: 'estoque',
      qualComponente: 'text',
      value: obj['estoque'],
      handleChangeProp: (e) => {
        handleChange(e, setObj), console.log(obj);
      },
    },
  ];

  const cores = [
    {
      tamanho: 12,
      qualComponente: 'botao',
      textoDoBotao: 'Atualizar Produtos Filhos',
      onClick: () => setTriggerVariable(triggerVariable + 1),
    },
    {
      tamanho: 12,
      qtsCheckBoxPorColuna: 4,
      label: 'Cores',
      name: 'cor',
      qualComponente: 'checkbox',
      itemList: optCor,
      itemListValue: optCor,
      coresHEX: optCorHEX,
      value: obj['cor'],
      obj: obj,
      setObj: setObj,
      handleChangeProp: (e) => handleChange(e, setObj),
    },
  ];

  const tamanhos = [
    {
      tamanho: 12,
      qualComponente: 'botao',
      textoDoBotao: 'Atualizar Produtos Filhos',
      onClick: () => setTriggerVariable(triggerVariable + 1),
    },
    {
      tamanho: 12,
      qtsCheckBoxPorColuna: 1,
      label: 'Tamanhos',
      name: 'Tamanho',
      qualComponente: 'checkbox',
      itemList: optTamanho,
      itemListValue: optTamanho,
      coresHEX: [],
      obj: obj,
      setObj: setObj,
      value: obj['Tamanho'],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
  ];

  const depoisDeClicarNoOk_salvarAlterar = () => {
    props.setOqueMostrar('tabela');
    setRetornoDoBackEnd(false);
  };

  useEffect(() => {}, []);

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
          <Tab label='Escolha o Produto Pai' />
          {obj['produtos_id'] === '' ? null : (
            <Tab label='Detalhes do Produto Filho' />
          )}
          {obj['produtos_id'] === '' ? null : <Tab label='Cores' />}
          {obj['produtos_id'] === '' ? null : <Tab label='Tamanhos' />}
          {obj['produtos_id'] === '' ? null : <Tab label='Estoques' />}
          {obj['produtos_id'] === '' ? null : <Tab label='Preços' />}
        </Tabs>
        <Divider />
        <TabPanel value={value} index={0}>
          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={12} sx={{ p: 1 }}>
              <DataTableMuiSimple obj={obj} setObj={setObj} />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={12}>
              <b>Dados Gerais</b>
            </Grid>
            {dadosGerais.map((item, index) => (
              <GeradorDeInputs item={item} key={index} index={index} />
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid container spacing={2} sx={{ p: 1 }}>
            {cores.map((item, index) => (
              <GeradorDeInputs item={item} key={index} index={index} />
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Grid container spacing={2} sx={{ p: 1 }}>
            {tamanhos.map((item, index) => (
              <GeradorDeInputs item={item} key={index} index={index} />
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Grid container spacing={2} sx={{ p: 1 }}>
            {combinacoesEstoque.map((item, index) => (
              <GeradorDeInputs item={item} key={index} index={index} />
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Grid container spacing={2} sx={{ p: 1 }}>
            {combinacoesPrecos.map((item, index) => (
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

FormDeProdutosFilhos.propTypes = {
  setOqueMostrar: PropTypes.func.isRequired,
  qualTabelaUsar: PropTypes.string.isRequired,
};

export default FormDeProdutosFilhos;
