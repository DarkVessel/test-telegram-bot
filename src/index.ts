import { config } from 'dotenv'
import PromoCodes from './interfaces/PromoCodes'
import { promoCodes as configPromoCodes } from './config/basic.json'

const promoCodes: PromoCodes = require('../data/promoCodes.json')
console.log('[PROJECT] Start!')
config()

if (configPromoCodes.checkPromoCodeForLength) {
  Object.keys(promoCodes)
    .filter(promoCode => promoCode.length !== configPromoCodes.numberOfCharacters)
    .forEach(promoCode => {
      console.warn(`[WARN] The promo code "${promoCode}" will never be activated, since its length does not correspond to ${String(configPromoCodes.numberOfCharacters)} characters.`)
    })
}

require('./telegramClient')
