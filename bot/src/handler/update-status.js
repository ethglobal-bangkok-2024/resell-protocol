import { createStatusUpdate, makeAttestUrl } from '../sign.js';

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
  if (params.chip && params.status) {
    const attest = await createStatusUpdate(params.chip, sender.address, { textRecord: params.status });
    const attestUrl = makeAttestUrl(attest);
    await context.send(`The status has been updated.\nSee the details: ${attestUrl}`);
  } else {
    await context.reply(
      'Missing required parameter: Chip ID and Status.'
    );
  }
}