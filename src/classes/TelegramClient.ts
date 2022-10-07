import { Bot } from 'grammy'
import { commandsComposer } from '../commands/commandsComposer'
import { eventsComposer } from '../events/eventsComposer'
import commandsInfo from '../config/commandsInfo'

class TelegramClient extends Bot {
  /** Activates the error interceptor, connects the bot to Telegram and uploads commands. */
  public login (): void {
    this.catch((err: unknown) => {
      console.error(err)
      console.error('>>> Some kind of error was intercepted.')
    })

    this._loadComposers()
    this.updateCommandInformation().catch((err: unknown) => {
      console.error(err)
      console.error('>>> An error occurred while updating the status of the commands.')
    })

    this.start()
      .then(() => {
        console.log('[CLIENT] Login!')
      })
      .catch((err: unknown) => {
        console.error(err)
        console.error('>>> Failed to log in! Check the token in the .env file.')
      })
  }

  private _loadComposers (): void {
    this.use(commandsComposer)
    this.use(eventsComposer)
  }

  /** Updates information about teams in Telegram. */
  public async updateCommandInformation (): Promise<void> {
    console.log('[CLIENT] Updating information about the teams...')

    const commands = Object.keys(commandsInfo)
      .filter(cmdName => commandsInfo[cmdName].show)
      .map(cmdName => ({ command: cmdName, description: commandsInfo[cmdName].shortDescription }))

    await this.api.setMyCommands(commands)
    console.log('[CLIENT] Information about the teams has been updated.')
  }
}

export default TelegramClient
