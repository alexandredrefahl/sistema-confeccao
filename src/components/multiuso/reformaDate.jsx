const reformaDate = (dateStr) => {
  // Create a new Date object with the given date string
  //   const dateStr = 'Sun, 04 Feb 1979 00:00:00 GMT';
  const currentDate = new Date(dateStr);

  // Calculate the previous date by subtracting one day (in milliseconds)
  const previousDate = new Date(currentDate);
  previousDate.setDate(currentDate.getDate() - 1);

  // Format the previous date as "dd/mm/yyyy"
  const dd = String(previousDate.getDate()).padStart(2, '0');
  const mm = String(previousDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so we add 1
  const yyyy = previousDate.getFullYear();

  const formattedDate = `${dd}/${mm}/${yyyy}`;
  return formattedDate;
};

export default reformaDate;
