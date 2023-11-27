export const handleChangeFloat = (event, setObject) => {
	const { name, value } = event.target;

	//Validar o input para permitir numeros com uma virgula ou vazio
	const isValidInput = /^$|^[0-9]+(,[0-9]*)?$/.test(value);

	if (isValidInput) {
		setObject((prevObj) => ({
			...prevObj,
			[name]: value,
		}));
	}
};
