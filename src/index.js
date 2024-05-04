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

export * as storage from "./storage";
export * as date from "./date";
export * as http from "./http";
export * as arr from "./arr";
export * as html from "./html";
export * as tree from "./tree";
export * as url from "./url"
export * as str from "./str"

export {eventBus} from './eventBus'
export * as color from "./color"
export {debounce} from "./debounce"
export * as dom from "./dom"
export {uid} from "./uid";



const hutool = {
    storage,
    http,
    date,
    arr,
    str,
    html,
    tree,
    url,
    eventBus,
    color,
    debounce,
    dom,
    uid
}


export default hutool