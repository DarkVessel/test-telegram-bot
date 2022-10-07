import { Composer } from 'grammy'

import { cmd as startCommand } from './Basic/start'
export const commandsComposer = new Composer()

commandsComposer.use(startCommand)
