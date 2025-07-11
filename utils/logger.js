import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { APP_CONFIG, PATH_CONFIG } from '../config/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function ensureLogDir() {
  const logDir = path.join(__dirname, '..', PATH_CONFIG.LOGS_DIR)
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true })
  }
}

function writeLog(level, message, data = null) {
  ensureLogDir()

  const timestamp = new Date().toISOString()
  const logEntry = {
    timestamp,
    level,
    message,
    data
  }

  const logLine = JSON.stringify(logEntry) + '\n'

  fs.appendFileSync(path.join(__dirname, '..', PATH_CONFIG.APP_LOG), logLine)

  if (level === 'error') {
    fs.appendFileSync(path.join(__dirname, '..', PATH_CONFIG.ERROR_LOG), logLine)
  }
}

function consoleOutput(level, message, data = null) {
  const colors = {
    debug: '\x1b[36m',
    info: '\x1b[32m',
    warn: '\x1b[33m',
    error: '\x1b[31m'
  }

  const reset = '\x1b[0m'
  const color = colors[level] || ''

  const timestamp = new Date().toISOString()
  const prefix = `${color}[${timestamp}] [${level.toUpperCase()}]${reset}`

  console.log(`${prefix} ${message}`)
  if (data) {
    console.log(`${prefix} Data:`, data)
  }
}

const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
}

function shouldLog(level) {
  const currentLevel = LOG_LEVELS[APP_CONFIG.LOG_LEVEL] || 1
  const messageLevel = LOG_LEVELS[level] || 1
  return messageLevel >= currentLevel
}

export const logger = {
  debug(message, data = null) {
    if (shouldLog('debug')) {
      writeLog('debug', message, data)
      consoleOutput('debug', message, data)
    }
  },

  info(message, data = null) {
    if (shouldLog('info')) {
      writeLog('info', message, data)
      consoleOutput('info', message, data)
    }
  },

  warn(message, data = null) {
    if (shouldLog('warn')) {
      writeLog('warn', message, data)
      consoleOutput('warn', message, data)
    }
  },

  error(message, data = null) {
    if (shouldLog('error')) {
      writeLog('error', message, data)
      consoleOutput('error', message, data)
    }
  }
}
