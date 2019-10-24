const fs = require('fs')
const path = require('path')

const replace = require('replace-in-file')

const convertString = require('./convert')

/**
 * Base funct for generating files
 * @param {string} className
 * @param {string} templateFile
 * @param {string} filePath
 */
exports.generateEverything = async (className, templateFile, filePath) => {
    fs.copyFile(templateFile, filePath, err => {
        if (err) throw err
    })

    const options = {
        files: `${filePath}`,
        from: [/test/g, /Test/g],
        to: [`${className}`.toLowerCase(), `${convertString.camelCase(className)}`]
    }

    try {
        const results = await replace(options)
        const changedFiles = results.filter(result => result.hasChanged).map(result => result.file)
        if (changedFiles) {
            return changedFiles
        }
    } catch (error) {
        console.error('Error occurred:', error)
    }
}

/**
 * Edit a single value of the config file
 * @param {string} oldW
 * @param {string} newW
 */
exports.editConfigFile = async (oldW, newW) => {
    const options = {
        files: 'config/database.php',
        from: `${oldW}`,
        to: `${newW}`
    }

    try {
        const results = await replace(options)
        const changedFiles = results.filter(result => result.hasChanged).map(result => result.file)
        if (changedFiles) {
            return changedFiles
        }
    } catch (error) {
        console.error('Error occurred:', error)
    }
}

/**
 * Edit the general configuration
 * @param {string} host
 * @param {string} user
 * @param {string} password
 * @param {string} dbName
 */
exports.editGeneralConfigFile = async (host, user, password, dbName) => {
    const options = {
        files: 'config/database.php',
        from: [
            /'host' => '127.0.0.1'/g,
            /'user' => 'root'/g,
            /'password' => ''/g,
            /'database_name' => 'samane_test'/g,
            /'dbname' => 'samanemvcorm_test'/g
        ],
        to: [
            `'host' => '${host}'`,
            `'user' => '${user}'`,
            `'password' => '${password}'`,
            `'database_name' => '${dbName}'`,
            `'dbname' => '${dbName}'`
        ]
    }

    try {
        const results = await replace(options)
        const changedFiles = results.filter(result => result.hasChanged).map(result => result.file)
        if (changedFiles) {
            return changedFiles
        }
    } catch (error) {
        console.error('Error occurred:', error)
    }
}

/**
 * To change database.php file content by default
 */
exports.generateRestore = async () => {
    fs.copyFile(path.join(__dirname, '..', 'templates', 'config', 'database.php'), 'config/database.php', err => {
        if (err) throw err
    })
}

/**
 * To generate a backup file before restoring by default
 */
exports.generateBackup = async () => {
    var dir = `libs/backup`

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    fs.copyFile('config/database.php', `libs/backup/${new Date().toISOString()}.php`, err => {
        if (err) throw err
    })
}
