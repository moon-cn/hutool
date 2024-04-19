/*****

 由于自己是Java程序员，不太熟悉lodash的很多函数


 */
import qs from "qs";

// 版本
var version = "1.0.0"

console.log('moon v' + version)


const moon = {};


/**
 * 补零
 * @param input 输入字符串说数字等
 * @param length 总长度，不狗
 * @returns {string}
 */
moon.zeroPad = function (input, length) {
    var str = String(input);
    var zerosNeeded = length - str.length;
    if (zerosNeeded > 0) {
        str = "0".repeat(zerosNeeded) + str;
    }
    return str;
}

// 日期工具
{
    moon.year = function (date) {
        return date.getFullYear();
    }

    /**
     *  获取月份， 自动补0
     * @param date
     * @returns {*}
     */
    moon.month = function (date) {
        const n = date.getMonth() + 1; // （注意月份从0开始，所以要加1）
        return moon.zeroPad(n, 2)
    }
    /**
     * 获取日期，
     * @param date
     */
    moon.date = function (date) {
        return moon.zeroPad(date.getDate(), 2)
    }

    /**
     * 小时， 24进制
     * @param date
     * @returns {string}
     */
    moon.hour = function (date) {
        return moon.zeroPad(date.getHours(), 2);
    }

    moon.minute = function (date) {
        return moon.zeroPad(date.getMinutes(), 2);
    }
    moon.second = function (date) {
        return moon.zeroPad(date.getSeconds(), 2);
    }

    moon.formatDate = function (d) {
        return moon.year(d) + '-' + moon.month(d) + "-" + moon.date(d)
    }
    moon.formatTime = function (d) {
        return moon.hour(d) + ':' + moon.minute(d) + ":" + moon.second(d)
    }
    moon.formatDateTime = function (d) {
        return moon.formatDate(d) + " " + moon.formatTime(d)
    }

    /**
     *
     * @param d
     * @returns {string} 2020年1月30日
     */
    moon.formatDateCn = function (d) {
        return moon.year(d) + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日'
    }
    /***
     当前时间, 如 2022-01-23 11:59:59
     */
    moon.now = function () {
        return moon.formatDateTime(new Date());
    }

    /**
     * 当前日期 ，如 2022-01-23
     *
     */
    moon.today = function () {
        return moon.formatDate(new Date());
    }

    moon.thisYear = function () {
        return moon.year(new Date())
    }

    moon.thisMonth = function () {
        return moon.month(new Date())
    }

    moon.thisDay = moon.today

    /**
     * 显示友好时间， 如 2小时前， 1周前
     */
    moon.friendlyTime = function (pastDate) {
        const currentDate = new Date();
        let elapsedMilliseconds = currentDate - pastDate;
        const suffix = elapsedMilliseconds > 0 ? "前" : "后";
        elapsedMilliseconds = Math.abs(elapsedMilliseconds)

        // 计算年、月、日、小时、分钟和秒的差值
        const elapsedYears = Math.floor(elapsedMilliseconds / (1000 * 60 * 60 * 24 * 365));
        const elapsedMonths = Math.floor(elapsedMilliseconds / (1000 * 60 * 60 * 24 * 30));
        const elapsedDays = Math.floor(elapsedMilliseconds / (1000 * 60 * 60 * 24));
        const elapsedHours = Math.floor(elapsedMilliseconds / (1000 * 60 * 60));
        const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));
        const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

        // 根据差值选择友好的格式
        if (elapsedYears >= 1) {
            return `${elapsedYears} 年${suffix}`;
        }
        if (elapsedMonths >= 1) {
            return `${elapsedMonths} 个月${suffix}`;
        }
        if (elapsedDays >= 7) {
            const weeks = Math.floor(elapsedDays / 7);
            return `${weeks} 周${suffix}`;
        }
        if (elapsedDays >= 1) {
            const days = elapsedDays;
            return `${days} 天${suffix}`;
        }
        if (elapsedHours >= 1) {
            return `${elapsedHours} 小时${suffix}`;
        }
        if (elapsedMinutes >= 1) {
            return `${elapsedMinutes} 分钟${suffix}`;
        }
        return `${elapsedSeconds} 秒${suffix}`;
    }

}


// 数组扩展
{
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


}

// 字符串扩展
{
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


    moon.encryptString = function (str) {
        let encrypted = '';
        for (let i = 0; i < str.length; i++) {
            let charCode = str.charCodeAt(i);
            charCode += 1;
            encrypted += ('00' + charCode.toString(16)).slice(-4); // 转换为四位的十六进制表示
        }
        return encrypted;
    }

    moon.decryptString = function (hexString) {
        let decrypted = '';
        for (let i = 0; i < hexString.length; i += 4) {
            let hexCharCode = hexString.substr(i, 4);
            let charCode = parseInt(hexCharCode, 16); // 将十六进制转换为十进制
            charCode -= 1
            decrypted += String.fromCharCode(charCode);
        }
        return decrypted;
    }


}


// 数据结构 - tree
{
    // 为方便起见，默认 3个字段 id， pid， children


    moon.tree = {}
    moon.tree.list2Tree = function (data, idKey = 'id', pidKey = 'pid') {
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
    moon.tree.traverseTree = function (tree, callback) {
        // 遍历当前层级的节点
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            callback(node); // 执行回调函数

            // 遍历子节点
            if (node.children && node.children.length > 0) {
                this.traverseTree(node.children, callback);
            }
        }
    }

}


// 网络请求
{

    moon.get = function (url, params) {

    }

    moon.post = function (url, data) {

    }

    moon.postForm = function (url, data) {

    }

    moon.download = function (url, params) {

    }
}
//  事件总线
{

}

// 浏览器相关 - url
{
    /**
     * 获取url的参数
     * @param url
     * @returns {*|{}|{}}
     */
    moon.params = function (url) {
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
    moon.baseUrl = function (url) {
        return new URL(url).origin
    }

    moon.removeParams = function (url) {
        url = url || window.location.search;
        if (url.contains('?')) {
            return url.substringBefore('?')
        }
        return url;

    }

    moon.replaceParam = function (url, key, value) {
        const params = this.params(url)
        params[key] = value;
        const search = qs.stringify(params);

        url = this.removeParams(url)
        url += '?' + search;
        return url;
    }
}

// 浏览器相关 - 存储, 简单加密，至少不让人一下子就看出来
{
    const STORAGE_KEY = "MOON_STORAGE"
    moon.storage = {}

    moon.storage.data = function () {
        return JSON.parse(moon.decryptString(localStorage.getItem(STORAGE_KEY) || ""))
    }
    moon.storage.get = function (key) {
        return this.data()[key]
    }

    moon.storage.set = function (key, value) {
        let data = this.data();
        data[key] = value
        const dataStr = JSON.stringify(data)
        localStorage.setItem(STORAGE_KEY, moon.encryptString(dataStr))
    }

    moon.storage.keys = function () {
        return this.data().keys();
    }

}

export default moon