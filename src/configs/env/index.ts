type EnvKeys =
  | 'API_PORT'
  | 'API_HOST'
  | 'GOOGLE_OAUTH_REDIRECT_URI'
  | 'GOOGLE_OAUTH_AUTH_URI'
  | 'GOOGLE_OAUTH_CLIENT_ID'
  | 'GOOGLE_OAUTH_CLIENT_SECRET'
  | 'GOOGLE_OAUTH_TOKEN_URI'
  | 'JWT_SECRET_KEY'
  | 'JWT_EXPIRATION'

export function getEnv(key: EnvKeys) {
  return process.env[key] as string
}
