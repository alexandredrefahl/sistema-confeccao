import { useState, useContext, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TabPanel from '../../multiuso/TabPanel';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Context from '../../multiuso/Context';
import GeradorDeInputs from '../../multiuso/GeradorDeInputs';
import { handleChange } from '../../handleChangeStuff/handleChange';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider } from '@mui/material';
import AlertDialog from '../../multiuso/AlertDialog';
import { incluir } from '../../requestStuff/incluir';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { itemListDoBackEnd } from '../../requestStuff/itemListDoBackEnd';
import { myurl } from '../../requestStuff/myurl';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';

function FormDeProdutos(props) {
  const [obj, setObj] = useContext(Context);
  const [retornoDoBackEnd, setRetornoDoBackEnd] = useState(false);
  const [optAlca, setOptAlca] = useState([]);
  const [optBarraPeca, setOptBarraPeca] = useState([]);
  const [optCategoria, setOptCategoria] = useState([]);
  const [optCompManga, setOptCompManga] = useState([]);
  const [optCompPeca, setOptCompPeca] = useState([]);
  const [optDecotes, setOptDecotes] = useState([]);
  const [optModelagens, setOptModelagens] = useState([]);
  const [optTamanhos, setOptTamanhos] = useState([]);
  const [optOmbro, setOptOmbro] = useState([]);
  const [optSubCategoria, setOptSubCategoria] = useState([]);
  const [optTipoManga, setOptTipoManga] = useState([]);
  const [optBarraManga, setOptBarraManga] = useState([]);
  const [value, setValue] = useState(0);
  const [optCor, setOptCor] = useState([]);
  const [optCorHEX, setOptCorHEX] = useState([]);
  const [open, setOpen] = useState(false);
  const maxWidth = 'xl';
  const [checked, setChecked] = useState({});
  const [combinacoes, setCombinacoes] = useState([]);
  const [combinacoesEstoque, setCombinacoeEstoques] = useState([]);
  const [combinacoesPrecos, setCombinacoePrecos] = useState([]);
  const [combinacoes_sku_ean, setCombinacoes_sku_ean] = useState([]);

  const coringa = () => {
    let combinacoesTotais = [];
    let tamanhosEscolhidos = [];
    Object.keys(checked).forEach((key) => {
      if (checked[key] == true) {
        tamanhosEscolhidos.push(key);
      }
    });
    let tamanhosEscolhidosLen = tamanhosEscolhidos.length;
    let coresLen = obj['cor'].length;

    for (var i = 0; i < tamanhosEscolhidosLen; i++) {
      for (var x = 0; x < coresLen; x++) {
        combinacoesTotais.push({
          id: '',
          produto_id: obj['id'],
          nomeDoProdutoFilho: obj['cor'][x] + '-' + tamanhosEscolhidos[i],
          cor: obj['cor'][x],
          tamanho: tamanhosEscolhidos[i],
          estoque: '',
          peso: '',
          preco_varejo: '',
          preco_promo_varejo: '',
          preco_atacado: '',
          preco_promo_atacado: '',
          dataInicioPromocao: '',
          dataFimPromocao: '',
          ean: '',
          sku: '',
        });
      }
    }

    setCombinacoes(combinacoesTotais);
  };

  const handleChangeProdutoFilho = (event, index, campoParaAlterar) => {
    const { value } = event.target;

    setObj((prevObject) => {
      const updatedProdutosFilhos = [...prevObject.produtosFilhos];
      updatedProdutosFilhos[index] = {
        ...updatedProdutosFilhos[index],
        [campoParaAlterar]: value,
      };
      return { ...prevObject, produtosFilhos: updatedProdutosFilhos };
    });
  };

  const administradorDosProdutosFilhos = () => {
    const valores_para_retirar = obj['produtosFilhos'].map(
      (item) => item.nomeDoProdutoFilho
    );

    const array_sem_os_repetidos = combinacoes.filter(
      (item) => !valores_para_retirar.includes(item.nomeDoProdutoFilho)
    );

    let array_com_novos_valores_maisProdutosFilhos =
      array_sem_os_repetidos.concat(obj['produtosFilhos']);

    setObj((prevObj) => ({
      ...prevObj,
      ['produtosFilhos']: array_com_novos_valores_maisProdutosFilhos,
    }));

    setChecked({});
    setObj((prevObj) => ({
      ...prevObj,
      ['cor']: [],
    }));

    setOpen(false);
  };

  useEffect(() => {
    let arrTemporaria = [];
    obj['produtosFilhos'].forEach((produto, index) => {
      arrTemporaria.push(
        {
          tamanho: 12,
          texto: produto.nomeDoProdutoFilho,
          qualComponente: 'titulo',
        },
        {
          tamanho: 4,
          label: 'Estoque Atual',
          name: produto.nomeDoProdutoFilho,
          qualComponente: 'text',
          type: 'number',
          value: obj['produtosFilhos'][index]['estoque'],
          handleChangeProp: (e) =>
            handleChangeProdutoFilho(e, index, 'estoque'),
        },
        {
          tamanho: 12,
          qualComponente: 'divider',
        }
      );
    });
    setCombinacoeEstoques(arrTemporaria);

    arrTemporaria = [];
    obj['produtosFilhos'].forEach((produto, index) => {
      arrTemporaria.push(
        {
          tamanho: 12,
          texto: produto.nomeDoProdutoFilho,
          qualComponente: 'titulo',
        },
        {
          tamanho: 3,
          label: 'Data Início da Promoção',
          qualComponente: 'text',
          type: 'date',
          value: obj['produtosFilhos'][index]['dataInicioPromocao'],
          handleChangeProp: (e) =>
            handleChangeProdutoFilho(e, index, 'dataInicioPromocao'),
        },
        {
          tamanho: 3,
          label: 'Data Fim da Promoção',
          qualComponente: 'text',
          type: 'date',
          value: obj['produtosFilhos'][index]['dataFimPromocao'],
          handleChangeProp: (e) =>
            handleChangeProdutoFilho(e, index, 'dataFimPromocao'),
        },
        { tamanho: 12, qualComponente: 'espaco' },
        {
          tamanho: 3,
          label: 'Preço Varejo',
          qualComponente: 'text',
          type: 'number',
          value: obj['produtosFilhos'][index]['preco_varejo'],
          handleChangeProp: (e) =>
            handleChangeProdutoFilho(e, index, 'preco_varejo'),
        },
        {
          tamanho: 3,
          label: 'Preço Varejo Promoção',
          qualComponente: 'text',
          type: 'number',
          value: obj['produtosFilhos'][index]['preco_promo_varejo'],
          handleChangeProp: (e) =>
            handleChangeProdutoFilho(e, index, 'preco_promo_varejo'),
        },
        {
          tamanho: 3,
          label: 'Preço Atacado',
          qualComponente: 'text',
          type: 'number',
          value: obj['produtosFilhos'][index]['preco_atacado'],
          handleChangeProp: (e) =>
            handleChangeProdutoFilho(e, index, 'preco_atacado'),
        },
        {
          tamanho: 3,
          label: 'Preço Atacado Promoção',
          qualComponente: 'text',
          type: 'number',
          value: obj['produtosFilhos'][index]['preco_promo_atacado'],
          handleChangeProp: (e) =>
            handleChangeProdutoFilho(e, index, 'preco_promo_atacado'),
        },
        {
          tamanho: 12,
          qualComponente: 'divider',
        }
      );
    });

    setCombinacoePrecos(arrTemporaria);

    arrTemporaria = [];

    obj['produtosFilhos'].forEach((produto, index) => {
      arrTemporaria.push(
        {
          tamanho: 12,
          texto: produto.nomeDoProdutoFilho,
          qualComponente: 'titulo',
        },

        {
          tamanho: 6,
          label: 'SKU',
          qualComponente: 'text',
          type: 'text',
          disabled: true,
          value: obj['produtosFilhos'][index]['sku'],
        },
        {
          tamanho: 6,
          label: 'EAN',
          qualComponente: 'text',
          type: 'text',
          value: obj['produtosFilhos'][index]['ean'],
          handleChangeProp: (e) => handleChangeProdutoFilho(e, index, 'ean'),
        },
        {
          tamanho: 12,
          qualComponente: 'divider',
        }
      );
    });

    setCombinacoes_sku_ean(arrTemporaria);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obj['produtosFilhos']]);

  const checkBox_handleChange1 = (e, coolName) => {
    if (coolName.slice(coolName.length - 1) == '&') {
      Object.keys(checked).forEach((key) => {
        if (
          coolName.slice(0, coolName.length - 1) ==
          key.slice(0, coolName.length - 1)
        ) {
          setChecked((prevState) => ({
            ...prevState,
            [key]: true,
          }));
        }
      });
    } else {
      if (checked[coolName] == true) {
        setChecked((prevState) => ({
          ...prevState,
          [coolName]: false,
        }));
      } else {
        setChecked((prevState) => ({
          ...prevState,
          [coolName]: true,
        }));
      }
    }
  };

  const addMoreOptions = (grade, tamanho) => {
    setChecked((prevState) => ({
      ...prevState,
      [grade + '-' + tamanho]: false,
    }));
  };

  const Children = (item, grade) => {
    const todasAsOpcoes = item.item;
    grade = item.grade;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Button
            color='primary'
            variant='outlined'
            sx={buttonStyles}
            disabled
            size='small'
          >
            <b>{grade}</b>
          </Button>
          <Button onClick={(e) => checkBox_handleChange1(e, grade + '-&')}>
            <DoneAllIcon /> Todos
          </Button>
          {todasAsOpcoes.map((item, index) =>
            item != '' ? (
              <FormControlLabel
                label={item}
                name={item}
                key={index}
                grade={grade}
                control={
                  <Checkbox
                    checked={checked[grade + '-' + item]}
                    onChange={(e) =>
                      checkBox_handleChange1(e, grade + '-' + item)
                    }
                  />
                }
              />
            ) : null
          )}
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
    );
  };

  const [todasAsGrades, setTodasAsGrades] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const buttonStyles = {
    '&.Mui-disabled': {
      color: '#007BFF',
      borderColor: '#007BFF',
    },
  };

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };

  const [mensagemDeRetorno_Boolean, setMensagemDeRetorno_Boolean] =
    useState(false);
  const [mensagemDeRetorno_text, setMensagemDeRetorno_text] = useState('');
  const [mensagemDeRetorno_text2, setMensagemDeRetorno_text2] = useState('');

  const fechaORetorono = () => {
    setMensagemDeRetorno_Boolean(false);
  };

  const btnSalvar = () => {
    // obj['tabela'] = props.qualTabelaUsar;
    // incluir(obj, () => {
    //   setRetornoDoBackEnd(true);
    // });
    console.log(obj);
    fetch(myurl + 'cad_gravar_produto', {
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
        setMensagemDeRetorno_text(result.message);
        if (result.message2 != '') {
          setMensagemDeRetorno_text2(result.message2);
        }
        setMensagemDeRetorno_Boolean(true);
      });
  };

  const dadosGerais = [
    {
      tamanho: 2,
      label: 'Ref.',
      name: 'ref',
      qualComponente: 'text',
      type: 'text',
      itemlist: '',
      value: obj['ref'],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 2,
      label: 'GTIN.',
      name: 'gtin',
      qualComponente: 'text',
      type: 'text',
      itemlist: '',
      value: obj['gtin'],
      handleChangeProp: (e) => handleChange(e, setObj),
      maxLength: 20,
    },
    {
      tamanho: 2,
      label: 'NCM',
      name: 'ncm',
      qualComponente: 'text',
      type: 'text',
      itemlist: '',
      value: obj['ncm'],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 3,
      qualComponente: 'espaco',
    },
    {
      tamanho: 5,
      label: 'Ativo',
      name: 'ativo',
      qualComponente: 'radio',
      itemlist: ['Ativo', 'Inativo'],
      itemData: [1, 0],
      value: obj['ativo'],
      handleChangeProp: (e) => {
        handleChange(e, setObj);
      },
      maxLength: 1,
    },
    {
      tamanho: 7,
      qualComponente: 'espaco',
      handleChangeProp: '',
    },
    {
      tamanho: 6,
      label: 'Produto',
      name: 'nome',
      qualComponente: 'text',
      type: 'text',
      itemlist: '',
      value: obj['nome'],
      handleChangeProp: (e) => handleChange(e, setObj),
      maxLength: 60,
    },
    {
      tamanho: 6,
      label: 'Nome no Site',
      name: 'nomeSite',
      qualComponente: 'text',
      type: 'text',
      itemlist: '',
      value: obj['site'],
      handleChangeProp: (e) => handleChange(e, setObj),
      maxLength: 60,
    },
    {
      tamanho: 6,
      label: 'Nome Sob Encomenda',
      name: 'nomeEncomenda',
      qualComponente: 'text',
      type: 'text',
      itemlist: '',
      value: obj['nomeEncomenda'],
      handleChangeProp: (e) => handleChange(e, setObj),
      maxLength: 60,
    },
    {
      tamanho: 6,
      label: 'Descrição Longa',
      name: 'descricaoLonga',
      qualComponente: 'text',
      type: 'text',
      itemlist: '',
      value: obj['descricaoLonga'],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 6,
      label: 'Descrição Curta',
      name: 'descricaoCurta',
      qualComponente: 'text',
      type: 'text',
      itemlist: '',
      value: obj['descricaoCurta'],
      handleChangeProp: (e) => handleChange(e, setObj),
      maxLength: 200,
    },
  ];

  const detalhes = [
    {
      tamanho: 3,
      label: 'Unidade',
      name: 'unidade',
      qualComponente: 'text',
      type: 'text',
      itemlist: '',
      value: obj['unidade'],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 3,
      label: 'Marca',
      name: 'marca',
      qualComponente: 'text',
      type: 'text',
      itemlist: '',
      value: obj['marca'],
      handleChangeProp: (e) => handleChange(e, setObj),
      maxLength: 45,
    },
    {
      tamanho: 3,
      label: 'Coleção',
      name: 'colecao',
      qualComponente: 'text',
      type: 'text',
      itemlist: '',
      value: obj['colecao'],
      handleChangeProp: (e) => handleChange(e, setObj),
      maxLength: 30,
    },
    {
      tamanho: 3,
      label: 'Categoria',
      name: 'categoria',
      qualComponente: 'select',
      itemList: optCategoria,
      itemData: optCategoria,
      value: obj['categoria'],
      handleChangeProp: (e) => handleChange(e, setObj),
      maxLength: 25,
    },
    {
      tamanho: 3,
      label: 'Sub-Categoria',
      name: 'subCategoria',
      qualComponente: 'select',
      itemList: optSubCategoria,
      itemData: optSubCategoria,
      value: obj['subCategoria'],
      handleChangeProp: (e) => handleChange(e, setObj),
      maxLength: 25,
    },
    {
      tamanho: 3,
      label: 'Grade de Tamanhos',
      name: 'faixaEtaria',
      qualComponente: 'select',
      itemList: optTamanhos,
      itemData: optTamanhos,
      value: obj['faixaEtaria'],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 3,
      label: 'Modelagem',
      name: 'modelagem',
      qualComponente: 'select',
      itemList: optModelagens,
      itemData: optModelagens,
      value: obj['modelagem'],
      handleChangeProp: (e) => handleChange(e, setObj),
      maxLength: 25,
    },
    {
      tamanho: 3,
      label: 'Decote',
      name: 'decote',
      qualComponente: 'select',
      itemList: optDecotes,
      itemData: optDecotes,
      value: obj['decote'],
      handleChangeProp: (e) => handleChange(e, setObj),
      maxLength: 15,
    },
    {
      tamanho: 3,
      label: 'Alça',
      name: 'Alca',
      qualComponente: 'select',
      itemList: optAlca,
      itemData: optAlca,
      value: obj['Alca'],
      maxLength: 25,
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 3,
      label: 'Ombro',
      name: 'Ombro',
      qualComponente: 'select',
      itemList: optOmbro,
      itemData: optOmbro,
      maxLength: 25,
      value: obj['Ombro'],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 3,
      label: 'Tipo Manga',
      name: 'tipoManga',
      maxLength: 25,
      qualComponente: 'select',
      itemList: optTipoManga,
      itemData: optTipoManga,
      value: obj['tipoManga'],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 3,
      label: 'Comp. Manga',
      name: 'compManga',
      itemList: optCompManga,
      itemData: optCompManga,
      qualComponente: 'select',
      maxLength: 25,
      value: obj['compManga'],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 3,
      label: 'Barra Manga',
      name: 'barraManga',
      qualComponente: 'select',
      itemList: optBarraManga,
      itemData: optBarraManga,
      maxLength: 25,
      value: obj['barraManga'],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 3,
      label: 'Comp. Peça',
      name: 'compPeca',
      maxLength: 25,
      qualComponente: 'select',
      itemList: optCompPeca,
      itemData: optCompPeca,
      value: obj['compPeca'],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 3,
      label: 'Barra Peça',
      name: 'barraPeca',
      maxLength: 45,
      qualComponente: 'select',
      itemList: optBarraPeca,
      itemData: optBarraPeca,
      value: obj['barraPeca'],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 3,
      label: 'Tipo Saia',
      name: 'tipoSaia',
      maxLength: 45,
      qualComponente: 'text',
      type: 'text',
      itemlist: '',
      value: obj['tipoSaia'],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
  ];

  const cores = [
    {
      tamanho: 12,
      qualComponente: 'nada',
      textoDoBotao: 'Atualizar Produtos Filhos',
    },
    {
      tamanho: 12,
      qtsCheckBoxPorColuna: 6,
      label: '',
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

  const outros = [
    {
      tamanho: 3,
      label: 'Frete Grátis',
      name: 'freteGratis',
      qualComponente: 'text',
      type: 'text',
      itemlist: '',
      value: obj['freteGratis'],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 3,
      label: 'Tamanho',
      name: 'Tamanho',
      qualComponente: 'text',
      type: 'text',
      value: obj['tamanho'],
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 3,
      label: 'Alíquota ICMS',
      name: 'aliqICMS',
      qualComponente: 'text',
      type: 'text',
      itemlist: '',
      value: obj['aliqICMS'],
      maxLength: 3,
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 3,
      label: 'Alíquota PIS',
      name: 'aliqPIS',
      qualComponente: 'text',
      type: 'text',
      itemlist: '',
      value: obj['aliqPIS'],
      maxLength: 3,
      handleChangeProp: (e) => handleChange(e, setObj),
    },
    {
      tamanho: 3,
      label: 'Alíquota Cofins',
      name: 'aliqCofins',
      qualComponente: 'text',
      type: 'text',
      itemlist: '',
      value: obj['aliqCofins'],
      maxLength: 3,
      handleChangeProp: (e) => handleChange(e, setObj),
    },
  ];

  const depoisDeClicarNoOk_salvarAlterar = () => {
    props.setOqueMostrar('tabela');
    setRetornoDoBackEnd(false);
  };

  useEffect(() => {
    coringa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obj, checked]);

  useEffect(() => {
    itemListDoBackEnd(
      'preenche_multi_select',
      [
        ['cadAlca', 'Alca'],
        ['cadBarraPeca', 'BarraPeca'],
        ['cadCategoria', 'Categoria'],
        ['cadCompPeca', 'CompPeca'],
        ['cadDecote', 'Decote'],
        ['cadModelagem', 'Modelagem'],
        ['cadOmbro', 'Ombro'],
        ['cadSubCategoria', 'SubCategoria'],
        ['cadCompManga', 'CompManga'],
        ['cadTipoManga', 'TipoManga'],
        ['cadBarraManga', 'BarraManga'],
        ['vwGradeTamanhos', 'descricao'],
        ['cadCor', 'Cor'],
        ['cadCor', 'Hexa'],
      ],
      [
        setOptAlca,
        setOptBarraPeca,
        setOptCategoria,
        setOptCompPeca,
        setOptDecotes,
        setOptModelagens,
        setOptOmbro,
        setOptSubCategoria,
        setOptCompManga,
        setOptTipoManga,
        setOptBarraManga,
        setOptTamanhos,
        setOptCor,
        setOptCorHEX,
      ]
    );

    fetch(myurl + 'trazTamanhos', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((result) => {
        let dados = result.dados;

        setTodasAsGrades(dados);

        for (var i = 0; i < dados.length; i++) {
          addMoreOptions(dados[i].GradeTamanhos, '&');

          if (dados[i].tam01 != '') {
            addMoreOptions(dados[i].GradeTamanhos, dados[i].tam01);
          }

          if (dados[i].tam02 != '') {
            addMoreOptions(dados[i].GradeTamanhos, dados[i].tam02);
          }

          if (dados[i].tam03 != '') {
            addMoreOptions(dados[i].GradeTamanhos, dados[i].tam03);
          }

          if (dados[i].tam04 != '') {
            addMoreOptions(dados[i].GradeTamanhos, dados[i].tam04);
          }

          if (dados[i].tam05 != '') {
            addMoreOptions(dados[i].GradeTamanhos, dados[i].tam05);
          }

          if (dados[i].tam06 != '') {
            addMoreOptions(dados[i].GradeTamanhos, dados[i].tam06);
          }

          if (dados[i].tam07 != '') {
            addMoreOptions(dados[i].GradeTamanhos, dados[i].tam07);
          }

          if (dados[i].tam08 != '') {
            addMoreOptions(dados[i].GradeTamanhos, dados[i].tam08);
          }

          if (dados[i].tam09 != '') {
            addMoreOptions(dados[i].GradeTamanhos, dados[i].tam09);
          }

          if (dados[i].tam10 != '') {
            addMoreOptions(dados[i].GradeTamanhos, dados[i].tam10);
          }

          if (dados[i].tam11 != '') {
            addMoreOptions(dados[i].GradeTamanhos, dados[i].tam11);
          }

          if (dados[i].tam12 != '') {
            addMoreOptions(dados[i].GradeTamanhos, dados[i].tam12);
          }

          if (dados[i].tam13 != '') {
            addMoreOptions(dados[i].GradeTamanhos, dados[i].tam13);
          }

          if (dados[i].tam14 != '') {
            addMoreOptions(dados[i].GradeTamanhos, dados[i].tam14);
          }

          if (dados[i].tam15 != '') {
            addMoreOptions(dados[i].GradeTamanhos, dados[i].tam15);
          }
        }
      });
  }, []);

  return (
    <>
      {retornoDoBackEnd === true ? (
        <AlertDialog
          setAlerta={depoisDeClicarNoOk_salvarAlterar}
          qualMsg={'Dados Lançados com Sucesso!'}
        />
      ) : null}
      {mensagemDeRetorno_Boolean === true ? (
        <AlertDialog
          setAlerta={fechaORetorono}
          qualMsg={mensagemDeRetorno_text}
          qualMsg2={mensagemDeRetorno_text2}
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
          <Tab label='Dados Gerais' />
          <Tab label='Detalhes' />
          <Tab label='Produtos Filhos' />
          <Tab label='Estoque' />
          <Tab label='Preços' />
          <Tab label='SKU e EAN' />
        </Tabs>
        <Divider />
        <TabPanel value={value} index={0}>
          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={12}>
              <b>Dados Gerais</b>
            </Grid>
            {dadosGerais.map((item, index) => (
              <GeradorDeInputs item={item} key={index} index={index} />
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={12}>
              <b>Detalhes</b>
            </Grid>
            {detalhes.map((item, index) => (
              <GeradorDeInputs item={item} key={index} index={index} />
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={12}>
              <Button variant='outlined' onClick={handleClickOpen}>
                Gerador de Produtos Filhos
              </Button>
            </Grid>
            <Dialog open={open} onClose={handleClose} maxWidth={maxWidth}>
              <DialogTitle>Gerador de Produtos Filhos</DialogTitle>
              <DialogContent>
                <Button
                  color='primary'
                  variant='outlined'
                  sx={buttonStyles}
                  fullWidth
                  disabled
                  size='large'
                >
                  <b>Cores</b>
                </Button>
                {cores.map((item, index) => (
                  <GeradorDeInputs item={item} key={index} index={index} />
                ))}
                <Grid item xs={12}>
                  <Divider />
                  <Button
                    color='primary'
                    variant='outlined'
                    sx={buttonStyles}
                    fullWidth
                    disabled
                    size='large'
                  >
                    <b>Tamanhos</b>
                  </Button>
                </Grid>
                {todasAsGrades.map((item, index) => (
                  <div key={index}>
                    <Children
                      item={[
                        item.tam01,
                        item.tam02,
                        item.tam03,
                        item.tam04,
                        item.tam05,
                        item.tam06,
                        item.tam07,
                        item.tam08,
                        item.tam09,
                        item.tam10,
                        item.tam11,
                        item.tam12,
                        item.tam13,
                        item.tam14,
                        item.tam15,
                      ]}
                      grade={item.GradeTamanhos}
                    />
                  </div>
                ))}
                <Divider />
                <Button
                  color='primary'
                  variant='outlined'
                  sx={buttonStyles}
                  fullWidth
                  disabled
                  size='large'
                >
                  <b>Combinações Geradas</b>
                </Button>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650 }}
                    size='small'
                    aria-label='a dense table'
                  >
                    <TableBody>
                      {combinacoes.map((item, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            '&:last-child td, &:last-child th': {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell align='left'>
                            {item.nomeDoProdutoFilho}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    administradorDosProdutosFilhos();
                  }}
                >
                  Gerar
                </Button>
              </DialogActions>
            </Dialog>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  size='small'
                  aria-label='a dense table'
                >
                  <TableBody>
                    {obj['produtosFilhos'].map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell align='left'>
                          <Button
                            onClick={() => {
                              console.log(item);
                              const filteredArray = obj[
                                'produtosFilhos'
                              ].filter(
                                (obj) =>
                                  obj.nomeDoProdutoFilho !==
                                  item.nomeDoProdutoFilho
                              );

                              setObj({
                                ...obj,
                                produtosFilhos: filteredArray,
                              });
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                          <Button
                            color='primary'
                            sx={buttonStyles}
                            disabled
                            size='large'
                          >
                            {item.nomeDoProdutoFilho}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Grid container spacing={2} sx={{ p: 1 }}>
            {combinacoesEstoque.map((item, index) => (
              <GeradorDeInputs item={item} key={index} index={index} />
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Grid container spacing={2} sx={{ p: 1 }}>
            {combinacoesPrecos.map((item, index) => (
              <GeradorDeInputs item={item} key={index} index={index} />
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Grid container spacing={2} sx={{ p: 1 }}>
            {combinacoes_sku_ean.map((item, index) => (
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

FormDeProdutos.propTypes = {
  setOqueMostrar: PropTypes.func.isRequired,
  qualTabelaUsar: PropTypes.string.isRequired,
};

export default FormDeProdutos;
