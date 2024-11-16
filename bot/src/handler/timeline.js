import { fetchData } from '../chain.js';

/**
 *
 * @param {import('@xmtp/message-kit').HandlerContext} context
 */
export async function handler(context) {
  const {
    message: {
      content: { params },
    },
  } = context;
  if (params.chip) {
    const webAppUrl = new URL(process.env.APP_BASE_URL);
    webAppUrl.searchParams.set('pk1', params.chip);
    const { address } = await fetchData();
    const explorerUrl = `https://base-sepolia.blockscout.com/address/${address}`;
    await context.reply(`Visit ${webAppUrl}`);
    await context.send(`See smart contract data here: ${explorerUrl}`);
  } else {
    await context.reply(
      "Missing required parameter: chip ID.",
    );
  }
}