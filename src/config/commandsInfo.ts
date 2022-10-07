interface infoScheme {
  [commandName: string]: {
    /** Display the command in the tooltips. */
    show: boolean

    /** A brief description of the command that will be shown in the prompts. */
    shortDescription: string
  }
}

const scheme: infoScheme = {
  start: {
    show: true,
    shortDescription: 'Запустить бота.'
  }
}

export default scheme
