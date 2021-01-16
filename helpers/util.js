import moment from 'moment'

export const timeConvert = (n) => {
  const time = new Date(n * 1000).toISOString().substr(11, 8)
  const momentFormat = moment(time, 'HH:mm:ss')
  if (+moment(time, 'HH').format('H') === 0) {
    return momentFormat.format('m นาที s วินาที')
  } else {
    return momentFormat.format('H ชั่วโมง m นาที s วินาที')
  }
}

export const timeConvert2 = (n) => {
  const num = n
  const hours = (num / 60)
  const rhours = Math.floor(hours)
  const minutes = (hours - rhours) * 60
  const rminutes = Math.round(minutes)
  return `0${rhours}:${rminutes}`
}

export const stripHtml = (val = '') => {
  return val.replace(/<[^>]*>?/gm, '')
}