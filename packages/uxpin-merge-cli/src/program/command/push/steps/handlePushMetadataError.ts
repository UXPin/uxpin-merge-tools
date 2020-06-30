import { PushError, PushMetadataResponse } from '../../../../common/services/UXPin/postPushMetadata';
import { printLine } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';

export function handlePushMetadataError(error:PushMetadataResponse | any):never {
  if (error.errorCode && error.errorCode === PushError.COMPONENT_OR_PRESET_REMOVAL) {
    const message:string = `${error.message}

If you need to push these changes, confirm it by adding the \`--force\` flag to the \`push\` command.`;
    throw new Error(message);
  }

  printLine('🛑 There was an error while uploading library metadata! Please try again.', { color: PrintColor.RED });
  throw new Error(error.message);
}
