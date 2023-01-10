const log4js = require("log4js")

log4js.configure({
    appenders: {
        // defino dos soportes de salida de datos
        consola: { type: 'console' },
        archivo: { type: 'file', filename: 'utils/loggers/error.log' },
        archivo2: { type: 'file', filename: 'utils/loggers/warning.log' },
        // defino sus niveles de logueo
        loggerConsola: { type: 'logLevelFilter', appender: 'consola', level: 'info' },
        loggerArchivo: { type: 'logLevelFilter', appender: 'archivo', level: 'error' },
        loggerArchivo2: { type: 'logLevelFilter', appender: 'archivo2', level: 'warn' }
      },
      categories: {
        default: {
          appenders: ['loggerConsola'], level: 'all'
        },
        custom: {
          appenders: ['loggerConsola', 'loggerArchivo','loggerArchivo2'], level: 'all'
        }
      }
})

let logger = log4js.getLogger("custom")

module.exports = logger