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




export function encryptString(str) {
    let encrypted = '';
    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);
        charCode += 1;
        encrypted += ('00' + charCode.toString(16)).slice(-4); // 转换为四位的十六进制表示
    }
    return encrypted;
}

export function decryptString(hexString) {
    let decrypted = '';
    for (let i = 0; i < hexString.length; i += 4) {
        let hexCharCode = hexString.substr(i, 4);
        let charCode = parseInt(hexCharCode, 16); // 将十六进制转换为十进制
        charCode -= 1
        decrypted += String.fromCharCode(charCode);
    }
    return decrypted;
}


// 数据结构 - tree

// 为方便起见，默认 3个字段 id， pid， children


export function list2Tree(data, idKey = 'id', pidKey = 'pid') {
    const map = {};
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        let id = node[idKey];
        map[id] = node;
    }

    const root = [];

    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        let pid = node[pidKey];
        let parent = map[pid]
        if (parent) {
            if (parent.children == null) {
                parent.children = []
            }
            parent.children.push(node)
        } else {
            root.push(node)
        }
    }

    return root;
}

/**
 * 遍历
 * @param tree
 * @param callback
 */
export function traverseTree(tree, callback) {
    // 遍历当前层级的节点
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        callback(node); // 执行回调函数

        // 遍历子节点
        if (node.children && node.children.length > 0) {
            traverseTree(node.children, callback);
        }
    }
}


// 数据结构 - 定长队列

// 定长队列
export class FixedQueue {
    constructor(length) {
        this.queue = [];
        this.maxLength = length;
    }

    enqueue(items) {
        if (this.queue.length + items.length > this.maxLength) {
            const count = this.queue.length + items.length - this.maxLength;
            this.queue.splice(0, count); // 移除超出最大长度的元素
        }
        this.queue.push(...items);
    }

    dequeue() {
        return this.queue.shift();
    }

    peek() {
        return this.queue[0];
    }

    size() {
        return this.queue.length;
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    getArray() {
        return this.queue;
    }
}


// 网络请求


export function get(url, params) {

}

export function post(url, data) {

}

export function postForm(url, data) {

}

export function download(url, params) {

}

//  事件总线


// 浏览器相关 - url

/**
 * 获取url的参数
 * @param url
 * @returns {*|{}|{}}
 */
export function params(url) {
    url = url || window.location.search;
    if (!url.contains('?')) {
        return {};
    }

    url = url.substringAfter('?')

    let params = qs.parse(url);

    return params || {};

}

/**
 * 去掉参数的基础url
 * @param url
 */
export function baseUrl(url) {
    return new URL(url).origin
}

export function removeParams(url) {
    url = url || window.location.search;
    if (url.contains('?')) {
        return url.substringBefore('?')
    }
    return url;

}

export function replaceParam(url, key, value) {
    const params = this.params(url)
    params[key] = value;

    const search = [];
    for (let k in params) {
        let v = params[k];
        if (v) {
            search.push(k + "=" + v);
        }
    }


    url = removeParams(url)
    url += '?' + search.join("&");
    return url;
}


// 浏览器相关 - 存储, 简单加密，至少不让人一下子就看出来

const STORAGE_KEY = "MOON_STORAGE"
export const storage = {}

storage.data = function () {
    return JSON.parse(decryptString(localStorage.getItem(STORAGE_KEY) || ""))
}
storage.get = function (key) {
    return this.data()[key]
}

storage.set = function (key, value) {
    let data = this.data();
    data[key] = value
    const dataStr = JSON.stringify(data)
    localStorage.setItem(STORAGE_KEY, encryptString(dataStr))
}

storage.keys = function () {
    return this.data().keys();
}
