import { Composer } from 'grammy'
import { checkingPromoCodes } from './message/checkingPromoCodes'

export const eventsComposer = new Composer()
eventsComposer.use(checkingPromoCodes)
