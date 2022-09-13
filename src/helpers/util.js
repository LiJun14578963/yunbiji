export function friendlyDate(datsStr) {
  let dateObj = typeof datsStr === 'object' ? datsStr : new Date(datsStr)
  let time = dateObj.getTime()//对象的时间
  let now = Date.now()//获取当时的时间
  let space = now - time//获取时间差
  let str = ''

  switch (true) {
    case space < 60000:
      str = '刚刚'
      break
    case space < 1000 * 3600:
      str = Math.floor(space / 60000) + '分钟前'
      break
    case space < 1000 * 3600 * 24:
      str = Math.floor(space / (1000 * 3600)) + '小时前'
      break
    default:
      str = Math.floor(space / (1000 * 3600 * 24)) + '天前'
  }
  return str
}
