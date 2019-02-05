const NGROK_SESSION_ID_REGEXP = /https?:\/\/([a-z0-9]+)\.ngrok/;

export function getNgrokSessionId(url:string):string | null {
  const result:RegExpExecArray | null = NGROK_SESSION_ID_REGEXP.exec(url);

  return result && result[1];
}
