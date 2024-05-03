
const STORAGE_KEY = "__storage"

function data() {
    let hexString = localStorage.getItem(STORAGE_KEY) || "";
    if (!hexString) {
        return {}
    }
    return JSON.parse(decryptString(hexString))
}

function get(key) {
    return this.data()[key]
}

function set(key, value) {
    let data = this.data();
    data[key] = value
    const dataStr = JSON.stringify(data)
    localStorage.setItem(STORAGE_KEY, encryptString(dataStr))
}

function keys() {
    return this.data().keys();
}

