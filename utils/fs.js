import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { logger } from './logger.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function createFolderSync(folderName, basePath = null) {
  const base = basePath || path.join(__dirname, '..')
  const folderPath = path.join(base, folderName)

  try {
    const stats = fs.statSync(folderPath)
    if (stats.isDirectory()) {
      logger.debug(`文件夹已存在: ${folderPath}`)
      return folderPath
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        fs.mkdirSync(folderPath, { recursive: true })
        logger.info(`文件夹创建成功: ${folderPath}`)
        return folderPath
      } catch (err) {
        logger.error('文件夹创建失败', { folderPath, error: err.message })
        throw err
      }
    } else {
      logger.error('检查文件夹状态时出错', { folderPath, error: error.message })
      throw error
    }
  }

  return folderPath
}

export function ensureFileDir(filePath) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

export function safeWriteFile(filePath, content, encoding = 'utf8') {
  try {
    ensureFileDir(filePath)
    fs.writeFileSync(filePath, content, encoding)
    logger.debug(`文件写入成功: ${filePath}`)
  } catch (error) {
    logger.error('文件写入失败', { filePath, error: error.message })
    throw error
  }
}

export function safeReadFile(filePath, encoding = 'utf8') {
  try {
    const content = fs.readFileSync(filePath, encoding)
    logger.debug(`文件读取成功: ${filePath}`)
    return content
  } catch (error) {
    logger.error('文件读取失败', { filePath, error: error.message })
    throw error
  }
}

export function fileExists(filePath) {
  try {
    return fs.existsSync(filePath)
  } catch (error) {
    logger.error('检查文件存在性失败', { filePath, error: error.message })
    return false
  }
}
