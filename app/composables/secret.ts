export function generateHappiness(): string {
  const base = 1234

  const buildCode = (date: Date): number => {
    const year = date.getUTCFullYear()
    const month = date.getUTCMonth() + 1
    const day = date.getUTCDate()
    const hour = date.getUTCHours()
    const minute = date.getUTCMinutes()
    return base + year + month + day + hour + minute
  }

  const now = new Date()
  const oneMinuteLater = new Date(now.getTime() + 60000)

  return buildCode(now) + '|' + buildCode(oneMinuteLater)
}
