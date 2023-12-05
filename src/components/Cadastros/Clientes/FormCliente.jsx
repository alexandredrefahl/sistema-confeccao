import { useState, useContext, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../../multiuso/TabPanel';
import Context from '../../multiuso/Context';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import { handleChange } from '../../handleChangeStuff/max';
import { handleChangeDate } from '../../handleChangeStuff/handleChangeDate';
import { handleChangeCep } from '../../handleChangeStuff/handleChangeCep';
import { handleChangeCPF } from '../../handleChangeStuff/handleChangeCPF';
import { handleChangeCNPJ } from '../../handleChangeStuff/handleChangeCNPJ';
import { handleChangeEstado } from '../../handleChangeStuff/handleChangeEstado';
import { handleChangeCidade } from '../../handleChangeStuff/handleChangeCidade';
import { handleChangeFloat } from '../../handleChangeStuff/handleChangeFloat';
import AlertDialog from '../../multiuso/AlertDialog';
import GeradorDeInputs from '../../multiuso/GeradorDeInputs';
import { Divider } from '@mui/material';
import { itemListDoBackEnd } from '../../requestStuff/itemListDoBackEnd';
import { incluir } from '../../requestStuff/incluir';

function FormCliente(props) {
	const [alerta, setAlerta] = useState(false);
	const [retornoDoBackEnd, setRetornoDoBackEnd] = useState(false);
	const [cidadeDesteEstado, setCidadeDesteEstado] = useState([]);
	const [cliente, setCliente] = useContext(Context);
	const [value, setValue] = useState(0);

	const handleChange2 = (event, newValue) => {
		setValue(newValue);
	};

	const btnSalvar = () => {
		cliente['tabela'] = props.qualTabelaUsar;
		incluir(cliente, () => {
			setRetornoDoBackEnd(true);
		});
	};

	const depoisDeClicarNoOk_salvarAlterar = () => {
		props.setOqueMostrar('tabela');
		setRetornoDoBackEnd(false);
	};

	const tab1 = [
		{
			tamanho: 2,
			label: 'Cód.',
			name: 'id',
			type: 'number',
			qualComponente: 'text',
			disabled: true,
			value: cliente['id'],
			handleChangeProp: (e) => handleChange(e, setCliente),
		},
		{
			tamanho: 2,
			label: 'Cód. Site',
			name: 'codSite',
			type: 'number',
			qualComponente: 'text',
			value: cliente['codSite'],
			handleChangeProp: (e) => handleChange(e, setCliente),
		},
		{
			tamanho: 8,
			qualComponente: 'espaco',
		},
		{
			tamanho: 4,
			label: 'Tipo de Pessoa',
			name: 'PFPJ',
			qualComponente: 'radio',
			itemlist: ['Pessoa Física', 'Pessoa Jurídica'],
			itemData: ['F', 'J'],

			value: cliente['PFPJ'],
			handleChangeProp: (e) => handleChange(e, setCliente),
		},
		{
			tamanho: 4,
			label: 'Tabela',
			name: 'tabela',
			qualComponente: 'radio',
			itemlist: ['Varejo', 'Atacado'],
			itemData: [0, 1],
			value: cliente['tabela'],
			handleChangeProp: (e) => handleChange(e, setCliente),
		},
		{
			tamanho: 12,
			qualComponente: 'divider',
		},
		{
			tamanho: 6,
			label: 'Razão Social',
			name: 'razaoSocial',
			qualComponente: 'text',
			itemlist: '',
			type: 'text',
			value: cliente['razaoSocial'],
			handleChangeProp: (e) => handleChange(e, setCliente),
			maxLength: 100,
		},
		{
			tamanho: 6,
			label: 'Nome Fantasia',
			name: 'nomeFantasia',
			type: 'text',
			qualComponente: 'text',
			value: cliente['nomeFantasia'],
			handleChangeProp: (e) => handleChange(e, setCliente),
			maxLength: 100,
		},
		{
			tamanho: 4,
			label: cliente['PFPJ'] === 'F' ? 'CPF' : 'CNPJ',
			name: 'cnpj_cpf',
			qualComponente: 'text',
			type: 'text',
			value: cliente['cnpj_cpf'],
			handleChangeProp:
				cliente['PFPJ'] === 'F'
					? (e) => handleChangeCPF(e, setCliente)
					: (e) => handleChangeCNPJ(e, setCliente),
			maxLength: cliente['PFPJ'] === 'F' ? 15 : 18,
		},
		{
			tamanho: 4,
			label: 'Inscrição',
			name: 'inscricao',
			type: 'text',
			qualComponente: 'text',
			value: cliente['inscricao'],
			handleChangeProp: (e) => handleChange(e, setCliente),
			maxLength: 20,
		},
		{
			tamanho: 4,
			label: '',
			name: '',
			qualComponente: 'espaco',
			itemlist: '',
			value: '',
			handleChangeProp: (e) => handleChange(e, setCliente),
		},
		{
			tamanho: 2,
			label: 'Aniversário',
			name: 'aniversario',
			qualComponente: cliente['PFPJ'] == 'F' ? 'text' : 'espaco',
			itemlist: '',
			value: cliente['aniversario'],
			handleChangeProp: (e) => handleChangeDate(e, setCliente),
		},
	];

	const tab2 = [
		{
			tamanho: 2,
			label: 'CEP',
			name: 'cep',
			qualComponente: 'text',
			value: cliente['cep'],
			type: 'text',
			handleChangeProp: (e) => handleChange(e, setCliente),
			handleBlur: (e) =>
				handleChangeCep(
					e,
					setCliente,
					[
						['logradouro', 'endereco'],
						['bairro', 'bairro'],
						['localidade', 'cidade'],
						['ibge', 'codMun'],
						['uf', 'estado'],
					],
					setAlerta,
					alerta,
					setCidadeDesteEstado
				),
			maxLength: 8,
		},
		{
			tamanho: 10,
			qualComponente: 'espaco',
		},
		{
			tamanho: 6,
			label: 'Endereço.',
			name: 'endereco',
			qualComponente: 'text',
			type: 'text',
			itemList: '',
			value: cliente['endereco'],
			handleChangeProp: (e) => handleChange(e, setCliente),
			maxLength: 80,
		},
		{
			tamanho: 2,
			label: 'Número',
			name: 'num',
			value: cliente['num'],
			qualComponente: 'text',
			type: 'number',
			handleChangeProp: (e) => handleChange(e, setCliente),
			maxLength: 6,
		},
		{
			tamanho: 3,
			label: 'Bairro',
			value: cliente['bairro'],
			name: 'bairro',
			itemList: '',
			qualComponente: 'text',
			type: 'text',
			handleChangeProp: (e) => handleChange(e, setCliente),
			maxLength: 30,
		},
		{
			tamanho: 5,
			label: 'Complemento',
			name: 'complemento',
			value: cliente['complemento'],
			qualComponente: 'text',
			type: 'text',
			handleChangeProp: (e) => handleChange(e, setCliente),
			maxLength: 30,
		},
		{
			tamanho: 2,
			label: 'Estado',
			value: cliente['estado'],
			name: 'estado',
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
				handleChangeEstado(e, setCliente, setCidadeDesteEstado),
			maxLength: 2,
		},
		{
			tamanho: 3,
			label: 'Cidade',
			value: cliente['cidade'],
			name: 'cidade',
			qualComponente: 'select',
			itemList: cidadeDesteEstado,
			itemData: cidadeDesteEstado,
			handleChangeProp: (e) => handleChangeCidade(e, setCliente),
			maxLength: 50,
		},
	];

	const tab3 = [
		{
			tamanho: 3,
			label: 'Contato-1.',
			name: 'contato1',
			qualComponente: 'text',
			type: 'text',
			value: cliente['contato1'],
			handleChangeProp: (e) => handleChange(e, setCliente),
			maxLength: 50,
		},
		{
			tamanho: 3,
			label: 'Telefone-1',
			name: 'telefone1',
			qualComponente: 'text',
			type: 'text',
			value: cliente['telefone1'],
			handleChangeProp: (e) => handleChange(e, setCliente),
			maxLength: 15,
		},
		{
			tamanho: 6,
			qualComponente: 'espaco',
		},
		{
			tamanho: 3,
			label: 'Contato-2',
			name: 'contato2',
			qualComponente: 'text',
			type: 'text',
			value: cliente['contato2'],
			handleChangeProp: (e) => handleChange(e, setCliente),
			maxLength: 50,
		},
		{
			tamanho: 3,
			label: 'Telefone-2',
			name: 'telefone2',
			qualComponente: 'text',
			type: 'text',
			value: cliente['telefone2'],
			handleChangeProp: (e) => handleChange(e, setCliente),
			maxLength: 15,
		},
		{
			tamanho: 6,

			qualComponente: 'espaco',
		},
		{
			tamanho: 3,
			label: 'Email',
			name: 'email',
			qualComponente: 'text',
			type: 'text',
			value: cliente['email'],
			handleChangeProp: (e) => handleChange(e, setCliente),
			maxLength: 50,
		},
		{
			tamanho: 3,
			label: 'Instagram',
			name: 'instagram',
			qualComponente: 'text',
			type: 'text',
			value: cliente['instagram'],
			handleChangeProp: (e) => handleChange(e, setCliente),
			maxLength: 45,
		},
		{
			tamanho: 6,
			qualComponente: 'espaco',
		},
		{
			tamanho: 6,
			label: 'Site',
			name: 'site',
			qualComponente: 'text',
			type: 'text',
			value: cliente['site'],
			handleChangeProp: (e) => handleChange(e, setCliente),
			maxLength: 100,
		},
	];

	const tab4 = [
		{
			tamanho: 3,
			label: 'Tamanho Padrão',
			name: 'tamPadrao',
			qualComponente: 'text',
			value: cliente['tamPadrao'],
			handleChangeProp: (e) => handleChangeFloat(e, setCliente),
			maxLength: 4,
		},
		{
			tamanho: 3,
			label: 'Altura',
			name: 'tamAltura',
			qualComponente: 'text',
			type: 'text',
			value: cliente['tamAltura'].toString().replace('.', ','),
			handleChangeProp: (e) => handleChangeFloat(e, setCliente),
		},
		{
			tamanho: 6,
			qualComponente: 'espaco',
		},
		{
			tamanho: 3,
			label: 'Busto',
			name: 'tamBusto',
			qualComponente: 'text',
			type: 'text',
			value: cliente['tamBusto'],
			handleChangeProp: (e) => handleChangeFloat(e, setCliente),
		},
		{
			tamanho: 3,
			label: 'Quadril',
			name: 'tamQuadril',
			qualComponente: 'text',
			type: 'text',
			value: cliente['tamQuadril'],
			handleChangeProp: (e) => handleChangeFloat(e, setCliente),
		},
		{
			tamanho: 6,

			qualComponente: 'espaco',
		},
		{
			tamanho: 3,
			label: 'Ombro',
			name: 'tamOmbro',
			qualComponente: 'text',
			type: 'text',
			value: cliente['tamOmbro'],
			handleChangeProp: (e) => handleChangeFloat(e, setCliente),
		},
		{
			tamanho: 3,
			label: 'Comp. Braco',
			name: 'tamCompBraco',
			qualComponente: 'text',
			type: 'text',
			value: cliente['tamCompBraco'],
			handleChangeProp: (e) => handleChangeFloat(e, setCliente),
		},
		{
			tamanho: 6,
			qualComponente: 'espaco',
		},
		{
			tamanho: 3,
			label: 'Larg. Braco',
			name: 'tamLargBraco',
			qualComponente: 'text',
			type: 'text',
			value: cliente['tamLargBraco'],
			handleChangeProp: (e) => handleChangeFloat(e, setCliente),
		},
		{
			tamanho: 3,
			label: 'Coxa',
			name: 'tamCoxa',
			type: 'text',
			qualComponente: 'text',
			value: cliente['tamCoxa'],
			handleChangeProp: (e) => handleChangeFloat(e, setCliente),
		},
	];

	useEffect(() => {
		itemListDoBackEnd('buscar_cidades', { estado: cliente['estado'] }, [
			setCidadeDesteEstado,
		]);
	}, []);

	return (
		<>
			{alerta === true ? (
				<AlertDialog
					setAlerta={setAlerta}
					qualMsg={'CEP não encontrado.'}
				/>
			) : null}
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
				<Box
					sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}
				>
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
						aria-label='visible arrows tabs example'
					>
						<Tab label='Geral' />
						<Tab label='Endereço' />
						<Tab label='Contato' />
						{cliente['PFPJ'] === 'F' ? (
							<Tab label='Aspectos Físicos' />
						) : null}
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<Grid container spacing={2} sx={{ p: 1 }}>
						<Grid item xs={12}>
							<b>Cadastro de Cliente</b>
						</Grid>
						{tab1.map((item, index) => (
							<GeradorDeInputs item={item} key={index} index={index} />
						))}
					</Grid>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Grid container spacing={2} sx={{ p: 1 }}>
						<Grid item xs={12}>
							<b>Endereço</b>
						</Grid>
						{tab2.map((item, index) => (
							<GeradorDeInputs item={item} key={index} index={index} />
						))}
					</Grid>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<Grid container spacing={2} sx={{ p: 1 }}>
						<Grid item xs={12}>
							<b>Contato</b>
						</Grid>
						{tab3.map((item, index) => (
							<GeradorDeInputs item={item} key={index} index={index} />
						))}
					</Grid>
				</TabPanel>
				{cliente['PFPJ'] === 'F' ? (
					<TabPanel value={value} index={3}>
						<Grid container spacing={2} sx={{ p: 1 }}>
							<Grid item xs={12}>
								<b>Aspectos Físicos</b>
							</Grid>
							{tab4.map((item, index) => (
								<GeradorDeInputs
									item={item}
									key={index}
									index={index}
								/>
							))}
						</Grid>
					</TabPanel>
				) : null}
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

FormCliente.propTypes = {
	setOqueMostrar: PropTypes.func.isRequired,
	qualTabelaUsar: PropTypes.string.isRequired,
};

export default FormCliente;
