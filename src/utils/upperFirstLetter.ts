export const upperFirstLetter: (str: string) => string = (str) => {
    return str[0].toUpperCase() + str.slice(1, str.length);
}