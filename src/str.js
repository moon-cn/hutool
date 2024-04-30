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


/**
 * 类似String.length, 区别在与中文字符占2位宽
 * 获取字符串长度，英文字符 长度1，中文字符长度2
 * @param {*} str
 */
function getWidth(str) {
    return str.split('').reduce((pre, cur) => {
        const charCode = cur.charCodeAt(0);
        if (charCode >= 0 && charCode <= 128) {
            return pre + 1;
        }
        return pre + 2;
    }, 0);
}

function subByWidth(str, maxLength) {
    let showLength = 0;
    return str.split('').reduce((pre, cur) => {
        const charCode = cur.charCodeAt(0);
        if (charCode >= 0 && charCode <= 128) {
            showLength += 1;
        } else {
            showLength += 2;
        }
        if (showLength <= maxLength) {
            return pre + cur;
        }
        return pre;
    }, '');
};


/**
 *
 * @param str
 * @param len 字符长度，注：中文字符算2
 * @constructor
 */
function ellipsis(str, len, suffix='...') {
    if (!str) {
        return str;
    }
    if(!isStr(str)){
        return str;
    }

    const fullLength = getWidth(str);
    let isTooLong = fullLength > len;

    if (!isTooLong) {
        return str;
    }

    return subByWidth(str, len) + '...';
}

function isStr(value) {
    return typeof value === "string"
}


// 转驼峰
 function toCamelCase(str,firstLower = true) {
    let result = str.replace(/\_(\w)/g, function (all, letter) {
        return letter.toUpperCase();
    });

    if (firstLower) {
        result = result.substring(0, 1).toLowerCase() + result.substring(1);
    }

    return result;
}

function toUnderlineCase(name) {
    if (name == null) {
        return null;
    }
    let result = name.replace(/([A-Z])/g, '_$1').toLowerCase();
    if (result.startsWith('_')) {
        result = result.substring(1);
    }
    return result;
}

export const STR = {
    contains,
    count,
    capitalize,
    reverse,
    substringAfter,
    substringBefore,
    obfuscateString,
    zeroPad,
    encryptString,
    decryptString,

    getWidth,
    subByWidth,
    ellipsis,

    toCamelCase,
    toUnderlineCase


}