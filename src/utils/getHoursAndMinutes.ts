export function getHoursAndMinutes(showDate: Date) {
  return `${showDate.getHours().toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })}:${showDate.getMinutes().toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })}`
}
