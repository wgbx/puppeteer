export function randomString(len = 8) {
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789'
  const strLen = chars.length
  let randomStr = ''

  for (let i = 0; i < len; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * strLen))
  }

  return randomStr
}

export function timestampFileName(extension = 'png') {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  return `${timestamp}.${extension}`
}

export function isValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
