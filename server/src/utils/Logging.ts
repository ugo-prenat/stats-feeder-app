import chalk from 'chalk'

export default class Logging {
  public static log = (args: any) => this.info(args)
  public static info = (args: any) =>
    console.log(
      chalk.blue(`${getDate()}[INFO]`),
      typeof args === 'string' ? chalk.blueBright(args) : args
    )
  public static warn = (args: any) =>
    console.log(
      chalk.yellow(`${getDate()}[WARN]`),
      typeof args === 'string' ? chalk.yellowBright(args) : args
    )
  public static error = (args: any) =>
    console.log(
      chalk.red(`${getDate()}[ERROR]`),
      typeof args === 'string' ? chalk.redBright(args) : args
    )
}
const getDate = () => {
  if (process.env.ENV === 'DEV') return `[${new Date().toLocaleString()}] `
  return ''
}
