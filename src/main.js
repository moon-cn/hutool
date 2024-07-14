import * as storage from "./storage";
import * as date from "./date";
import * as http from "./http";
import * as arr from "./arr";
import * as html from "./html";
import * as tree from "./tree";
import * as url from "./url"
import * as str from "./str"
import {eventBus} from "./eventBus";
import * as color from "./color"
import {debounce} from "./debounce";
import * as dom from "./dom"
import {uid} from "./uid";
import * as validate from './validate'


const hutool = {
    storage, date, http, arr, html, tree, url, str, eventBus, color, debounce, dom, uid, validate
}
export default hutool


export {
    storage, date, http, arr, html, tree, url, str, eventBus, color, debounce, dom, uid, validate
}