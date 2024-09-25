const FormatDate = (dateTime) => {
    dateTime = new Date(dateTime);
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth();
    const date = dateTime.getDate();
    console.log(year);
    console.log(month);
    console.log(date);
    return `${year}/${month}/${date}`;
};
export default FormatDate;
