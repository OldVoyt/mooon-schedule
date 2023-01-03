export function addLeadingZeros(dateString: string): string {
  const [year, month, day] = dateString.split('-')
  const monthWithLeadingZero = month.length === 1 ? `0${month}` : month
  const dayWithLeadingZero = day.split('T')[0].length === 1 ? `0${day.split('T')[0]}` : day.split('T')[0]
  return `${year}-${monthWithLeadingZero}-${dayWithLeadingZero}T${day.split('T')[1]}`
}
