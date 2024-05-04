
const STORAGE_KEY = "__storage"

export function data() {
    let hexString = localStorage.getItem(STORAGE_KEY) || "";
    if (!hexString) {
        return {}
    }
    return JSON.parse(decryptString(hexString))
}

export function get(key) {
    return this.data()[key]
}

export function set(key, value) {
    let data = this.data();
    data[key] = value
    const dataStr = JSON.stringify(data)
    localStorage.setItem(STORAGE_KEY, encryptString(dataStr))
}

function keys() {
    return this.data().keys();
}

