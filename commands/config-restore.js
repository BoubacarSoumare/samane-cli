'use strict'

const { Command } = require('@adonisjs/ace')

const generator = require('../utils/generate-files')

class Config extends Command {
    static get signature() {
        return `config:restore`
    }

    static get description() {
        return 'Undo your last config file restoration'
    }

    async handle(args, flags) {
        const confirm = await this.confirm('Do you really want to undo your last config file restoration ?', {
            default: false
        })
        if (confirm) {
            // Generate Backup config file
            await generator.generateBackup()
            // Restore config file by default
            await generator.generateRestore()

            console.log(`${this.chalk.bold.green('Config file restored by default successfully')}`)
            console.log(`Backup generated, to undo this action use ${this.chalk.bold.magenta('sm config:backup')}`)
        } else {
            console.log(`${this.chalk.bold.red('Canceled')}`)
        }
    }
}

module.exports = Config
