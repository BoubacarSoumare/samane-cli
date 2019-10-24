'use strict'

const { Command } = require('@adonisjs/ace')

const genFiles = require('../utils/generate-files')

class Config extends Command {
    static get signature() {
        return `config:db
        { -m, --mode: Switch between PDO and ORM mode },
        { state?: Turn on or off your DB }
        `
    }

    static get description() {
        return 'Set your Samane project configuration'
    }

    async handle({ state }, { mode }) {
        if (mode) {
            // Option Mode given
            var dbState
            if (!state) {
                // No argument but given option
                if (!dbState) {
                    // No name of Entity provided
                    const choice = await this.choice('Switch between PDO and ORM mode ?', ['PDO', 'ORM'], 'PDO')
                    if (choice === 'PDO') {
                        genFiles.editConfigFile('$choix = "ORM"', '$choix = "PDO"')
                    } else {
                        genFiles.editConfigFile('$choix = "PDO"', '$choix = "ORM"')
                    }
                    console.log(`Switched to ${this.chalk.bold.green(choice.toUpperCase())}`)
                }
            } else {
                // Argument and option provided together
                if (state.toLowerCase() !== 'pdo' && state.toLowerCase() !== 'orm') {
                    console.log(`${this.chalk.bold.red('Invalid option, should be pdo or orm')}`)
                    return
                }
                if (state.toLowerCase() === 'pdo') {
                    genFiles.editConfigFile('$choix = "ORM"', '$choix = "PDO"')
                } else {
                    genFiles.editConfigFile('$choix = "PDO"', '$choix = "ORM"')
                }
                console.log(`Switched to ${this.chalk.bold.green(state.toUpperCase())}`)
            }
        } else if (state) {
            // Only argument given
            if (state.toLowerCase() !== 'on' && state.toLowerCase() !== 'off') {
                console.log(`${this.chalk.bold.red('Invalid option, should be on or off')}`)
                return
            }
            if (state.toLowerCase() === 'off') {
                genFiles.editConfigFile("$etat = 'on'", "$etat = 'off'")
            } else {
                genFiles.editConfigFile("$etat = 'off'", "$etat = 'on'")
            }
            console.log(`Switched to ${this.chalk.bold.green(state.toLowerCase())}`)
        } else {
            const choice = await this.choice('Turn on or off your Database ?', ['on', 'off'], 'on')
            if (choice.toLowerCase() === 'off') {
                genFiles.editConfigFile("$etat = 'on'", "$etat = 'off'")
            } else {
                genFiles.editConfigFile("$etat = 'off'", "$etat = 'on'")
            }

            const hostName = await this.ask('Host name ?', '127.0.0.1')
            const userName = await this.ask('User name ?', 'root')
            const password = await this.ask('Password ?', '')
            const dbName = await this.ask('Database name ?', 'samane_test')

            genFiles.editGeneralConfigFile(hostName, userName, password, dbName)

            console.log(`Database switched to ${this.chalk.bold.green(choice.toLowerCase())}`)
            console.log(`Host name changed => ${this.chalk.bold.green(hostName)}`)
            console.log(`User name changed => ${this.chalk.bold.green(userName)}`)
            console.log(`Password changed => ${this.chalk.bold.green(password)}`)
            console.log(`DB name changed => ${this.chalk.bold.green(dbName)}`)
        }
    }
}

module.exports = Config
