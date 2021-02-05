export const RenderDate = (date) => {
    const newdate = new Date(date);
    const day = newdate.getDate()[0] === 0 ? newdate.getDate()[1] : newdate.getDate();
    const monthList = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    const month = monthList[newdate.getMonth()];
    const year = newdate.getFullYear();
    const dateInText = `${month} ${day}, ${year}`;

    return dateInText
};
