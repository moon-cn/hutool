import {STR} from "./str";

const STORAGE_KEY = "__storage"
export const storage = {}

storage.data = function () {
    let hexString = localStorage.getItem(STORAGE_KEY) || "";
    if (!hexString) {
        return {}
    }
    return JSON.parse(STR.decryptString(hexString))
}
storage.get = function (key) {
    return this.data()[key]
}

storage.set = function (key, value) {
    let data = this.data();
    data[key] = value
    const dataStr = JSON.stringify(data)
    localStorage.setItem(STORAGE_KEY, STR.encryptString(dataStr))
}

storage.keys = function () {
    return this.data().keys();
}

