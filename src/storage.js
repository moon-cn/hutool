import {decryptString, encryptString} from "./str";

const STORAGE_KEY = "__storage"

export function data() {
    let hexString = localStorage.getItem(STORAGE_KEY) || "";
    if (!hexString) {
        return {}
    }
    return JSON.parse(decryptString(hexString))
}

export function get(key) {
    return data()[key]
}

export function set(key, value) {
    let data = data();
    data[key] = value
    const dataStr = JSON.stringify(data)
    localStorage.setItem(STORAGE_KEY, encryptString(dataStr))
}

export function keys() {
    return data().keys();
}

