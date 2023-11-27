const isDateBetween = (data, dataINI, dataFIM) => {
	// Convert strings to Date objects if needed
	data = new Date(data);
	dataINI = new Date(dataINI);
	dataFIM = new Date(dataFIM);

	// Check if the targetDate is between startDate and endDate
	return dataINI <= data && data <= dataFIM;
};

export default isDateBetween;
