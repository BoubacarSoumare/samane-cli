'use strict'

const fs = require('fs')

const { Command } = require('@adonisjs/ace')

class Config extends Command {
    static get signature() {
        return `config:show`
    }

    static get description() {
        return 'Show content of your config file'
    }

    async handle(args, flags) {
        const configFile = fs.readFileSync('config/database.php')
        console.log(configFile.toString())
    }
}

module.exports = Config
