/**
 * 时间格式化
 * @param {} date 
 * @param {string} geshi 
 */
export function dateFormat(date, geshi = '/:') {
    var year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds();

    return [year, month, day].map(formatNumber).join(geshi.split('')[0]) + ' ' + [hour, minute, second].map(formatNumber).join(geshi.split('')[1] ? geshi.split('')[1] : ':')
}

let formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}