'use strict'

const { Command } = require('@adonisjs/ace')

const fileHelper = require('../utils/file')

class Cache extends Command {
    static get signature() {
        return `cache
          { -c, --clear: Clear the cache }
        `
    }

    static get description() {
        return 'Manage the cache of your Samane project'
    }

    async handle(args, { clear }) {
        if (clear) {
            const confirm = await this.confirm('Do you really want to clear the cache ?', { default: true })
            if (confirm) {
                const directory = 'cache'
                fileHelper.clearCache(directory, false)
                console.log(`${this.chalk.bold.green('cache successfully cleared')}`)
            } else {
                console.log(`${this.chalk.bold.red('Canceled')}`)
            }
        } else {
            console.log('No argument')
        }
    }
}

module.exports = Cache
