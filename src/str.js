/**
 * 包含
 * @param str
 * @returns {boolean}
 */
function contains(s, str) {
    return s.includes(str);
}


/**
 * 判断字符串出现的个数
 * @param str
 */
function count(s, str) {
    let count = 0;
    let index = 0;

    while (true) {
        index = s.indexOf(str, index);
        if (index === -1) {
            break;
        }
        count++;
        index += str.length;
    }

    return count;
}


// 将字符串的首字母转换为大写
function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

// 颠倒字符串的顺序
function reverse(s) {
    return s.split('').reverse().join('');
}

function substringAfter(s, sub) {
    const index = s.indexOf(sub)
    return index === -1 ? "" : s.substring(index + 1);
}

function substringBefore(s, sub) {
    const index = s.indexOf(sub)
    return index === -1 ? "" : s.substring(0, index);
}

// 混淆
function obfuscateString(str) {
    return str.split('').map(char => char + 1).join('');
}


/**
 * 补零
 * @param input 输入字符串说数字等
 * @param length 总长度，不狗
 * @returns {string}
 */
function zeroPad(input, length) {
    var str = String(input);
    var zerosNeeded = length - str.length;
    if (zerosNeeded > 0) {
        str = "0".repeat(zerosNeeded) + str;
    }
    return str;
}


function encryptString(str) {
    let encrypted = '';
    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);
        charCode += 1;
        encrypted += ('00' + charCode.toString(16)).slice(-4); // 转换为四位的十六进制表示
    }
    return encrypted;
}

function decryptString(hexString) {
    let decrypted = '';
    for (let i = 0; i < hexString.length; i += 4) {
        let hexCharCode = hexString.substr(i, 4);
        let charCode = parseInt(hexCharCode, 16); // 将十六进制转换为十进制
        charCode -= 1
        decrypted += String.fromCharCode(charCode);
    }
    return decrypted;
}

export const str = {
    contains,
    count,
    capitalize,
    reverse,
    substringAfter,
    substringBefore,
    obfuscateString,
    zeroPad,
    encryptString,
    decryptString

}