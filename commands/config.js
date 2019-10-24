'use strict'

const { Command } = require('@adonisjs/ace')

class Config extends Command {
    static get signature() {
        return `config`
    }

    static get description() {
        return 'Set your Samane project configuration'
    }

    async handle(args, flags) {
        console.log('config is ok')
    }
}

module.exports = Config
