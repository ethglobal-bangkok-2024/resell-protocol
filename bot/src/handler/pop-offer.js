import { formatEther } from 'viem';
import { pbt } from '../chain.js';

/**
 *
 * @param {import('@xmtp/message-kit').HandlerContext} context
 */
export async function handler(context) {
  const {
    message: {
      content: { params },
    },
    sender,
  } = context;
  //TODO: Check if sender is current owner of the chip
  if (params.chip) {
    const url = new URL(process.env.FRAME_BASE_URL);
    const offer = await (await pbt(sender.address)).read.offers([parseInt(params.chip)]);
    if (offer) {
      url.searchParams.set('action', 'popOffer');
      url.searchParams.set('chip', params.chip);
      url.searchParams.set('amount', formatEther(offer[2]));
      url.searchParams.set('token', 'ETH');
      url.searchParams.set('ts', Date.now().toString());
      await context.send(url.toString());
      //HACK: Fake the smart contract call
      // await (await pbt(sender.address)).write.acceptOffer([parseInt(params.chip, 8)]);
      // await context.send('Psst: done 🥷');
    } else {
    }
  } else {
    await context.reply(
      'Missing required parameter: Chip ID.'
    );
  }
}