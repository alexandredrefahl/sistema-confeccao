export const handleChangeDate = (event, setObject) => {
  const { name, value } = event.target;

  // Check if the input is a valid date format (dd/mm/yyyy)
  const dateRegex = /^(\d{0,2})(\/)?(\d{0,2})?(\/)?(\d{0,4})?$/;
  if (dateRegex.test(value)) {
    // Remove non-numeric characters from the input value
    const numericValue = value.replace(/\D/g, "");

    // Format the date as dd/mm/yyyy
    let formattedDate = "";
    if (numericValue.length > 0) {
      formattedDate += numericValue.substring(0, 2);
    }
    if (numericValue.length >= 3) {
      formattedDate += "/" + numericValue.substring(2, 4);
    }
    if (numericValue.length >= 5) {
      formattedDate += "/" + numericValue.substring(4, 8);
    }

    setObject((prevObj) => ({
      ...prevObj,
      [name]: formattedDate,
    }));
  }
};
