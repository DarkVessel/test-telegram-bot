import { Composer, Context } from 'grammy'

export const cmd = new Composer()
cmd
  .command('start')
  .filter((ctx: Context) => ctx.chat?.type === 'private')
  .use((ctx) => {
    ctx.reply('Привет! Введи промокод, чтобы получить свою скидку.').catch(console.error)
  })
