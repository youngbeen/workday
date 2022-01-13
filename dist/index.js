"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWorkday = exports.isWeekend = exports.getFollowWorkday = exports.getFollowWeekday = exports.getFollowNatureDay = exports.getDayType = exports.getComingWorkday = exports.getComingNatureDay = void 0;

var _angleUtil = require("@youngbeen/angle-util");

var supportYears = ['2021', '2022'];
var yearPlan = null; // 判断日期是否是周末（周六/周日）

var isWeekend = function isWeekend(date) {
  var weekday = new Date(date).getDay();
  return weekday === 0 || weekday === 6;
}; // 判断日期是否是工作日


exports.isWeekend = isWeekend;

var isWorkday = function isWorkday(date) {
  return getDayType(date) === 'workday';
}; // 判断日期是工作日还是节假日


exports.isWorkday = isWorkday;

var getDayType = function getDayType(date) {
  var year = new Date(date).getFullYear().toString();

  if (supportYears.includes(year)) {
    // 使用plan
    yearPlan = require("../holiday/ChineseHolidays".concat(year, ".js"))["default"];

    var monthDay = _angleUtil.dateUtil.formatDateTime('MM-DD', date);

    if (yearPlan.holidays.includes(monthDay)) {
      return 'holiday';
    } else if (yearPlan.workdays.includes(monthDay)) {
      return 'workday';
    } else {
      return isWeekend(date) ? 'holiday' : 'workday';
    }
  } else {
    // 使用默认
    return isWeekend(date) ? 'holiday' : 'workday';
  }
}; // 获取日期的下一个工作日


exports.getDayType = getDayType;

var getFollowWorkday = function getFollowWorkday(date) {
  return getComingWorkday(date, 1);
}; // 获取日期的下N个工作日


exports.getFollowWorkday = getFollowWorkday;

var getComingWorkday = function getComingWorkday(date) {
  var divDays = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  date = new Date(date).getTime();
  var meetsCount = 0;

  while (meetsCount < divDays) {
    date += 1000 * 60 * 60 * 24;

    if (getDayType(date) === 'workday') {
      meetsCount++;
    }
  }

  return new Date(date);
}; // 获取日期的下一个自然日


exports.getComingWorkday = getComingWorkday;

var getFollowNatureDay = function getFollowNatureDay(date) {
  return getComingNatureDay(date, 1);
}; // 获取日期的下N个自然日


exports.getFollowNatureDay = getFollowNatureDay;

var getComingNatureDay = function getComingNatureDay(date) {
  var divDays = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var targetDate = new Date(date).getTime();
  targetDate += 1000 * 60 * 60 * 24 * divDays;
  return new Date(targetDate);
}; // 获取日期之后的下一个星期X
// 0 - Sunday, 1~6 - Monday~Saturday


exports.getComingNatureDay = getComingNatureDay;

var getFollowWeekday = function getFollowWeekday(date) {
  var weekday = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  date = new Date(date);
  var dateWeekday = date.getDay();
  var div = weekday - dateWeekday;
  div <= 0 && (div += 7);
  return getComingNatureDay(date, div);
};

exports.getFollowWeekday = getFollowWeekday;