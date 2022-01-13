
# workday

Provides workday and holiday supports in pure JavaScript.
Holiday plans are based on legal holiday plans, you can use custom local plans instead.

> Tip: This repo will be updated every year with new year legal holiday plan released. Hence local dependency should be updated every year as well.

## Install

```shell
npm install @youngbeen/workday
```

## How-to

Wherever you want to use, import the apis you need. e.g.

```javascript
import { isWeekend, getFollowWorkday } from '@youngbeen/workday'
```

## Apis

### Determine a date is workday or holiday

`getDayType(date)`

date - date to check, any valid date type

Example:

```javascript
getDayType('2022-01-14') // -> 'workday'
getDayType('2022-01-16 10:23:32') // -> 'holiday'
getDayType(new Date())
```

### Check a date is workday or not

`isWorkday(date)`

date - date to check, any valid date type

Example:

```javascript
isWorkday('2022-01-14') // -> true
isWorkday('2022-01-16 10:23:32') // -> false
isWorkday(new Date())
```

### Check a date is weekend or not

`isWeekend(date)`

date - date to check, any valid date type

Example:

```javascript
isWeekend('2022-01-14') // -> false
isWeekend('2022-01-16 10:23:32') // -> true
isWeekend(new Date())
```

### Get a date's following workday

`getFollowWorkday(date)`

date - a date, any valid date type

Example:

```javascript
getFollowWorkday('2022-01-13') // return the 14th Jan 2022 by local timezone
getFollowWorkday('2022-01-14 10:23:32') // return the 17th Jan 2022 by local timezone
getFollowWorkday(new Date()) // return today's follow workday by local timezone
```

### Get a date's next N workday

`getComingWorkday(date, n)`

date - a date, any valid date type
n - count after the date, defaults to 1

Example:

```javascript
getComingWorkday('2022-01-13') // return the first workday after 2022-01-13 by local timezone
getComingWorkday('2022-01-14 10:23:32', 3) // return the third workday after 2022-01-14 10:23:32 by local timezone
getComingWorkday(new Date(), 2) // return the second workday after today by local timezone
```

### Get a date's following day

`getFollowNatureDay(date)`

date - a date, any valid date type

Example:

```javascript
getFollowNatureDay('2022-01-13') // return the 14th Jan 2022 by local timezone
getFollowNatureDay('2022-01-14 10:23:32') // return the 15th Jan 2022 by local timezone
getFollowNatureDay(new Date()) // return today's follow day by local timezone
```

### Get a date's next N day

`getComingNatureDay(date, n)`

date - a date, any valid date type
n - count after the date, defaults to 1

Example:

```javascript
getComingNatureDay('2022-01-13') // return the first day after 2022-01-13 by local timezone
getComingNatureDay('2022-01-14 10:23:32', 3) // return the third day after 2022-01-14 10:23:32 by local timezone
getComingNatureDay(new Date(), 2) // return the second day after today by local timezone
```

### Get a date's next weekday X

`getFollowWeekday(date, x)`

date - a date, any valid date type
x - weekday, 0 - Sunday, 1~6 - Monday~Saturday

Example:

```javascript
getFollowWeekday('2022-01-13', 2) // return the next tuesday after 2022-01-13 by local timezone
getFollowWeekday('2022-01-14 10:23:32', 6) // return the next saturady after 2022-01-14 10:23:32 by local timezone
getFollowWeekday(new Date(), 0) // return the next sunday after today by local timezone
```