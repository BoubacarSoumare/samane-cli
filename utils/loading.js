const Ora = require('ora')
const Listr = require('listr')

const convertString = require('./convert')

/**
 * While generating an Entity
 */
exports.eSpinner = async () => {
    const spinner = Ora('Generating file')
    spinner.start()

    await waitASecond()
    spinner.color = 'magenta'
    spinner.text = 'generating getters'

    await waitASecond()
    spinner.color = 'yellow'
    spinner.text = 'generating setters'

    await waitASecond()
    spinner.succeed('Entity generated successfully!')
}

/**
 * While generating a Model or a Controller
 * @param {string} funcName
 * @param {string} type
 */
exports.mcSpinner = async (funcName, type) => {
    var name
    if (type === 'c') {
        funcName = ''
        name = 'Controller'
    } else {
        funcName = convertString.camelCase(funcName)
        name = 'Model'
    }

    const spinner = Ora('Generating file')
    spinner.start()

    await waitASecond()
    spinner.color = 'magenta'
    spinner.text = `generating get${funcName}`

    await waitASecond()
    spinner.color = 'yellow'
    spinner.text = `generating add${funcName}`

    await waitASecond()
    spinner.color = 'blue'
    spinner.text = `generating delete${funcName}`

    await waitASecond()
    spinner.color = 'cyan'
    spinner.text = `generating update${funcName}`

    await waitASecond()
    spinner.color = 'green'
    spinner.text = `generating liste${funcName}`

    await waitASecond()
    spinner.succeed(`${name} generated successfully!`)
}

/**
 * While generating a View
 */
exports.vSpinner = async () => {
    const spinner = Ora('Generating file')
    spinner.start()

    await waitASecond()
    spinner.color = 'magenta'
    spinner.text = 'generating simple html base'

    await waitASecond()
    spinner.succeed('View generated successfully!')
}

/**
 * While generating a full CRUD
 */
exports.crdSpinner = async () => {
    // deployment task list
    const tasks = new Listr([
        {
            title: 'Generating entity',
            task: () => waitASecond()
        },
        {
            title: 'Generating Controller',
            task: () => waitASecond()
        },
        {
            title: 'Generating Model',
            task: () => waitASecond()
        },
        {
            title: 'Generating View',
            task: () => waitASecond()
        }
    ])

    await tasks.run()
}

function waitASecond() {
    return new Promise(resolve => setTimeout(resolve, 500))
}
