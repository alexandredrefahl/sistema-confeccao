import { useState, useContext, useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {
	InputLabel,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Snackbar,
	Alert as MuiAlert,
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../multiuso/TabPanel';
import Context from '../multiuso/Context';
import isDateBetween from '../multiuso/isDateBetween';
import { handleChange } from '../handleChangeStuff/handleChange';
import { handleChangeCep } from '../handleChangeStuff/handleChangeCep';
import { handleChangeInt } from '../handleChangeStuff/handleChangeInt';
import { handleChangeFloat } from '../handleChangeStuff/handleChangeFloat';
import { handleChangeCPF } from '../handleChangeStuff/handleChangeCPF';
import { handleChangeCNPJ } from '../handleChangeStuff/handleChangeCNPJ';
import { handleChangeCidade } from '../handleChangeStuff/handleChangeCidade';
import { handleChangeEstado } from '../handleChangeStuff/handleChangeEstado';
import GeradorDeInputs from '../multiuso/GeradorDeInputs';
import { verTables } from '../requestStuff/verTables';
import { itemListDoBackEnd } from '../requestStuff/itemListDoBackEnd';
import { myurl } from '../requestStuff/myurl';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AlertDialog from '../multiuso/AlertDialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DataTableMuiClientes from '../multiuso/DataTableMuiClientes';

function PedidoDeVenda() {
	//Definição de Constantes
	const [AvisoEstoque, setAvisoEstoque] = useState(false);
	const [alerta, setAlerta] = useState(false);
	const [open_formProduto, setOpen_formProduto] = useState(false);
	const [pedidoDeVenda, setPedidoDeVenda] = useContext(Context);
	const [stateItenDoPedido, setStateItenDoPedido] = useState([]);
	const [optNaturezaOp, setOptNaturezaOp] = useState([]);
	const [optVendedor, setOptVendedor] = useState([]);
	const [optProduto, setOptProduto] = useState([]);
	const [optForPag, setOptForPag] = useState([]);
	const [optTransportadoras, setOptTransportadoras] = useState([]);
	const [value, setValue] = useState(0);
	const [cidadeDesteEstado, setCidadeDesteEstado] = useState([]);
	const [produtos_filho, setProdutos_Filho] = useState([]);
	const [produtos_filho_id, setProdutos_Filho_id] = useState([]);
	const [coresProduto, setCoresProduto] = useState([]);
	const [coresProdutoID, setCoresProdutoID] = useState([]);
	const [gradesProduto, setGradesProduto] = useState([]);
	const [gradesProdutoID, setGradesProdutoID] = useState([]);
	const [tamanhosProduto, setTamanhosProduto] = useState([]);
	//const [retornoDoBackEnd, setRetornoDoBackEnd] = useState(false);
	const [produtoId, setProdutoId] = useState('');
	const [open, setOpen] = useState(false);
	const [oQueMostrar, setOqueMostrar] = useState('tabela');
	const qualTabelaUsar = 'clientes';

	const [rascunho, setRascunho] = useState({
		codDeBarra: '',
		SKU: '',
		ref: '',
		idDoProdutoFilho: '',
		idProduto: '',
		descricaoDoPai: '',
		qtd: 0,
		precoUnit: '0.00',
		tipoDePreco: '',
		desconto: '0',
		estoque: '',
		valorTotal: '0.00',
		cor: '',
		idCor: '',
		grade: '',
		idGrade: '',
		tamanho: '',
	});

	// Controla a abertura e fechamento do Dialog de seleção do cliente
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const AvisoEstoque_close = () => {
		setAvisoEstoque(false);
	};

	const AvisoEstoque_open = () => {
		setAvisoEstoque(true);
	};

	// HandleChanges Específicos

	const handleChange2 = (event, newValue) => {
		setValue(newValue);
	};

	// Seleção em Cascata... PRODUTO > GRADE > TAMANHO > COR
	// Quando Seleciona um vai restringindo os demais
	const handleProdutoSelect = (event) => {
		console.log(event.target.value);
		setRascunho((prevObj) => ({
			...prevObj,
			['idProduto']: event.target.value,
		}));
		// Selecionado o Produto verifica quais as cores disponíveis
		itemListDoBackEnd('grades_do_produto', { id: event.target.value }, [
			setGradesProduto,
			setGradesProdutoID,
		]);
	};

	// Seleciona apenas as grades disponíveis para aquele produto
	const handleGradeSelect = (event) => {
		console.log('Grade Selecionada: ' + event.target.value);
		setRascunho((prevObj) => ({
			...prevObj,
			['idGrade']: event.target.value,
		}));
		setRascunho((prevObj) => ({
			...prevObj,
			['grade']: event.target.value,
		}));
		// Quando selecionar a Grade, Filtra apenas os tamanhos daquela grade
		itemListDoBackEnd(
			'tamanhos_do_produto',
			{ id: rascunho['idProduto'], grade: rascunho['idGrade'] },
			[setTamanhosProduto]
		);
	};

	// Seleciona apenas os tamanhos disponíveis para aquele produto
	const handleTamanhoSelect = (event) => {
		console.log('Tamanho Selecionado: ' + event.target.value);
		setRascunho((prevObj) => ({
			...prevObj,
			['tamanho']: event.target.value,
		}));
		// Carrega as cores daquele tamanho
		itemListDoBackEnd(
			'cores_da_grade',
			{
				id: rascunho['idProduto'],
				grade: rascunho['idGrade'],
				tamanho: rascunho['tamanho'],
			},
			[setCoresProduto, setCoresProdutoID]
		);
	};

	// Seleciona apenas as cores disponíveis para aquele produto
	const handleCorSelect = (event) => {
		console.log('Cor Selecionada: ' + event.target.value);
		setRascunho((prevObj) => ({
			...prevObj,
			['idCor']: event.target.value,
		}));
		setRascunho((prevObj) => ({
			...prevObj,
			['cor']: event.target.value,
		}));
	};

	// Carregar os dados para preencher a sessão de cliente ao selecionar o cliente no Dialog
	const selecionarCliente = () => {
		setOpen(false);
		carrega_dados_clientes();
	};

	// UseEffects Específicos

	// USEEFECT INICIAL CARREGADO NO LOAD DA PÁGINA
	useEffect(() => {
		itemListDoBackEnd('buscar_cidades', { estado: pedidoDeVenda['Estado'] }, [
			setCidadeDesteEstado,
		]);
		// Carrega os dados de todos os Selects
		itemListDoBackEnd(
			'preenche_multi_select',
			[
				['vwLista_CFOP', 'Natureza'],
				['cadVendedor', 'Vendedor'],
				['produtos', 'nome'],
				['finFormaPag', 'forma'],
				['cadTransportadoras', 'Razao'],
				['produtos', 'id'],
			],
			[
				setOptNaturezaOp,
				setOptVendedor,
				setOptProduto,
				setOptForPag,
				setOptTransportadoras,
				setProdutoId,
			]
		);
		// Carrega a Tabela de preço com valor padrão para não dar erro
		setPedidoDeVenda((prevObj) => ({
			...prevObj,
			['id_Tabela']: 0, // 0 - Varejo 1 - Atacado
		}));
	}, []); // <== Disparado ao carregar a página

	useEffect(() => {
		consulta_preco();
	}, [rascunho['idDoProdutoFilho']]); // <= Disparado quando o valor mudar

	// Disparado quando Mudar o Preço, Quantidade ou Desconto (Recalcula o Item)
	useEffect(() => {
		let precoUnitFormatado = rascunho['precoUnit'];
		precoUnitFormatado = precoUnitFormatado.replace(',', '.');
		// Já formata o preço unitário no formato fixo com 2 casas
		precoUnitFormatado = parseFloat(precoUnitFormatado);
		precoUnitFormatado = precoUnitFormatado.toFixed(2);
		// Calcula o valor total já com desconto
		let valorTotal =
			precoUnitFormatado *
			rascunho['qtd'] *
			(1 - rascunho['desconto'] / 100);
		// Formata a saída com 2 dígitos
		valorTotal = valorTotal.toFixed(2);
		valorTotal = valorTotal.replace('.', ',');
		//Atribui o valor total do Item ao rascunho
		setRascunho((prevObj) => ({
			...prevObj,
			['valorTotal']: valorTotal,
		}));
		// Verifica o estoque da quantidade
		if (rascunho['qtd'] > rascunho['estoque']) {
			AvisoEstoque_open();
			//Reduz a quantidade ao máximo em estoque
			setRascunho((prevObj) => ({
				...prevObj,
				['qtd']: rascunho['estoque'],
			}));
		}
	}, [rascunho['precoUnit'], rascunho['qtd'], rascunho['desconto']]); // <= Disparado quando o valor mudar

	// Funções específicas

	const consulta_preco = (tipo, valor) => {
		fetch(myurl + 'consulta_preco', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			// Tipo: sku, codBarras
			body: JSON.stringify({ tipo: tipo, valor: valor }),
		})
			.then((res) => res.json())
			.then(
				(result) => {
					if (result[0] === undefined) {
						return;
					}
					console.log(result);
					// Verifica se está no período promocional ou não
					let periodoPromocao = isDateBetween(
						pedidoDeVenda['Data'],
						result[0].data_ini_promo,
						result[0].data_fim_promo
					);
					console.log(periodoPromocao);
					// Verifica qual tabela está marcada no pedido (Varejo ou Atacado)
					if (pedidoDeVenda['id_Tabela'] == 0) {
						console.log('tabela varejo');
						// 0 - Tabela do Varejo
						if (periodoPromocao) {
							// Se a data do pedido estiver no periodo promocional
							setRascunho((prevObj) => ({
								...prevObj,
								['precoUnit']: result[0].preco_promo_varejo,
								['tipoDePreco']: 'Varejo Promocional',
							}));
						} else {
							// Se não, preço normal
							setRascunho((prevObj) => ({
								...prevObj,
								['precoUnit']: result[0].preco_varejo,
								['tipoDePreco']: 'Varejo',
							}));
						}
					} else {
						console.log('tabela atacado');
						if (periodoPromocao) {
							// Se estiver no período promocional
							setRascunho((prevObj) => ({
								...prevObj,
								['precoUnit']: result[0].preco_promo_atacado,
								['tipoDePreco']: 'Atacado Promocional',
							}));
						} else {
							// Se não, preço normal
							setRascunho((prevObj) => ({
								// 1- Tabela do Atacado
								...prevObj,
								['precoUnit']: result[0].preco_atacado,
								['tipoDePreco']: 'Atacado',
							}));
						}
					}
					// Obtém as demais informações
					setRascunho((prevObj) => ({
						...prevObj,
						['estoque']: result[0].estoque,
						['SKU']: result[0].sku,
						['ref']: result[0].referencia,
						['idProduto']: result[0].produtos_id,
					}));
				},
				(error) => {
					console.log(error);
				}
			);
	};

	const adicionaItem = () => {
		let itensDoPedio_arr = [];

		itensDoPedio_arr = itensDoPedio_arr.concat(stateItenDoPedido);

		// Monta aqui o obj rascunho pois ficou mais prático assim
		console.log('Item ID:' + rascunho['idDoProdutoFilho']);
		console.log('Qtde   :' + rascunho['qtd']);
		console.log('Descri :' + rascunho['descricaoDoItem']);
		console.log('Preço  :' + rascunho['precoUnit']);

		itensDoPedio_arr.push(rascunho);
		setQtde();
		setPreco();
		setRascunho({
			qtd: 0,
			idDoProdutoFilho: '',
			idProduto: '',
			precoUnit: '0.00',
			valorTotal: '0.00',
			descricaoDoItem: 'Blusa de Coton Amarelo-Adulto-PP',
		});
		setStateItenDoPedido(itensDoPedio_arr);

		// Coloca no obj p request
		// setObj(obj[''])
	};

	const carrega_dados_clientes = () => {
		//console.log('Entrando no Carrega_Cliente: ' + pedidoDeVenda['idCliente']);
		fetch(myurl + 'rowReader', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				tabela: 'clientes',
				column_name: 'id',
				id: pedidoDeVenda['idCliente'],
			}),
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setPedidoDeVenda((prevObj) => ({
						...prevObj,
						['Cliente']: result.dados[0]['razaoSocial'],
					}));
					setPedidoDeVenda((prevObj) => ({
						...prevObj,
						['Endereco']: result.dados[0]['endereco'],
					}));
					setPedidoDeVenda((prevObj) => ({
						...prevObj,
						['Num']: result.dados[0]['num'],
					}));
					setPedidoDeVenda((prevObj) => ({
						...prevObj,
						['Complemento']: result.dados[0]['complemento'],
					}));
					setPedidoDeVenda((prevObj) => ({
						...prevObj,
						['Bairro']: result.dados[0]['bairro'],
					}));
					setPedidoDeVenda((prevObj) => ({
						...prevObj,
						['CEP']: result.dados[0]['cep'],
					}));
					setPedidoDeVenda((prevObj) => ({
						...prevObj,
						['Estado']: result.dados[0]['estado'],
					}));
					setPedidoDeVenda((prevObj) => ({
						...prevObj,
						['Cidade']: result.dados[0]['cidade'],
					}));
					setPedidoDeVenda((prevObj) => ({
						...prevObj,
						['CodCidade']: result.dados[0]['codMun'],
					}));
					setPedidoDeVenda((prevObj) => ({
						...prevObj,
						['Celular']: result.dados[0]['telefone1'],
					}));
					setPedidoDeVenda((prevObj) => ({
						...prevObj,
						['email']: result.dados[0]['email'],
					}));
					// Aqui setar PF ou PJ com base no que vem do cadastro
					setPedidoDeVenda((prevObj) => ({
						...prevObj,
						['CNPJ_CPF']: result.dados[0]['CNPJ_CPF'],
					}));
					setPedidoDeVenda((prevObj) => ({
						...prevObj,
						['Inscricao']: result.dados[0]['inscricao'],
					}));
					setPedidoDeVenda((prevObj) => ({
						...prevObj,
						['Contato']: result.dados[0]['contato1'],
					}));
					setPedidoDeVenda((prevObj) => ({
						...prevObj,
						['id_Tabela']: result.dados[0]['tabela'],
					}));
				},
				(error) => {
					console.log(error);
				}
			);
	};

	// Dados do PEDIDO (NFe)
	const cabecalho = [
		{
			tamanho: 2,
			label: 'Nº Pedido',
			name: 'id',
			qualComponente: 'text',
			type: 'number',
			value: pedidoDeVenda['id'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{
			tamanho: 2,
			label: 'Data do Pedido',
			name: 'Data',
			qualComponente: 'text',
			type: 'date',
			value: pedidoDeVenda['Data'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{
			tamanho: 5,
			label: 'Natureza da Operação',
			name: 'NaturezaOP',
			qualComponente: 'select',
			itemList: optNaturezaOp,
			itemData: optNaturezaOp,
			value: pedidoDeVenda['NaturezaOP'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{
			tamanho: 3,
			label: 'Canal',
			name: 'Canal',
			qualComponente: 'select',
			itemList: ['Presencial', 'WhatsApp', 'eCommerce', 'Telefone'],
			itemData: ['Presencial', 'WhatsApp', 'eCommerce', 'Telefone'],
			value: pedidoDeVenda['Canal'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{
			tamanho: 4,
			label: 'Vendedor',
			name: 'Vendedor',
			qualComponente: 'select',
			itemList: optVendedor,
			itemData: optVendedor,
			value: pedidoDeVenda['Vendedor'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{
			tamanho: 12,
			label: 'Observações',
			name: 'Observacoes',
			qualComponente: 'text',
			type: 'text',
			value: pedidoDeVenda['Observacoes'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{
			tamanho: 12,
			qualComponente: 'divider',
		},
	];

	//Dados do CLIENTE
	const dadosCliente = [
		//Primeira linha
		{
			tamanho: 2,
			label: 'Id Cliente',
			name: 'idCliente',
			qualComponente: 'text',
			type: 'text',
			value: pedidoDeVenda['idCliente'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{
			tamanho: 1,
			textoDoBotao: '...',
			name: 'btProcuraCliente',
			qualComponente: 'botao',
			onClick: () => handleClickOpen(),
		},
		{
			tamanho: 9,
			label: 'Nome Cliente',
			name: 'Cliente',
			qualComponente: 'text',
			type: 'text',
			value: pedidoDeVenda['Cliente'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		//Segunda linha
		{
			tamanho: 6,
			label: 'Endereço',
			name: 'Endereco',
			qualComponente: 'text',
			type: 'text',
			value: pedidoDeVenda['Endereco'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{
			tamanho: 1,
			label: 'Num',
			name: 'Num',
			qualComponente: 'text',
			type: 'number',
			value: pedidoDeVenda['Num'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{
			tamanho: 2,
			label: 'Comp',
			name: 'Complemento',
			qualComponente: 'text',
			type: 'text',
			value: pedidoDeVenda['Complemento'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{
			tamanho: 3,
			label: 'Bairro',
			name: 'Bairro',
			qualComponente: 'text',
			type: 'text',
			value: pedidoDeVenda['Bairro'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		//Terceira Linha
		{
			tamanho: 2,
			label: 'CEP',
			name: 'CEP',
			qualComponente: 'text',
			type: 'text',
			value: pedidoDeVenda['CEP'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
			handleBlur: (e) =>
				handleChangeCep(
					e,
					setPedidoDeVenda,
					[
						['logradouro', 'Endereco'],
						['bairro', 'Bairro'],
						['localidade', 'Cidade'],
						['ibge', 'CodCidade'],
						['uf', 'Estado'],
					],
					setAlerta,
					alerta,
					setCidadeDesteEstado
				),
			maxLength: 8,
		},
		{
			tamanho: 1,
			label: 'Estado',
			name: 'Estado',
			value: pedidoDeVenda['Estado'],
			qualComponente: 'select',
			itemList: [
				'AC',
				'AL',
				'AP',
				'AM',
				'BA',
				'CE',
				'DF',
				'ES',
				'GO',
				'MA',
				'MT',
				'MS',
				'MG',
				'PA',
				'PB',
				'PR',
				'PE',
				'PI',
				'RJ',
				'RN',
				'RS',
				'RO',
				'RR',
				'SC',
				'SP',
				'SE',
				'TO',
			],
			itemData: [
				'AC',
				'AL',
				'AP',
				'AM',
				'BA',
				'CE',
				'DF',
				'ES',
				'GO',
				'MA',
				'MT',
				'MS',
				'MG',
				'PA',
				'PB',
				'PR',
				'PE',
				'PI',
				'RJ',
				'RN',
				'RS',
				'RO',
				'RR',
				'SC',
				'SP',
				'SE',
				'TO',
			],
			handleChangeProp: (e) =>
				handleChangeEstado(e, setPedidoDeVenda, setCidadeDesteEstado),
			maxLength: 2,
		},
		{
			tamanho: 3,
			label: 'Cidade',
			name: 'Cidade',
			qualComponente: 'select',
			itemList: cidadeDesteEstado,
			itemData: cidadeDesteEstado,
			value: pedidoDeVenda['Cidade'],
			handleChangeProp: (e) => handleChangeCidade(e, setPedidoDeVenda),
			maxLength: 50,
		},
		{
			tamanho: 2,
			label: 'IBGE',
			name: 'CodCidade',
			qualComponente: 'text',
			type: 'text',
			value: pedidoDeVenda['CodCidade'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{
			tamanho: 2,
			label: 'Pais',
			name: 'Pais',
			qualComponente: 'text',
			type: 'text',
			value: pedidoDeVenda['Pais'] === '' ? 'Brasil' : pedidoDeVenda['Pais'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{
			tamanho: 2,
			label: 'Cód País',
			name: 'CodPais',
			qualComponente: 'text',
			type: 'text',
			value:
				pedidoDeVenda['CodPais'] === '' ? '1052' : pedidoDeVenda['CodPais'],
			handleChangeProp: (e) => handleChangeInt(e, setPedidoDeVenda),
		},
		{
			tamanho: 12,
			qualComponente: 'divider',
		},
		//Quarta linha
		{
			tamanho: 3,
			label: 'WhatsApp',
			name: 'Celular',
			qualComponente: 'text',
			type: 'text',
			value: pedidoDeVenda['Celular'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{
			tamanho: 3,
			label: 'Telefone',
			name: 'Fone',
			qualComponente: 'text',
			type: 'text',
			value: pedidoDeVenda['Fone'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{
			tamanho: 6,
			label: 'Email',
			name: 'email',
			qualComponente: 'text',
			type: 'text',
			value: pedidoDeVenda['email'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		//Quinta linha
		{
			tamanho: 4,
			label: pedidoDeVenda['PFPJ'] === 'F' ? 'CPF' : 'CNPJ',
			name: 'CNPJ_CPF',
			qualComponente: 'text',
			type: 'text',
			value: pedidoDeVenda['CNPJ_CPF'],
			handleChangeProp:
				pedidoDeVenda['PFPJ'] === 'F'
					? (e) => handleChangeCPF(e, setPedidoDeVenda)
					: (e) => handleChangeCNPJ(e, setPedidoDeVenda),
			maxLength: pedidoDeVenda['PFPJ'] === 'F' ? 15 : 18,
		},
		{
			tamanho: 4,
			label: 'Inscrição Estadual',
			name: 'Inscricao',
			qualComponente: 'text',
			type: 'text',
			value: pedidoDeVenda['Inscricao'],
			handleChangeProp: (e) => handleChangeInt(e, setPedidoDeVenda),
		},
		// Sexta linha
		{
			tamanho: 4,
			label: 'Contato',
			name: 'Contato',
			qualComponente: 'text',
			type: 'text',
			value: pedidoDeVenda['Contato'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
	];

	//STATUS do pedido
	const statusPedido = [
		{
			tamanho: 2,
			label: 'Previsão de Entrega',
			name: 'Data_Prazo',
			qualComponente: 'text',
			type: 'date',
			value: pedidoDeVenda['Data_Prazo'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{
			tamanho: 2,
			label: 'Data da Conclusão',
			name: 'Data_Conclusao',
			qualComponente: 'text',
			type: 'date',
			value: pedidoDeVenda['Data_Conclusao'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{
			tamanho: 12,
			qualComponente: 'divider',
		},
		{
			tamanho: 4,
			label: 'Status Entrega',
			name: 'Status_Entrega',
			qualComponente: 'select',
			itemList: [
				'0 - Pedido',
				'1 - Em produção',
				'2 - Entrega Parcial',
				'3 - Entrega Finalizada',
				'9 - Cancelado',
			],
			itemData: ['0', '1', '2', '3', '9'],
			value: pedidoDeVenda['Status_Entrega'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{
			tamanho: 4,
			label: 'Status Financeiro',
			name: 'Status_Financeiro',
			qualComponente: 'select',
			itemList: [
				'0 - Aguardando Pagamento',
				'1 - Pago',
				'2 - Em aberto',
				'3 - Parcelado',
			],
			itemData: ['0', '1', '2', '3'],
			value: pedidoDeVenda['Status_Financeiro'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{
			tamanho: 4,
			label: 'Status Geral',
			name: 'Status_Geral',
			qualComponente: 'select',
			itemList: [
				'0 - Pedido',
				'1 - Em produção',
				'2 - Acabamento',
				'3 - Separação',
				'4 - Faturamento',
				'5 - Na transportadora',
				'6 - Entregue',
				'9 - Cancelado',
			],
			itemData: ['0', '1', '2', '3', '4', '5', '6', '9'],
			value: pedidoDeVenda['Status_Geral'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
	];

	//FRETE
	const frete_arr = [
		{
			tamanho: 2,
			label: 'Modalidade Frete',
			name: 'Modalidade',
			qualComponente: 'select',
			itemList: ['1 - Remetente (CIF)', '2 - Destinatário (FOB)'],
			itemData: ['1', '2'],
			value: pedidoDeVenda['ModFrete'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{
			tamanho: 5,
			label: 'Transportadora',
			name: 'Transportadora',
			qualComponente: 'select',
			itemList: optTransportadoras,
			itemData: optTransportadoras,
			value: pedidoDeVenda['Transportadora'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{ qualComponente: 'espaco', tamanho: 5 },
		{
			tamanho: 2,
			label: 'Valor do Frete',
			name: 'valFrete',
			qualComponente: 'text',
			type: 'number',
			value: pedidoDeVenda['ValFrete'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{
			tamanho: 2,
			label: 'Valor da Entrega',
			name: 'id',
			qualComponente: 'text',
			type: 'number',
			value: pedidoDeVenda['valEntrega'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{
			tamanho: 2,
			label: 'Valor do Seguro',
			name: 'valSeg',
			qualComponente: 'text',
			type: 'number',
			value: pedidoDeVenda['ValSeguro'],
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
	];

	// FORMAS DE PAGAMENTO
	const pagamento_arr = [
		{
			tamanho: 2,
			label: 'Desconto (%)',
			name: 'valDesconto',
			qualComponente: 'text',
			value: pedidoDeVenda['valDesconto'],
			handleChangeProp: (e) => handleChangeFloat(e, setPedidoDeVenda),
		},
		{
			tamanho: 2,
			label: 'Desc. do Meio Pag. (%)',
			name: 'valDescontoMeioPag',
			qualComponente: 'text',
			value: pedidoDeVenda['valDescontoMeioPag'],
			handleChangeProp: (e) => handleChangeFloat(e, setPedidoDeVenda),
		},
		{
			tamanho: 2,
			label: 'Acréscimo (%)',
			name: 'valAcrescimo',
			qualComponente: 'text',
			value: pedidoDeVenda['valAcrescimo'],
			handleChangeProp: (e) => handleChangeFloat(e, setPedidoDeVenda),
		},
		{ qualComponente: 'espaco', tamanho: 6 },
		{
			tamanho: 4,
			label: 'Forma de Pagamento',
			name: 'ForPag',
			qualComponente: 'select',
			itemList: optForPag,
			itemData: optForPag,
			handleChangeProp: (e) => handleChange(e, setPedidoDeVenda),
		},
		{ qualComponente: 'espaco', tamanho: 8 },
		{ qualComponente: 'divider', tamanho: 12 },
	];

	// FORMULÁRIO PARA ADESÃO DE ÍTENS AO PEDIDO
	const abreFormProduto = () => {
		setOpen_formProduto(true);
	};

	const fechaFormProduto = () => {
		setOpen_formProduto(false);
	};

	const limpa_outros = (arr) => {
		arr.forEach((item) => {
			setRascunho((prevObj) => ({
				...prevObj,
				[item]: '',
			}));
		});
	};

	const handleChange_SelProduto = (event, setObject) => {
		const { name, value } = event.target;
		// Se o usuário estiver digitando no código de barras
		if (name == 'codDeBarra') {
			if (value.length == 10) {
				consulta_preco('codDeBarra', value);
			}
		}
		//Se ele estiver digitando no Sku
		if (name == 'SKU') {
			if (value.length == 12) {
				consulta_preco('sku', value);
			}
		}
		//Se ele estiver digitando na Referencia
		if (name == 'ref') {
			//limpa_outros(['codDeBarra', 'SKU', 'idProduto']);
			if (value.length == 12) {
				consulta_preco('ref', value);
			}
		}
		setObject((prevObj) => ({
			...prevObj,
			[name]: value,
		}));
	};

	// DIÁLOGO DE SELEÇÃO DE PRODUTOS ADICIONADOS AO PEDIDO

	const formProduto_arr = [
		{
			tamanho: 4,
			label: 'Código de Barra',
			name: 'codDeBarra',
			qualComponente: 'text',
			type: 'number',
			value: rascunho['codDeBarra'],
			handleChangeProp: (e) => handleChange_SelProduto(e, setRascunho),
		},
		{
			tamanho: 2,
			label: 'SKU',
			name: 'SKU',
			qualComponente: 'text',
			type: 'number',
			value: rascunho['SKU'],
			handleChangeProp: (e) => handleChange_SelProduto(e, setRascunho),
		},
		{
			tamanho: 2,
			label: 'Ref.',
			name: 'ref',
			qualComponente: 'text',
			type: 'number',
			value: rascunho['ref'],
			handleChangeProp: (e) => handleChange_SelProduto(e, setRascunho),
		},
		{
			tamanho: 4,
			label: 'Produto',
			name: 'optProduto',
			qualComponente: 'select',
			itemList: optProduto,
			itemData: produtoId,
			value: rascunho['idProduto'],
			handleChangeProp: (e) => handleProdutoSelect(e, setRascunho),
		},
		{
			tamanho: 12,
			qualComponente: 'divider',
		},
		{
			tamanho: 3,
			label: 'Grade de Tamanhos',
			name: 'grade',
			qualComponente: 'select',
			itemList: gradesProduto,
			itemData: gradesProdutoID,
			value: rascunho['idGrade'],
			handleChangeProp: (e) => handleGradeSelect(e, setRascunho),
		},
		{
			tamanho: 3,
			label: 'Tamanho',
			name: 'tamanho',
			qualComponente: 'select',
			itemList: tamanhosProduto,
			itemData: tamanhosProduto,
			value: rascunho['tamanho'],
			handleChangeProp: (e) => handleTamanhoSelect(e, setRascunho),
		},
		{
			tamanho: 3,
			label: 'Cor',
			name: 'idCor',
			qualComponente: 'select',
			itemList: coresProduto,
			itemData: coresProdutoID,
			value: rascunho['idCor'],
			handleChangeProp: (e) => handleCorSelect(e, setRascunho),
		},
		{
			tamanho: 2,
			label: 'Estoque',
			name: 'estoque',
			qualComponente: 'text',
			type: 'number',
			disabled: true,
			value: rascunho['estoque'],
			handleChangeProp: (e) => handleChange(e, setRascunho),
		},
		{
			tamanho: 12,
			qualComponente: 'divider',
		},
		{
			tamanho: 2,
			label: 'Qtde',
			name: 'qtd',
			qualComponente: 'text',
			type: 'number',
			value: rascunho['qtd'],
			handleChangeProp: (e) => handleChange(e, setRascunho),
		},
		{
			tamanho: 2,
			label: 'Preço',
			name: 'precoUnit',
			qualComponente: 'text',
			type: 'text',
			value: rascunho['precoUnit'],
			handleChangeProp: (e) => handleChangeFloat(e, setRascunho),
		},
		{
			tamanho: 2,
			label: 'Tipo de Preço',
			name: 'tipoDePreco',
			qualComponente: 'text',
			disabled: true,
			type: 'text',
			value: rascunho['tipoDePreco'],
			handleChangeProp: (e) => handleChange(e, setRascunho),
		},
		{
			tamanho: 2,
			label: 'Desconto (%)',
			name: 'desconto',
			qualComponente: 'text',
			type: 'number',
			value: rascunho['desconto'],
			handleChangeProp: (e) => handleChange(e, setRascunho),
		},
		{
			tamanho: 2,
			label: 'TOTAL',
			name: 'valorTotal',
			qualComponente: 'text',
			disabled: true,
			type: 'text',
			value: rascunho['valorTotal'],
			handleChangeProp: (e) => handleChange(e, setRascunho),
		},

		{
			tamanho: 12,
			qualComponente: 'divider',
		},
	];

	// LAY OUT DA PÁGINA DE PEDIDO
	return (
		<>
			<Grid item xs={12} style={{ overflowY: 'scroll', height: '90vh' }}>
				<Tabs
					value={value}
					onChange={handleChange2}
					variant='scrollable'
					sx={{ p: 1, paddingLeft: 3 }}
				>
					<Tab label='Pedido de Venda' />
					<Tab label='Dados do Cliente' />
					<Tab label='Itens do Pedido' />
					<Tab label='Frete' />
					<Tab label='Pagamento' />
					<Tab label='Status' />
				</Tabs>

				<TabPanel value={value} index={0}>
					<Grid container spacing={2} sx={{ p: 1 }}>
						{cabecalho.map((item, index) => (
							<GeradorDeInputs item={item} key={index} index={index} />
						))}
					</Grid>
				</TabPanel>

				<TabPanel value={value} index={1}>
					<Grid container spacing={2} sx={{ p: 1 }}>
						<Dialog open={open} onClose={handleClose}>
							<DialogTitle>Seleção de Cliente</DialogTitle>
							<DialogContent>
								<Grid item xs={12} sx={{ p: 1 }}>
									<DataTableMuiClientes
										setOqueMostrar={setOqueMostrar}
										obj={pedidoDeVenda}
										setObj={setPedidoDeVenda}
										objReseter={PedidoDeVenda}
										columns={[
											{
												field: 'id',
												headerName: 'ID',
												flex: 1 / 10,
											},
											{
												field: 'razaoSocial',
												headerName: 'Nome',
												flex: 9 / 10,
											},
										]}
										tableReaderArgs={{
											tabela: qualTabelaUsar,
											escolhaDeColunas: 'id, razaoSocial',
											ordenar: 'razaoSocial',
										}}
									/>
								</Grid>
							</DialogContent>
							<DialogActions>
								<Button
									onClick={() => {
										selecionarCliente();
									}}
								>
									Selecionar
								</Button>
							</DialogActions>
						</Dialog>
						{dadosCliente.map((item, index) => (
							<GeradorDeInputs item={item} key={index} index={index} />
						))}
					</Grid>
				</TabPanel>

				<TabPanel value={value} index={2}>
					<Grid container spacing={2} sx={{ p: 1 }}>
						<Grid item xs={4}>
							<Button
								variant='contained'
								onClick={() => abreFormProduto()}
							>
								Adicionar
							</Button>
						</Grid>
						<Dialog
							open={open_formProduto}
							onClose={fechaFormProduto}
							fullWidth
							maxWidth={'xl'}
						>
							<DialogTitle>Seleção de Itens do Pedido</DialogTitle>
							<DialogContent>
								<Grid container spacing={2} sx={{ p: 1 }}>
									{formProduto_arr.map((item, index) => (
										<GeradorDeInputs
											item={item}
											key={index}
											index={index}
										/>
									))}

									{/* Avisos relativos à validação dos campos */}
									<Snackbar
										open={AvisoEstoque}
										autoHideDuration={3000}
										onClose={AvisoEstoque_close}
										anchorOrigin={{
											vertical: 'top',
											horizontal: 'center',
										}}
									>
										<MuiAlert
											onClose={AvisoEstoque_close}
											severity='error'
										>
											Não há estoque suficiente para esta quantidade!
										</MuiAlert>
									</Snackbar>

									<Grid
										item
										xs={12}
										container
										justifyContent='flex-end'
									>
										<Button variant='contained'>Adicionar</Button>
									</Grid>
								</Grid>
							</DialogContent>
						</Dialog>
						<Grid item xs={12}>
							<b>Itens do pedido</b>
						</Grid>
						<Grid item xs={12}>
							<TableContainer component={Paper}>
								{stateItenDoPedido.length == 0 ? (
									<Table
										sx={{ minWidth: 650 }}
										size='small'
										aria-label='a dense table'
									>
										<TableHead>
											<TableRow>
												<TableCell align='center'>
													<b>ID</b>
												</TableCell>
												<TableCell align='center'>
													<b>Quantidade</b>
												</TableCell>
												<TableCell align='left'>
													<b>Descrição</b>
												</TableCell>
												<TableCell align='center'>
													<b>Preço Unitário</b>
												</TableCell>
												<TableCell align='center'>
													<b>Preço Total</b>
												</TableCell>
											</TableRow>
										</TableHead>
									</Table>
								) : (
									<Table
										sx={{ minWidth: 650 }}
										size='small'
										aria-label='a dense table'
									>
										<TableHead>
											<TableRow>
												<TableCell align='center'>
													<b>ID</b>
												</TableCell>
												<TableCell align='center'>
													Quantidade
												</TableCell>
												<TableCell align='center'>
													Descrição
												</TableCell>
												<TableCell align='right'>
													Preço Unitário
												</TableCell>
												<TableCell align='right'>
													Preço Total
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{stateItenDoPedido.map((item, index) => (
												<TableRow
													key={index}
													sx={{
														'&:last-child td, &:last-child th': {
															border: 0,
														},
													}}
												>
													<TableCell align='center'>
														{item.idDoProdutoFilho}
													</TableCell>
													<TableCell align='center'>
														{item.qtd}
													</TableCell>
													<TableCell align='center'>
														{item.descricaoDoItem}
													</TableCell>
													<TableCell align='right'>
														{item.precoUnit}
													</TableCell>
													<TableCell align='right'>
														{item.valorTotal}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								)}
							</TableContainer>
						</Grid>
					</Grid>
				</TabPanel>

				<TabPanel value={value} index={3}>
					<Grid container spacing={2} sx={{ p: 1 }}>
						{frete_arr.map((item, index) => (
							<GeradorDeInputs item={item} key={index} index={index} />
						))}
					</Grid>
				</TabPanel>
				<TabPanel value={value} index={4}>
					<Grid container spacing={2} sx={{ p: 1 }}>
						<Grid item xs={12}>
							<b>Pagamento</b>
						</Grid>
						{pagamento_arr.map((item, index) => (
							<GeradorDeInputs item={item} key={index} index={index} />
						))}
						<Grid item xs={12}>
							<h3>
								<b>RESUMO DO PEDIDO</b>
							</h3>
						</Grid>
						<Grid item xs={3}>
							<InputLabel>Mercadorias (+)</InputLabel>
						</Grid>
						<Grid item xs={3}>
							<InputLabel>[txtValMerc]</InputLabel>
						</Grid>
						<Grid item xs={3}>
							<InputLabel>Impostos (+)</InputLabel>
						</Grid>
						<Grid item xs={3}>
							<InputLabel>[txtValImpostos]</InputLabel>
						</Grid>

						<Grid item xs={3}>
							<InputLabel>Frete (+)</InputLabel>
						</Grid>
						<Grid item xs={3}>
							<InputLabel>[txtvalFrete]</InputLabel>
						</Grid>
						<Grid item xs={3}>
							<InputLabel>Despesas (+)</InputLabel>
						</Grid>
						<Grid item xs={3}>
							<InputLabel>[txtValDespesas]</InputLabel>
						</Grid>

						<Grid item xs={3}>
							<InputLabel>Seguro (+)</InputLabel>
						</Grid>
						<Grid item xs={3}>
							<InputLabel>[txtvalSeg]</InputLabel>
						</Grid>
						<Grid item xs={3}>
							<InputLabel>Descontos (-)</InputLabel>
						</Grid>
						<Grid item xs={3}>
							<InputLabel>[txtValDesc]</InputLabel>
						</Grid>

						<Grid item xs={3}></Grid>
						<Grid item xs={3}></Grid>
						<Grid item xs={3}>
							<InputLabel>
								<h4>
									<b>TOTAL do PEDIDO (=)</b>
								</h4>
							</InputLabel>
						</Grid>
						<Grid item xs={3}>
							<InputLabel>
								<h4>
									<b>[txtValTotal]</b>
								</h4>
							</InputLabel>
						</Grid>
					</Grid>
				</TabPanel>
				<TabPanel value={value} index={5}>
					<Grid container spacing={2} sx={{ p: 1 }}>
						{statusPedido.map((item, index) => (
							<GeradorDeInputs item={item} key={index} index={index} />
						))}
					</Grid>
				</TabPanel>
			</Grid>
			<Grid item xs={12} style={{ height: '10vh' }}>
				<Grid container spacing={1} sx={{ p: 1 }}>
					<Grid item xs={12} style={{ overflow: 'auto' }}>
						<Grid
							container
							spacing={1}
							style={{ display: 'flex', alignItems: 'center' }}
						>
							<Grid item xs={2}>
								<Button fullWidth variant='contained' color='error'>
									Cancelar
								</Button>
							</Grid>
							<Grid item xs={8}></Grid>
							<Grid item xs={2}>
								<Button
									fullWidth
									variant='contained'
									onClick={() => {
										verTables();
									}}
								>
									Salvar
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
}

export default PedidoDeVenda;
