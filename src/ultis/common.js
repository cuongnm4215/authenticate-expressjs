export function parseError(err) {
    const result = {};
    for (let key in err) {
        result[key] = err[key].message;
    }

    return result;
}
