import { formatEther } from 'viem';
import { pbt } from '../chain.js';
import { createTransfer } from '../sign.js';

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
    const offers = await (
      await pbt(sender.address)
    ).read.getActiveOffersByTokenId([parseInt(params.chip)]);
    if (offers && offers.length > 0) {
      const offer = offers[offers.length - 1];
      url.searchParams.set('action', 'popOffer');
      url.searchParams.set('chip', params.chip);
      url.searchParams.set('amount', formatEther(offer.amount));
      url.searchParams.set('token', 'ETH');
      url.searchParams.set('ts', Date.now().toString());
      await context.send(url.toString());
      //HACK: Fake the smart contract call
      await (await pbt(sender.address)).write.acceptOffer([offer.id]);
      // Attest
      const attest = await createTransfer(params.chip, sender.address, {
        toAddress: offer.buyer,
        price: offer.amount,
      });
      await context.send('Psst: accepted 🥷');
      // 2FA
      const haloMsg = `Please, confirm a posession of the Halo chip: ${Date.now()}`;
      const chipSignUrl = new URL(process.env.CHIP_SIGN_URL);
      chipSignUrl.searchParams.set('msg', haloMsg);
      await context.send(`Now, please sign the transfer using the HaLo chip: ${chipSignUrl.toString()}`);
    } else {
    }
  } else {
    await context.reply('Missing required parameter: Chip ID.');
  }
}
