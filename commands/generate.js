'use strict'

const fs = require('fs')
const path = require('path')

const { Command } = require('@adonisjs/ace')

const convertString = require('../utils/convert')
const generateFiles = require('../utils/generate-files')
const loading = require('../utils/loading')

class Generate extends Command {
    static get signature() {
        return `generate
          { name?: Generate directly with a name param }
          { -e, --entity: Generate a Samane Entity },
          { -c, --controller: Generate a Samane Controller },
          { -m, --model: Generate a Samane Model },
          { -v, --view: Generate a Samane View },
          { -f, --crud: Generate a Samane full CRUD }
        `
    }

    static get description() {
        return 'Use it to generate Samane Files and CRUD operations'
    }

    async handle({ name }, { entity, controller, model, view, crud, choice }) {
        if (entity) {
            // Option Entity given
            var entityName
            if (!name) {
                // No argument but given option
                entityName = await this.ask('Entity name ?')
                if (!entityName) {
                    // No name of Entity provided
                    console.log(`No name given ${this.chalk.bold.red('Canceled')}`)
                    return
                }
            } else {
                // Argument and option provided together
                entityName = name
            }
            this.generateEntity(entityName)
        } else if (controller) {
            var controllerName
            if (!name) {
                controllerName = await this.ask('Controller name ?')
                if (!controllerName) {
                    console.log(`No name given ${this.chalk.bold.red('Canceled')}`)
                    return
                }
            } else {
                controllerName = name
            }
            this.generateController(controllerName)
        } else if (model) {
            var modelName
            if (!name) {
                modelName = await this.ask('Model name ?')
                if (!modelName) {
                    console.log(`No name given ${this.chalk.bold.red('Canceled')}`)
                    return
                }
            } else {
                modelName = name
            }
            this.generateModel(modelName)
        } else if (view) {
            var viewName
            if (!name) {
                viewName = await this.ask('View name ?')
                if (!viewName) {
                    console.log(`No name given ${this.chalk.bold.red('Canceled')}`)
                    return
                }
            } else {
                viewName = name
            }
            var dir = `src/view/${viewName.toLowerCase()}`

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir)
            }

            this.generateView(viewName)
        } else if (crud) {
            var crudName
            if (!name) {
                crudName = await this.ask('Crud name ?')
                if (!crudName) {
                    console.log(`No name given ${this.chalk.bold.red('Canceled')}`)
                    return
                }
            } else {
                crudName = name
            }
            this.generateFullCrud(crudName)
        } else {
            /**
             * No argument or option
             */
            const choice = await this.choice('What do you want to generate?', [
                'entity',
                'controller',
                'model',
                'view',
                'crud'
            ])
            /**
             * if name is provided but no options
             */
            if (name) {
                if (choice === 'entity') {
                    this.generateEntity(name)
                } else if (choice === 'controller') {
                    this.generateController(name)
                } else if (choice === 'model') {
                    this.generateModel(name)
                } else if (choice === 'view') {
                    var directory = `src/view/${name.toLowerCase()}`

                    if (!fs.existsSync(directory)) {
                        fs.mkdirSync(directory)
                    }

                    this.generateView(name)
                } else {
                    this.generateFullCrud(name)
                }
            } else {
                if (choice === 'entity') {
                    const entityName = await this.ask('Entity name ?')
                    if (!entityName) {
                        console.log(`No name given ${this.chalk.bold.red('Canceled')}`)
                        return
                    }
                    this.generateEntity(entityName)
                } else if (choice === 'controller') {
                    const controllerName = await this.ask('Controller name ?')
                    if (!controllerName) {
                        console.log(`No name given ${this.chalk.bold.red('Canceled')}`)
                        return
                    }
                    this.generateController(controllerName)
                } else if (choice === 'model') {
                    const modelName = await this.ask('Model name ?')
                    if (!modelName) {
                        console.log(`No name given ${this.chalk.bold.red('Canceled')}`)
                        return
                    }
                    this.generateModel(modelName)
                } else if (choice === 'view') {
                    const viewName = await this.ask('entity name ?')
                    if (!viewName) {
                        console.log(`No name given ${this.chalk.bold.red('Canceled')}`)
                        return
                    }

                    var d = `src/view/${viewName.toLowerCase()}`

                    if (!fs.existsSync(d)) {
                        fs.mkdirSync(d)
                    }

                    this.generateView(viewName)
                } else {
                    const name = await this.ask('entity name ?')
                    if (!name) {
                        console.log(`No name given ${this.chalk.bold.red('Canceled')}`)
                        return
                    }
                    this.generateFullCrud(name)
                }
            }
        }
    }

    /**
     * Funct for generating an Entity
     * @param {string} entityName
     * @param {boolean} forCrd
     */
    async generateEntity(entityName, forCrd = false) {
        if (!forCrd) {
            await loading.eSpinner()
        }
        const fileLocation = await generateFiles.generateEverything(
            entityName,
            path.join(__dirname, '..', 'templates', 'entities', 'Test.php'),
            `src/entities/${convertString.camelCase(entityName)}.php`
        )
        console.log(`${forCrd ? 'Entity' : 'location'}: ${this.chalk.bold.green(fileLocation)}`)
    }

    /**
     * Funct for generating a Controller
     * @param {string} controllerName
     * @param {boolean} forCrd
     */
    async generateController(controllerName, forCrd = false) {
        if (!forCrd) {
            await loading.mcSpinner(controllerName, 'c')
        }
        const fileLocation = await generateFiles.generateEverything(
            controllerName,
            path.join(__dirname, '..', 'templates', 'controllers', 'TestController.class.php'),
            `src/controller/${convertString.camelCase(controllerName)}Controller.class.php`
        )
        console.log(`${forCrd ? 'Controller' : 'location'}: ${this.chalk.bold.green(fileLocation)}`)
    }

    /**
     * Funct for generating a Model
     * @param {string} modelName
     * @param {boolean} forCrd
     */
    async generateModel(modelName, forCrd = false) {
        if (!forCrd) {
            await loading.mcSpinner(modelName, 'm')
        }

        const fileLocation = await generateFiles.generateEverything(
            modelName,
            path.join(__dirname, '..', 'templates', 'models', 'TestDB.php'),
            `src/model/${convertString.camelCase(modelName)}DB.php`
        )
        console.log(`${forCrd ? 'Model' : 'location'}: ${this.chalk.bold.green(fileLocation)}`)
    }

    /**
     * Funct for generating an View
     * @param {string} viewName
     * @param {boolean} forCrd
     */
    async generateView(viewName, forCrd = false) {
        if (!forCrd) {
            await loading.vSpinner()
        }

        const fileLocation = await generateFiles.generateEverything(
            viewName,
            path.join(__dirname, '..', 'templates', 'views', 'test', 'index.html'),
            `src/view/${viewName.toLowerCase()}/index.html`
        )
        console.log(`${forCrd ? 'View' : 'location'}: ${this.chalk.bold.green(fileLocation)}`)
    }

    /**
     * Funct for generating a full CRUD
     * @param {string} name
     */
    async generateFullCrud(name) {
        await loading.crdSpinner()
        await this.generateEntity(name, true)
        await this.generateController(name, true)
        await this.generateModel(name, true)

        var dir = `src/view/${name.toLowerCase()}`

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }

        await this.generateView(name, true)
    }
}

module.exports = Generate
