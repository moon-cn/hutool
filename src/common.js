// 数组扩展

Array.prototype.contains = function (item) {
    return this.indexOf(item) !== -1;
}
Array.prototype.containsAny = function (...items) {
    for (let item of items) {
        if (this.contains(item)) {
            return true
        }
    }
    return false;
}

Array.prototype.add = function (item) {
    this.push(item)
}
Array.prototype.addAt = function (index, item) {
    this.splice(index, 0, item);
}

/**
 * 将一个数组追加到尾
 * @param index
 * @param item
 */
Array.prototype.addAll = function (items) {
    for (let i = 0; i < items.length; i++) {
        this.push(items[i])
    }
}

Array.prototype.removeAt = function (index) {
    this.splice(index, 1)
}

Array.prototype.remove = function (item) {
    const index = this.indexOf(item);
    if (index !== -1) {
        this.removeAt(index)
    }
}

/**
 * 清空
 */
Array.prototype.clear = function () {
    this.length = 0
}

/**
 * 截取数组
 * @param fromIndex  low endpoint (inclusive) of the subList toIndex
 * @param toIndex  high endpoint (exclusive) of the subList
 */
Array.prototype.sub = function (fromIndex, toIndex) {
    return this.slice(fromIndex, toIndex);
}


// 字符串扩展

/**
 * 包含
 * @param str
 * @returns {boolean}
 */
String.prototype.contains = function (str) {
    return this.includes(str);
}


/**
 * 判断字符串出现的个数
 * @param str
 */
String.prototype.count = function (str) {
    var count = 0;
    var index = 0;

    while (true) {
        index = this.indexOf(str, index);
        if (index === -1) {
            break;
        }
        count++;
        index += str.length;
    }

    return count;
}


// 将字符串的首字母转换为大写
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// 颠倒字符串的顺序
String.prototype.reverse = function () {
    return this.split('').reverse().join('');
};

String.prototype.substringAfter = function (sub) {
    const index = this.indexOf(sub)
    return index === -1 ? "" : this.substring(index + 1);
}

String.prototype.substringBefore = function (sub) {
    const index = this.indexOf(sub)
    return index === -1 ? "" : this.substring(0, index);
}

// 混淆
String.prototype.obfuscateString = function (str) {
    return str.split('').map(char => char + 1).join('');
}


/**
 * 补零
 * @param input 输入字符串说数字等
 * @param length 总长度，不狗
 * @returns {string}
 */
export function zeroPad(input, length) {
    var str = String(input);
    var zerosNeeded = length - str.length;
    if (zerosNeeded > 0) {
        str = "0".repeat(zerosNeeded) + str;
    }
    return str;
}