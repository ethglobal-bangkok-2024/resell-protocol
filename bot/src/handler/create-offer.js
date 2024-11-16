import { parseEther } from 'viem';
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
  if (params.chip && params.amount && params.token) {
    const url = new URL(process.env.FRAME_BASE_URL);
    url.searchParams.set('action', 'createOffer');
    url.searchParams.set('chip', params.chip);
    url.searchParams.set('amount', params.amount);
    url.searchParams.set('token', params.token);
    url.searchParams.set('ts', Date.now().toString());
    await context.send(url.toString());
    //HACK: Fake the smart contract call
    await (await pbt(sender.address)).write.createOffer([parseInt(params.chip)], {
      value: parseEther(String(params.amount)),
    });
    await context.send('Psst: done 🥷');
  } else {
    await context.reply('Missing required parameters: Chip ID and Amount.');
  }
}
