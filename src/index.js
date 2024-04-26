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

const http = {}

import axios from "axios";

const axiosInstance = axios.create({
    withCredentials: true, // 带cookie
    baseURL: '/',
})

const AUTH_STORE_KEYS = ['jwt', 'appToken', 'token', 'Authorization'];

function getToken() {
    for (let key of AUTH_STORE_KEYS) {
        let v = localStorage.getItem(key);
        if (v) {
            return v;
        }
    }

    return storage.get("HD:Authorization")
}

axiosInstance.interceptors.request.use(
    config => {
        // 增加header

        let token = getToken();
        if (token) {
            config.headers['Authorization'] = token;
        }

        return config;
    }
);

axiosInstance.interceptors.response.use(res => {
    const {data, headers} = res;

    data._headers = headers
    return data;
})

/**
 *
 * @param msg
 * @param error 原始错误信息
 */

http.globalErrorMessageHandler = function (msg, error) {
    console.log('请求异常', msg, error)
    console.log('您可以使用 http.globalErrorMessageHandler 设置提示方式')
    alert(msg)
}

addErrorInterceptor()


function addErrorInterceptor() {
    const STATUS_MESSAGE = {
        200: '服务器成功返回请求的数据',
        201: '新增或修改数据成功',
        202: '一个请求已经进入后台排队（异步任务）',
        204: '删除数据成功',
        400: '发出的请求有错误，服务器没有进行新增或修改数据的操作',
        401: '请求需要登录',
        403: '权限不足',
        404: '接口未定义',
        406: '请求的格式不可得',
        410: '请求的资源被永久删除，且不会再得到的',
        422: '当创建一个对象时，发生一个验证错误',
        500: '服务器发生错误，请检查服务器',
        502: '网关错误',
        503: '服务不可用，服务器暂时过载或维护',
        504: '网关超时',
    };


    /**
     * axios 的错误代码
     * 来源 AxiosError.ERR_NETWORK
     * 直接使用的chatgpt 转换为js对象并翻译
     */
    const axiosInstance_CODE_MESSAGE = {
        ERR_FR_TOO_MANY_REDIRECTS: "错误：重定向过多",
        ERR_BAD_OPTION_VALUE: "错误：选项值无效",
        ERR_BAD_OPTION: "错误：无效选项",
        ERR_NETWORK: "错误：网络错误",
        ERR_DEPRECATED: "错误：已弃用",
        ERR_BAD_RESPONSE: "错误：响应错误",
        ERR_BAD_REQUEST: "错误：无效请求",
        ERR_NOT_SUPPORT: "错误：不支持",
        ERR_INVALID_URL: "错误：无效的URL",
        ERR_CANCELED: "错误：已取消",
        ECONNABORTED: "连接中止",
        ETIMEDOUT: "连接超时"
    }

    axiosInstance.interceptors.response.use(response => {
        let {success, message} = response; // 这里默认服务器返回的包含 success 和message 字段， 通常框架都有

        // 如果框架没有返回 success ，则不处理错误信息，因为无法判断是否成功
        if (success === undefined) {
            return response;
        }


        if (success) {
            // 数据正常，进行的逻辑功能
            return response
        } else {
            // 如果返回的 success 是 false，表明业务出错，直接触发 reject
            http.globalErrorMessageHandler(message || '服务器忙', response)
            // 抛出的错误，被 catch 捕获
            return Promise.reject(new Error(message))
        }
    }, error => {
        // 对响应错误做点什么

        let {message, code, response} = error;
        let msg = response ? STATUS_MESSAGE[response.status] : axiosInstance_CODE_MESSAGE[code];

        http.globalErrorMessageHandler(msg || message, error)

        return Promise.reject(error)
    })
}

http.setGlobalHeader = function (key, value){
    storage.set("HD:"+key,value)
}
http.getGlobalHeaders = function (){
    const result = {}
    let data = storage.data();
    for (let key in data) {
        const value = data[key];
        if(key.startsWith("HD:")){
            key = key.substring("HD:".length)
            result[key] = value
        }
    }
    return result;
}

http.get = function (url, params) {
    return axiosInstance.get(url, {params})
}

http.post = function (url, data, params =null) {
    return axiosInstance.post(url, data, {
        params
    })
}

http.postForm = function (url, data) {
    return axiosInstance.postForm(url, data)
}


http.downloadFile = function (url, params) {
    console.log('下载中...')

    let config = {
        url,
        params,
        responseType: 'blob',
    };
    return new Promise((resolve, reject) => {


        axiosInstance(config).then(data => {
            console.log('下载数据结束', data);

            const headers = data._headers

            // 获取文件名称
            var contentDisposition = headers.get('content-disposition');
            if (headers == null || contentDisposition == null) {
                showError('获取文件信息失败');
                reject(null)
                return
            }


            let regExp = new RegExp('filename=(.*)');
            // @ts-ignore
            const result = regExp.exec(contentDisposition);

            // @ts-ignore
            let filename = result[1];

            filename = decodeURIComponent(filename);
            filename = filename.replaceAll('"', '');
            filename = filename.replace(/^["](.*)["]$/g, '$1')


            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.style.display = 'none';

            link.href = url;
            link.download = decodeURI(filename); // 下载后文件名

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link); // 下载完成移除元素
            window.URL.revokeObjectURL(url);
        })
    })

};


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

    // TODO , 手动实现
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

const STORAGE_KEY = "__storage"
const storage = {}

storage.data = function () {
    let hexString = localStorage.getItem(STORAGE_KEY) || "";
    if (!hexString) {
        return {}
    }
    return JSON.parse(decryptString(hexString))
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


export function year(date) {
    return date.getFullYear();
}

/**
 *  获取月份， 自动补0
 * @param date
 * @returns {*}
 */
export function month(date) {
    const n = date.getMonth() + 1; // （注意月份从0开始，所以要加1）
    return zeroPad(n, 2)
}

/**
 * 获取日期，
 * @param date
 */
export function date(date) {
    return zeroPad(date.getDate(), 2)
}

/**
 * 小时， 24进制
 * @param date
 * @returns {string}
 */
export function hour(date) {
    return zeroPad(date.getHours(), 2);
}

export function minute(date) {
    return zeroPad(date.getMinutes(), 2);
}

export function second(date) {
    return zeroPad(date.getSeconds(), 2);
}

export function formatDate(d) {
    return year(d) + '-' + month(d) + "-" + date(d)
}

export function formatTime(d) {
    return hour(d) + ':' + minute(d) + ":" + second(d)
}

export function formatDateTime(d) {
    return formatDate(d) + " " + formatTime(d)
}

/**
 *
 * @param d
 * @returns {string} 2020年1月30日
 */
export function formatDateCn(d) {
    return year(d) + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日'
}

/***
 当前时间, 如 2022-01-23 11:59:59
 */
export function now() {
    return formatDateTime(new Date());
}

/**
 * 当前日期 ，如 2022-01-23
 *
 */
export function today() {
    return formatDate(new Date());
}

export function thisYear() {
    return year(new Date())
}

export function thisMonth() {
    return month(new Date())
}


/**
 * 显示友好时间， 如 2小时前， 1周前
 * @param pastDate 日期, 支持Date， String， Number
 */
export function friendlyTime(pastDate) {
    if (pastDate == null) {
        return
    }
    if (!(pastDate instanceof Date)) {
        pastDate = new Date(pastDate)
    }

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

/**
 * 总共耗时, 如 3分5秒
 * @param time 数字 （Date.getTime）
 * @returns {string|null}
 */
function friendlyTotalTime(time) {
    if (time == null || time === '-') {
        return null
    }
    let seconds = time / 1000;

    seconds = Math.floor(seconds)

    if (seconds < 60) {
        return seconds + '秒';
    }

    let min = seconds / 60;
    seconds = seconds % 60;

    min = Math.floor(min);
    seconds = Math.floor(seconds)

    return min + '分' + seconds + '秒'
}

export const hutool = {
    storage,
    http
}