
import { dateUtil } from '@youngbeen/angle-util'

const supportYears = ['2021', '2022']

let yearPlan = null

// 判断日期是否是周末（周六/周日）
export const isWeekend = (date) => {
  const weekday = (new Date(date)).getDay()
  return weekday === 0 || weekday === 6
}

// 判断日期是否是工作日
export const isWorkday = (date) => {
  return getDayType(date) === 'workday'
}

// 判断日期是工作日还是节假日
export const getDayType = (date) => {
  const year = new Date(date).getFullYear().toString()
  if (supportYears.includes(year)) {
    // 使用plan
    yearPlan = require(`../holiday/ChineseHolidays${year}.js`).default
    const monthDay = dateUtil.formatDateTime('MM-DD', date)
    if (yearPlan.holidays.includes(monthDay)) {
      return 'holiday'
    } else if (yearPlan.workdays.includes(monthDay)) {
      return 'workday'
    } else {
      return (isWeekend(date) ? 'holiday' : 'workday')
    }
  } else {
    // 使用默认
    return (isWeekend(date) ? 'holiday' : 'workday')
  }
}

// 获取日期的下一个工作日
export const getFollowWorkday = (date) => {
  return getComingWorkday(date, 1)
}

// 获取日期的下N个工作日
export const getComingWorkday = (date, divDays = 1) => {
  date = (new Date(date)).getTime()
  let meetsCount = 0
  while (meetsCount < divDays) {
    date += 1000 * 60 * 60 * 24
    if (getDayType(date) === 'workday') {
      meetsCount++
    }
  }
  return new Date(date)
}

// 获取日期的下一个自然日
export const getFollowNatureDay = (date) => {
  return getComingNatureDay(date, 1)
}

// 获取日期的下N个自然日
export const getComingNatureDay = (date, divDays = 1) => {
  let targetDate = (new Date(date)).getTime()
  targetDate += 1000 * 60 * 60 * 24 * divDays
  return new Date(targetDate)
}

// 获取日期之后的下一个星期X
// 0 - Sunday, 1~6 - Monday~Saturday
export const getFollowWeekday = (date, weekday = 0) => {
  date = new Date(date)
  const dateWeekday = date.getDay()
  let div = weekday - dateWeekday
  div <= 0 && (div += 7)
  return getComingNatureDay(date, div)
}
