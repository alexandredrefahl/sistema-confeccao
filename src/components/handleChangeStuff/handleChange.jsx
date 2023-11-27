export const handleChange = (event, setObject) => {
	const { name, value } = event.target;
	setObject((prevObj) => ({
		...prevObj,
		[name]: value,
	}));
};
