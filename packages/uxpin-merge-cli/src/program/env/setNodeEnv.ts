import { Environment, DEFAULT_ENVIRONMENT } from './Environment';

export function setNodeEnv(env:string | undefined = DEFAULT_ENVIRONMENT):void {
  process.env.NODE_ENV = env;

  setEnvironmentOptions(env as Environment);
}

function setEnvironmentOptions(env:Environment):void {
  switch (env) {
    case Environment.DEVELOPMENT:
    case Environment.TEST:
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      break;

    default:
      break;
  }
}