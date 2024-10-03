export const formatDate = (dateTime) => {
	dateTime = new Date(dateTime);
	const year = dateTime.getFullYear();
	const month = dateTime.getMonth();
	const date = dateTime.getDate();
	return `${year}/${month}/${date}`;
};
