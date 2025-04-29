

export const getCreateDate = () => {
    const date = new Date();
    const createDate = [
        date.getMonth().toString().padStart(2, "0"),
        date.getDate().toString().padStart(2, "0"),
        date.getFullYear()].join('-');

    return createDate;
};


