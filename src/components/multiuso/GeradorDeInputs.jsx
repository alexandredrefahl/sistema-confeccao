// import TextField from '@mui/material/TextField';
import MyGridTextField from '../multiuso/MyGridTextField';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import MySelect from '../multiuso/MySelect';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import MyCheckBox from './MyCheckBox';
import MyButton from './MyButton';

function GeradorDeInputs(props) {
	// console.log(props.item.label);
	// console.log(props);
	let item = props.item;
	let index = props.index;
	let content;

	if (item.qualComponente === 'text') {
		content = (
			<MyGridTextField
				sm={item.tamanho}
				xs={item.tamanho}
				onChange={item.handleChangeProp}
				onBlur={item.handleBlur != 'undefined' ? item.handleBlur : null}
				ref={item.ref === undefined ? item.ref : null}
				label={item.label}
				disabled={item.disabled}
				name={item.name}
				type={item.type}
				key={index}
				value={item.value}
				InputProps={{
					inputProps: {
						maxLength: item.maxLength,
					},
				}}
			/>
		);
	} else if (item.qualComponente === 'select') {
		content = (
			<Grid item xs={item.tamanho} key={index}>
				<MySelect
					label={item.label}
					name={item.name}
					onChange={item.handleChangeProp}
					value={item.value}
					ref={item.ref === undefined ? item.ref : null}
					itemList={item.itemList}
					itemData={item.itemData}
				/>
			</Grid>
		);
	} else if (item.qualComponente === 'checkbox') {
		content = (
			<Grid item xs={item.tamanho} key={index}>
				<MyCheckBox
					label={item.label}
					name={item.name}
					onChange={item.handleChangeProp}
					coresHEX={item.coresHEX}
					value={item.value}
					itemList={item.itemList}
					setObj={item.setObj}
					obj={item.obj}
					qtsCheckBoxPorColuna={item.qtsCheckBoxPorColuna}
				/>
			</Grid>
		);
	} else if (item.qualComponente === 'espaco') {
		content = (
			<Grid item sm={item.tamanho} xs={12}>
				<div></div>
			</Grid>
		);
	} else if (item.qualComponente === 'titulo') {
		content = (
			<Grid item sm={item.tamanho} xs={12} sx={{ p: 0, m: 0 }}>
				{item.texto}
				{item.texto2 !== undefined ? (
					<>
						<br />
						{item.texto2}
					</>
				) : null}
				{item.texto3 !== undefined ? (
					<>
						<br />
						{item.texto3}
					</>
				) : null}
			</Grid>
		);
	} else if (item.qualComponente === 'radio') {
		content = (
			<Grid item sm={item.tamanho} xs={12}>
				<FormControl component='fieldset'>
					<FormLabel id='demo-radio-buttons-group-label'>
						{item.label}
					</FormLabel>
					<RadioGroup
						aria-labelledby='demo-radio-buttons-group-label'
						name={item.name}
						onChange={item.handleChangeProp}
						value={item.value}
						row
					>
						<FormControlLabel
							value={item.itemData[0]}
							control={<Radio />}
							label={item.itemlist[0]}
						/>
						<FormControlLabel
							value={item.itemData[1]}
							control={<Radio />}
							label={item.itemlist[1]}
						/>
						{item.itemData[2] != undefined ? (
							<FormControlLabel
								value={item.itemData[2]}
								control={<Radio />}
								label={item.itemlist[2]}
							/>
						) : null}
					</RadioGroup>
				</FormControl>
			</Grid>
		);
	} else if (item.qualComponente === 'divider') {
		content = (
			<Grid item sm={item.tamanho} xs={12}>
				<Divider />
			</Grid>
		);
	} else if (item.qualComponente === 'botao') {
		content = (
			<MyButton
				xs={item.tamanho}
				textoDoBotao={item.textoDoBotao}
				onClick={item.onClick}
			/>
		);
	} else {
		content = <div></div>;
	}

	return content;
}

GeradorDeInputs.propTypes = {
	item: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
};

export default GeradorDeInputs;
