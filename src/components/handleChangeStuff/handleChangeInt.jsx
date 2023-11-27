export const handleChangeInt = (event, setObject) => {
  const { name, value } = event.target;
  // Check if the input is a valid integer
  if (/^\d*$/.test(value)) {
    setObject((prevObj) => ({
      ...prevObj,
      [name]: parseInt(value, 10), // Convert the input value to an integer
    }));
  }
};
