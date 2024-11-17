import { createStatusUpdate, makeAttestUrl } from '../sign.js';
import { unstashAttachment } from '../stash.js';

/**
 *
 * @param {import('@xmtp/message-kit').HandlerContext} context
 */
export async function handler(context) {
  const {
    message: {
      content: { params },
      sender,
    },
  } = context;
  //TODO: Check if sender is current owner of the chip
  if (params.chip) {
    const attest = await createStatusUpdate(params.chip, sender.address, {
      textRecord: params.status,
      cid: unstashAttachment(sender.address),
    });
    const attestUrl = makeAttestUrl(attest);
    await context.send(
      `The status has been updated.\nSee the attestation: ${attestUrl}`
    );
  } else {
    await context.reply('Missing required parameter: Chip ID and Status.');
  }
}
