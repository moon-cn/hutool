// 数组扩展


import {storage} from "./storage";
import {DATE} from "./date";
import {http} from "./http";
import {ARR} from "./arr";
import {STR} from "./str";
import {HTML} from "./html";


// 字符串扩展




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


export const hutool = {
    storage,
    http,
    date: DATE,
    arr: ARR,
    str: STR,
    html:HTML
}
