export interface Config {
  apiURL?: string
}

let config: Config | undefined

export const getConfig = () => {
  if (!config) {
    config = {
      apiURL: 'https://new-app.dev.yordex.com/api',
    }
  }
  return config
}