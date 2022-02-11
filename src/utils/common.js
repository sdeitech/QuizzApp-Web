const shortTitle = (str, total) => {
    if (str.length > total) {
        return str.substring(0, total) + "...";
    } else {
        return str;
    }
};

module.exports = {
    shortTitle,
};
