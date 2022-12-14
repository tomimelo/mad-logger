import winston from 'winston'

export function printMeta (meta: winston.Logform.TransformableInfo): string {
  const excludedMeta = ['meta', 'message', 'timestamp', 'level']
  return Object.keys(meta)
    .filter(k => excludedMeta.indexOf(k) === -1)
    .map(k => `[${meta[k]}]`).join(' ')
}
