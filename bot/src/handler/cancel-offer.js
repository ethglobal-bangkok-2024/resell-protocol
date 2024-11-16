import { pbt } from '../chain.js';

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
  if (params.chip) {
    const url = new URL(process.env.FRAME_BASE_URL);
    url.searchParams.set('action', 'cancelOffer');
    url.searchParams.set('chip', params.chip);
    url.searchParams.set('ts', Date.now().toString());
    await context.send(url.toString());
    //HACK: Fake the smart contract call
    await (await pbt(sender.address)).write.cancelOffer([parseInt(params.chip)]);
    await context.send('Psst: done 🥷');
  } else {
    await context.reply(
      'Missing required parameter: Chip ID.'
    );
  }
}
