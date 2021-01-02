export const timeConvert = (n) => {
  const num = n
  const hours = (num / 60)
  const rhours = Math.floor(hours)
  const minutes = (hours - rhours) * 60
  const rminutes = Math.round(minutes)
  return `${rhours} ชั่วโมง ${rminutes} นาที`
}

export const timeConvert2 = (n) => {
  const num = n
  const hours = (num / 60)
  const rhours = Math.floor(hours)
  const minutes = (hours - rhours) * 60
  const rminutes = Math.round(minutes)
  return `0${rhours}:0${rminutes}`
}
