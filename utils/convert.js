/**
 * Utility to turn a text into a CamelCase format
 * @param {string} str
 */
function camelCase(str) {
    if (str === null || str === '') return false
    else str = str.toString()

    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
}

exports.camelCase = camelCase
