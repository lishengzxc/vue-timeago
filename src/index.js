const UNIT_INTERVAL = {}
UNIT_INTERVAL.SECOND = 1
UNIT_INTERVAL.MINUTE = UNIT_INTERVAL.SECOND * 60
UNIT_INTERVAL.HOUR = UNIT_INTERVAL.MINUTE * 60
UNIT_INTERVAL.DAY = UNIT_INTERVAL.HOUR * 24
UNIT_INTERVAL.WEEK = UNIT_INTERVAL.DAY * 7
UNIT_INTERVAL.MONTH = UNIT_INTERVAL.DAY * 30
UNIT_INTERVAL.YEAR = UNIT_INTERVAL.DAY * 365

function pluralOrSingular(data, locale) {
  const count = Math.round(data)
  if (Array.isArray(locale)) {
    return count > 1
      ? locale[1].replace(/%s/, count)
      : locale[0].replace(/%s/, count)
  }
  return locale.replace(/%s/, count)
}

function canTimeago(seconds, targetStage, maxStage) {
  const isOutOfMaxTime = !maxStage || seconds <= UNIT_INTERVAL[maxStage]

  return seconds >= UNIT_INTERVAL[targetStage] && isOutOfMaxTime
}

export default function install(Vue, {
  name = 'timeago',
  locale = null,
  maxtime = {
    stage: null,
    format: v => v
  }
} = {}) {
  if (!Array.isArray(locale)) {
    throw new TypeError('Expected locale to be an array')
  }

  Vue.filter(name, timeago)

  function timeago(then) {
    const now = new Date().getTime()
    const seconds = Math.round(now / 1000 - new Date(then).getTime() / 1000)

    if (canTimeago(seconds, 'YEAR', maxtime.stage)) {
      return pluralOrSingular(seconds / UNIT_INTERVAL.YEAR, locale[6])
    }
    if (canTimeago(seconds, 'MONTH', maxtime.stage)) {
      return pluralOrSingular(seconds / UNIT_INTERVAL.MONTH, locale[5])
    }
    if (canTimeago(seconds, 'WEEK', maxtime.stage)) {
      return pluralOrSingular(seconds / UNIT_INTERVAL.WEEK, locale[4])
    }
    if (canTimeago(seconds, 'DAY', maxtime.stage)) {
      return pluralOrSingular(seconds / UNIT_INTERVAL.DAY, locale[3])
    }
    if (canTimeago(seconds, 'HOUR', maxtime.stage)) {
      return pluralOrSingular(seconds / UNIT_INTERVAL.HOUR, locale[2])
    }
    if (canTimeago(seconds, 'MINUTE', maxtime.stage)) {
      return pluralOrSingular(seconds / UNIT_INTERVAL.MINUTE, locale[1])
    }
    if (canTimeago(seconds, 'SECOND', maxtime.stage)) {
      return pluralOrSingular(seconds / UNIT_INTERVAL.SECOND, locale[0])
    }
    return maxtime.format(then)
  }
}
