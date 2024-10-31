import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

export function createFolderSync(folderName) {
  const __dirname = fileURLToPath(path.dirname(import.meta.url))
  const folderPath = path.join(__dirname.replace('/utils', ''), folderName)
  try {
    fs.statSync(folderPath)
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        fs.mkdirSync(folderPath)
      } catch (err) {
        console.error('文件夹创建失败', err)
      }
    } else {
      console.error('检查文件夹状态时出错', error)
    }
  }
}
