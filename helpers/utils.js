export const dashify = (str) => {
    if (str) {
        let dashedString = str.toLowerCase();
        dashedString = dashedString.replace(/ /g, '-');
        dashedString = dashedString.replace(/'/g, '');
        dashedString = dashedString.replace(/\./g, '');
        return dashedString;
    }
};