// Imports do REACT
import { useState } from 'react';
import './App.css';

// Imports componentes MUI
// import Box from '@mui/material/Box';

// Imports componentes de software
//Menu
import MenuLateral from './components/menuLateral/MenuLateral';
//Cadastros
import CadastroDeProdutos from './components/Cadastros/Produtos/CadastroDeProdutos';
import CadastroDeProdutosFilhos from './components/Cadastros/ProdutosFilhos/CadastroDeProdutosFilhos';
import CadastroCondPag from './components/Cadastros/CondPag/CadastroCondPag';
import CadastroDeCliente from './components/Cadastros/Clientes/CadastroDeCliente';
import CadastroFormaPag from './components/Cadastros/FormPag/CadastroFormaPag';
import CadastroTamanhos from './components/Cadastros/Tamanhos/CadastroTamanhos';
import CadastroCores from './components/Cadastros/Cores/CadastroCores';
import CadastroAlca from './components/Cadastros/Alca/CadastroAlca';
import CadastroBarraManga from './components/Cadastros/BarraManga/CadastroBarraManga';
import CadastroBarraPeca from './components/Cadastros/BarraPeca/CadastroBarraPeca';
import CadastroCompManga from './components/Cadastros/CompManga/CadastroCompManga';
import CadastroCompPeca from './components/Cadastros/CompPeca/CadastroCompPeca';
import CadastroTipoManga from './components/Cadastros/TipoManga/CadastroTipoManga';
import CadastroDecote from './components/Cadastros/Decote/CadastroDecote';
import CadastroModelagem from './components/Cadastros/Modelagem/CadastroModelagem';
import CadastroOmbro from './components/Cadastros/Ombro/CadastroOmbro';
import CadastroCfop from './components/Cadastros/Cfop/CadastroCfop';

//Vendas
import PedidoDeVenda from './components/Vendas/PedidoDeVenda';
import PedidosManutencao from './components/Vendas/ManutencaoDePedidos';

// Imports Estilos MUI
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Context from './components/multiuso/Context';
import Grid from '@mui/material/Grid';

// Objetos para Request - Imports Locais
import objCliente from './components/objetosParaRequest/objCliente';
import objProduto from './components/objetosParaRequest/objProduto';
import objProdutoFilho from './components/objetosParaRequest/objProdutoFilho';
import objCondPag from './components/objetosParaRequest/objCondPag';
import objFormPag from './components/objetosParaRequest/objFormPag';
import objPedidoDeVenda from './components/objetosParaRequest/objPedidoDeVenda';
import objTamanho from './components/objetosParaRequest/objTamanho';
import objCor from './components/objetosParaRequest/objCor';
import objAlca from './components/objetosParaRequest/objAlca';
import objBarraManga from './components/objetosParaRequest/objBarraManga';
import objBarraPeca from './components/objetosParaRequest/objBarraPeca';
import objCompManga from './components/objetosParaRequest/objCompManga';
import objCompPeca from './components/objetosParaRequest/objCompPeca';
import objTipoManga from './components/objetosParaRequest/objTipoManga';
import objDecote from './components/objetosParaRequest/objDecote';
import objModelagem from './components/objetosParaRequest/objModelagem';
import objOmbro from './components/objetosParaRequest/objOmbro';
import objCfop from './components/objetosParaRequest/objCfop';
import objPedido from './components/objetosParaRequest/objPedidoDeVenda';

// Imports de Icones para Menus
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import StraightenIcon from '@mui/icons-material/Straighten';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import DesignServicesIcon from '@mui/icons-material/DesignServices';

function App() {
  // Declaração de constantes de objetos
  const [cliente, setCliente] = useState(objCliente);
  const [produto, setProduto] = useState(objProduto);
  const [produtoFilho, setProdutoFilho] = useState(objProdutoFilho);
  const [condPag, setCondPag] = useState(objCondPag);
  const [formPag, setFormPag] = useState(objFormPag);
  const [cfop, setCfop] = useState(objCfop);
  const [tamanho, setTamanho] = useState(objTamanho);
  const [cor, setCor] = useState(objCor);
  const [alca, setAlca] = useState(objAlca);
  const [barraManga, setBarraManga] = useState(objBarraManga);
  const [barraPeca, setBarraPeca] = useState(objBarraPeca);
  const [compManga, setCompManga] = useState(objCompManga);
  const [compPeca, setCompPeca] = useState(objCompPeca);
  const [tipoManga, setTipoManga] = useState(objTipoManga);
  const [decote, setDecote] = useState(objDecote);
  const [ombro, setOmbro] = useState(objOmbro);
  const [modelagem, setModelagem] = useState(objModelagem);

  const [pedidoDeVenda, setPedidoDeVenda] = useState(objPedidoDeVenda);
  const [mostrarMenuLateral, setMostrarMenuLateral] = useState(true);

  // Array de Rotas
  const rotas = [
    {
      component: <CadastroDeProdutos />,
      rota: '/produtos',
      value: [produto, setProduto],
    },
    {
      component: <CadastroDeProdutosFilhos />,
      rota: '/produtosFilhos',
      value: [produtoFilho, setProdutoFilho],
    },
    {
      component: <CadastroDeCliente />,
      rota: '/cliente',
      value: [cliente, setCliente],
    },
    {
      component: <CadastroCondPag />,
      rota: '/cadastroCondPag',
      value: [condPag, setCondPag],
    },
    {
      component: <CadastroFormaPag />,
      rota: '/cadastroFormaDePag',
      value: [formPag, setFormPag],
    },
    {
      component: <CadastroCfop />,
      rota: '/cadastroCfop',
      value: [cfop, setCfop],
    },
    {
      component: <CadastroAlca />,
      rota: 'CadastroAlca',
      value: [alca, setAlca],
    },
    {
      component: <CadastroTipoManga />,
      rota: 'CadastroTipoManga',
      value: [tipoManga, setTipoManga],
    },
    {
      component: <CadastroDecote />,
      rota: 'CadastroDecote',
      value: [decote, setDecote],
    },
    {
      component: <CadastroModelagem />,
      rota: 'CadastroModelagem',
      value: [modelagem, setModelagem],
    },
    {
      component: <CadastroOmbro />,
      rota: 'CadastroOmbro',
      value: [ombro, setOmbro],
    },
    {
      component: <CadastroBarraManga />,
      rota: 'CadastroBarraManga',
      value: [barraManga, setBarraManga],
    },
    {
      component: <CadastroBarraPeca />,
      rota: 'CadastroBarraPeca',
      value: [barraPeca, setBarraPeca],
    },
    {
      component: <CadastroCompManga />,
      rota: 'CadastroCompManga',
      value: [compManga, setCompManga],
    },
    {
      component: <CadastroCompPeca />,
      rota: 'CadastroCompPeca',
      value: [compPeca, setCompPeca],
    },
    {
      component: <CadastroCores />,
      rota: '/CadastroCores',
      value: [cor, setCor],
    },
    {
      component: <CadastroTamanhos />,
      rota: '/CadastroTamanhos',
      value: [tamanho, setTamanho],
    },
    {
      component: <PedidoDeVenda />,
      rota: '/PedidoDeVenda',
      value: [pedidoDeVenda, setPedidoDeVenda],
    },
    {
      component: <PedidosManutencao />,
      rota: '/PedidosManutencao',
      value: [pedidoDeVenda, setPedidoDeVenda],
    },
  ];

  const accordion_cadastros = {
    displayName: 'Cadastros',
    arr: [
      {
        qualRota: '/produtos',
        icon: <CheckroomOutlinedIcon />,
        displayName: 'Produtos',
      },
      {
        qualRota: '/produtosFilhos',
        icon: <CheckroomOutlinedIcon />,
        displayName: 'Produtos Filhos',
      },
      {
        qualRota: '/cliente',
        icon: <PersonPinOutlinedIcon />,
        displayName: 'Clientes',
      },
    ],
  };

  const accordion_cadastros_aux = {
    displayName: 'Cadastros Auxiliares',
    arr: [
      {
        qualRota: '/cadastroCondPag',
        icon: <RequestQuoteOutlinedIcon />,
        displayName: 'Condições de Pagamento',
      },
      {
        qualRota: '/cadastroFormaDePag',
        icon: <RequestQuoteOutlinedIcon />,
        displayName: 'Forma de Pagamento',
      },
      {
        qualRota: '/cadastroCfop',
        icon: <RequestQuoteOutlinedIcon />,
        displayName: "Operaçõs CFOP's",
      },
      {
        qualRota: '/CadastroTamanhos',
        icon: <StraightenIcon />,
        displayName: 'Grade de Tamanhos',
      },
      {
        qualRota: '/CadastroCores',
        icon: <ColorLensIcon />,
        displayName: 'Cores',
      },
      {
        qualRota: '/CadastroAlca',
        icon: <DryCleaningIcon />,
        displayName: 'Tipos de Alça',
      },
      {
        qualRota: '/CadastroTipoManga',
        icon: <DryCleaningIcon />,
        displayName: 'Tipos de Mangas',
      },
      {
        qualRota: '/CadastroDecote',
        icon: <DryCleaningIcon />,
        displayName: 'Tipos de Decotes',
      },
      {
        qualRota: '/CadastroOmbro',
        icon: <DryCleaningIcon />,
        displayName: 'Tipos de Ombros',
      },
      {
        qualRota: '/CadastroModelagem',
        icon: <DryCleaningIcon />,
        displayName: 'Tipos de Modelagens',
      },
      {
        qualRota: '/CadastroBarraManga',
        icon: <DryCleaningIcon />,
        displayName: 'Tipos de Barras para Mangas',
      },
      {
        qualRota: '/CadastroBarraPeca',
        icon: <DryCleaningIcon />,
        displayName: 'Tipos de Barras para Peças',
      },
      {
        qualRota: '/CadastroCompManga',
        icon: <DesignServicesIcon />,
        displayName: 'Comprimentos para Mangas',
      },
      {
        qualRota: '/CadastroCompPeca',
        icon: <DesignServicesIcon />,
        displayName: 'Comprimentos para Peças',
      },
    ],
  };

  const accordion_pedidoDeVenda = {
    displayName: 'Pedido de Venda',
    arr: [
      {
        qualRota: '/PedidosManutencao',
        icon: '',
        displayName: 'Manutenção de Pedidos',
      },
      {
        qualRota: '/PedidoDeVenda',
        icon: '',
        displayName: 'Pedido de Venda',
      },
    ],
  };

  const toggleMenu = () => {
    setMostrarMenuLateral(!mostrarMenuLateral);
  };

  return (
    <Router>
      {/* <Box sx={{ display: 'flex', overflow: 'hidden' }}> */}
      <Grid container>
        <Grid item xs={12} sx={{ height: '5vh' }}>
          <CssBaseline />
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'primary.main',
              color: 'white',
              height: '100%',
              paddingLeft: 1,
            }}
            variant='h6'
            noWrap
            component='div'
          >
            <MenuIcon
              onClick={() => toggleMenu()}
              style={{ cursor: 'pointer', marginRight: '15px' }}
            />
            Sistema Laureen
          </Typography>
        </Grid>
        {mostrarMenuLateral ? (
          <Grid item xs={2} sx={{ height: '95vh', overflowY: 'scroll' }}>
            <MenuLateral obj={accordion_cadastros} />
            <MenuLateral obj={accordion_cadastros_aux} />
            <MenuLateral obj={accordion_pedidoDeVenda} />
          </Grid>
        ) : null}

        <Grid item xs={mostrarMenuLateral ? 10 : 12} sx={{ height: '95vh' }}>
          <Routes>
            <Route path='/' element={<div></div>} />
            {rotas.map((item, index) => (
              <Route
                key={index}
                path={item.rota}
                element={
                  <Context.Provider value={item.value}>
                    {item.component}
                  </Context.Provider>
                }
              />
            ))}
          </Routes>
        </Grid>
      </Grid>
      {/* </Box> */}
    </Router>
  );
}

export default App;
