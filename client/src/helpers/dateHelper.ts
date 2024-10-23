import dayjs from 'dayjs'

// package used by NextUI DatePicker - use to convert string to CalendarDate object + vice versa
import { parseDate } from '@internationalized/date'
import { type DateValue } from '@nextui-org/react'

// convert date to format '01 January 2023'
export const formatEventDate = (date: string | Date) => {
  return dayjs(date).format('DD MMMM YYYY')
}

// convert full Date string to CalendarDate format for use in Date Picker Component
export const convertDateToCalendarDate = (dateString: string) => {
  // convert Date string to simple string
  const simpleDateString = dayjs(dateString).utc().format('YYYY-MM-DD')

  // convert to CalendarDate object for use in DatePicker
  return parseDate(simpleDateString)
}

// convert CalendarDate value from Date Picker component to full UTC date string
// to send to API
export const convertCalendarDateToDate = (date: DateValue) => {
  // get simple date string from CalendarDate
  const simpleDateString = date.toString()

  // Parse the date and set it to the start of the day in UTC
  const fullDateString = dayjs
    .utc(simpleDateString)
    .startOf('day')
    .toISOString()

  return fullDateString
}
