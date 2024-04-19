import moon from "./index.js";


console.debug('当前时间', moon.now())
console.log('当前日期', moon.today())
console.log(moon.friendlyTime(new Date("2024-1-01")))
console.log(moon.friendlyTime(new Date("2024-4-01")))
console.log(moon.friendlyTime(new Date("2024-6-01")))
{
    console.log('测试数组')
    const arr = ['a', 'b', 'c']
    console.assert(arr.contains('a'), '1')
    console.assert(!arr.contains('d'), '2')
    console.assert(arr.containsAny('a','b'), '3')
    console.assert(arr.containsAny('a','d'), '4')
    console.assert(!arr.containsAny('e','f'), '5')

    arr.addAt(1, '1','2')
    console.log(arr)

    let str = "你好 abc 123";
    console.log("字符串：", str, "加密后：", moon.encryptString(str), "解密后:",moon.decryptString(moon.encryptString(str)))
    console.log("空字符串：",moon.decryptString(""))
}