import {get} from "./obj";
import { expect, test } from 'vitest'


test("get a[0].b.c == 3", ()=>{
    const obj = { 'a': [{ 'b': { 'c': 3 } }] };
    const value = get(obj, 'a[0].b.c');
    expect(value).toBe(3)
})