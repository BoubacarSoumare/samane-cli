const fs = require('fs')
const path = require('path')

/**
 * Funct to clear the cache
 * @param {string} dirPath
 * @param {*} removeSelf
 */
const clearCache = function(dirPath, removeSelf) {
    if (removeSelf === undefined) removeSelf = true
    try {
        var files = fs.readdirSync(dirPath)
    } catch (e) {
        return
    }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = path.join(dirPath, files[i])
            if (fs.statSync(filePath).isFile()) fs.unlinkSync(filePath)
            else clearCache(filePath)
        }
    if (removeSelf) fs.rmdirSync(dirPath)
}

exports.clearCache = clearCache
