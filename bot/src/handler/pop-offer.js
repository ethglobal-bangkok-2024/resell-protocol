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
  //TODO: Check if sender is current owner of the chip
  //TODO: Fetch & pass the actual offer amount to the URL
  if (params.chip) {
    const url = new URL(process.env.FRAME_BASE_URL);
    url.searchParams.set('action', 'popOffer');
    url.searchParams.set('chip', params.chip);
    url.searchParams.set('amount', '0.1');
    url.searchParams.set('token', 'ETH');
    url.searchParams.set('ts', Date.now().toString());
    await context.send(url.toString());
  } else {
    await context.reply(
      'Missing required parameter: Chip ID.'
    );
  }
}