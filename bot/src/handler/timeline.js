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
    const { chainId, address } = await fetchData();
    await context.reply(`Visit ${webAppUrl}`);
    if (chainId === '84532') {
      const explorerUrl = `https://base-sepolia.blockscout.com/address/${address}`;
      await context.send(`See smart contract data here: ${explorerUrl}`);
    }
  } else {
    await context.reply(
      "Missing required parameter: chip ID.",
    );
  }
}