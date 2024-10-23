const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

export function formatDateToYYYYMMDD(date) {
  return dayjs(date).utc().format('YYYY-MM-DD')
}

const date = new Date('2024-09-18T12:34:56Z')
console.log(formatDateToYYYYMMDD(date))
// Output: 2024-09-18

