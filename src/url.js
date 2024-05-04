/**
 * 获取url的参数
 * @param urlStr
 * @returns {*|{}|{}}
 */
export function params(urlStr) {
    if (!urlStr) {
        return {}
    }

    var url = new URL(urlStr);
    var params = new URLSearchParams(url.search);

    const result = {}
    for (const [key, value] of params.entries()) {
        console.log(key + ': ' + value);
        result[key] = value;
    }

    return result

}

/**
 * 去掉参数的基础url
 * @param url
 */
export function baseUrl(url) {
    if (!url) {
        return null
    }
    return new URL(url).origin
}


/**
 * 将参数对象转换为 url中的
 * @param params
 */
export function paramsToSearch(params) {
    if (!params) {
        return "";
    }

    const buffer = []

    for (let k in params) {
        let v = params[k]

        buffer.push(k + '=' + v);

    }

    return buffer.join('&')

}

export function replaceParam(url, key, value) {
    const p = params(url)
    p[key] = value;

    return baseUrl(url) + '?' + paramsToSearch(p);
}
