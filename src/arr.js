function contains(arr, item) {
    return arr.indexOf(item) !== -1;
}

function containsAny(arr, ...items) {
    for (let item of items) {
        if (arr.contains(item)) {
            return true
        }
    }
    return false;
}

function add(arr, item) {
    arr.push(item)
}

function addAt(arr, index, item) {
    arr.splice(index, 0, item);
}

/**
 * 将一个数组追加到尾
 * @param index
 * @param item
 */
function addAll(arr, items) {
    for (let i = 0; i < items.length; i++) {
        arr.push(items[i])
    }
}

function removeAt(arr, index) {
    arr.splice(index, 1)
}

function remove(arr, item) {
    const index = arr.indexOf(item);
    if (index !== -1) {
        removeAt(arr, index)
    }
}

/**
 * 清空
 */
function clear(arr) {
    arr.length = 0
}

/**
 * 截取数组
 * @param fromIndex  low endpoint (inclusive) of the subList toIndex
 * @param toIndex  high endpoint (exclusive) of the subList
 */
function sub(arr, fromIndex, toIndex) {
    return arr.slice(fromIndex, toIndex);
}

export const arr = {
    contains,containsAny,add,addAt,addAll,remove,removeAt, clear, sub
}