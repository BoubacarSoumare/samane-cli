#!/usr/bin/env node
'use strict'

const entry = require('@adonisjs/ace')

entry.addCommand(require('./commands/cache'))
entry.addCommand(require('./commands/generate'))
entry.addCommand(require('./commands/config'))
entry.addCommand(require('./commands/config-db'))
entry.addCommand(require('./commands/config-default'))
entry.addCommand(require('./commands/config-show'))
entry.addCommand(require('./commands/config-restore'))

entry.wireUpWithCommander()
entry.invoke()
