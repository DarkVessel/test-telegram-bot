import { Composer } from 'grammy'
import { writeFileSync } from 'fs'

import { promoCodes as configPromoCodes } from '../../config/basic.json'
import PromoCodes from '../../interfaces/PromoCodes'

const [checkLengthPromoCode, promoCodeLength] = [configPromoCodes.checkPromoCodeForLength, configPromoCodes.numberOfCharacters]
const promoCodes: PromoCodes = require('../../../data/promoCodes.json')
export const checkingPromoCodes = new Composer()

checkingPromoCodes.chatType('private').on(':text', (ctx) => {
  const msgContent = ctx.message.text

  if (checkLengthPromoCode && promoCodeLength !== msgContent.length) {
    return ctx.reply('Такого промокода не существует!')
  }

  if (!(msgContent in promoCodes)) {
    ctx.reply('Такого промокода не существует!').catch(console.error)
    return
  }

  ctx.reply(`Вам предоставляется ${String(promoCodes[msgContent].discount)}% скидка!`).catch(console.error)
  delete promoCodes[msgContent]
  writeFileSync('data/promoCodes.json', JSON.stringify(promoCodes, null, 2))
})
