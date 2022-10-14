const NGROK_SESSION_ID_REGEXP = /https?:\/\/([a-z0-9]+)\.ngrok/i;

export function getNgrokSessionId(url?: string): string | undefined {
  if (!url) {
    return undefined;
  }

  const result: RegExpExecArray | null = NGROK_SESSION_ID_REGEXP.exec(url);

  return result === null ? undefined : result[1];
}
