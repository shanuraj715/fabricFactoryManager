const convert = (pattern = '', ts, obj) => {
    if (typeof obj !== 'object') obj = {}

    obj.twoDigitDate ??= true;

    obj.twoDigitTime ??= true;

    if (!(ts instanceof Date)) ts = new Date(parseInt(ts));

    if (pattern === '') return ''

    const pattern_array = pattern.split('');

    if (ts.getTime() <= 0) return '';

    let str = '';

    /**
     * Y => Full Year // 1996
     * y => Last Two digit of the year // 96
     * M => Full month name // June
     * m => Short Month Name // Jan
     * n => Month in Integer // January => 1, February => 2
     * D => Full Day Name // Monday
     * d => Short day name // Mon
     * x => Date in integer // 31
     * H => 24 Hour format // 23
     * h => 12 Hour format // 11
     * i => Minutes in integer // 59
     * s => Seconds in integer // 48
     * a => am or pm
     * A =: AM or PM
     * k => milliseconds
     * else : saperator
     */

    pattern_array.forEach(char => {
        switch (char) {
            case "Y": {
                str += ts.getFullYear();
                break;
            }

            case "y": {
                str += ts.getFullYear() % 100;
                break;
            }

            case "M": {
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                str += months[ts.getMonth()];
                break;
            }

            case "m": {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                str += months[ts.getMonth()];
                break;
            }

            case "n": {
                const month = ts.getMonth() + 1;
                str += obj.twoDigitDate ? month < 10 ? '0' + month : month : month;
                break;
            }

            case "D": {
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                str += days[ts.getDay()];
                break;
            }

            case "d": {
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                str += days[ts.getDay()];
                break;
            }

            case "x": {
                const day = ts.getDate();
                str += obj.twoDigitDate ? day < 10 ? '0' + day : day : day;
                break;
            }

            case "H": {
                let hours = ts.getHours();
                str += obj.twoDigitTime ? hours < 10 ? '0' + hours : hours : hours;
                break;
            }

            case "h": {
                const hours = ts.getHours();
                const hr = hours > 12 ? hours - 12 : hours;
                str += obj.twoDigitTime ? hr < 10 ? "0" + hr : hr : hr;
                break;
            }

            case "i": {
                const min = ts.getMinutes();
                str += obj.twoDigitTime ? min < 10 ? "0" + min : min : min;
                break;
            }

            case "s": {
                const secs = ts.getSeconds();
                str += obj.twoDigitTime ? secs < 10 ? "0" + secs : secs : secs;
                break;
            }

            case "a": {
                str += ts.getHours() >= 12 ? 'pm' : 'am';
                break;
            }

            case "A": {
                str += ts.getHours() >= 12 ? 'PM' : 'AM';
                break;
            }

            case "k": {
                str += ts.getMilliseconds()
                break;
            }

            default: {
                str += char;
            }
        }
    })

    return str;
}

export default convert