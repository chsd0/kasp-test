export const formatDate = (date: string) => {
    date = date.split('T')[0];
    let [year, month, day] = date.split('-');
    month = monthsMap[month];
    return {
        highlight: day,
        rest: month + ' ' + year
    }
}

interface Months {
    [key: string]: string
}

const monthsMap: Months = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
}