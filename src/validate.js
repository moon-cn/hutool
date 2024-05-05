export function email(emailStr) {
    const reg = /^([\w+\.])+@\w+([.]\w+)+$/;
    return reg.test(emailStr)
}