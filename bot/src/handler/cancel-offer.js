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
    const url = new URL(process.env.FRAME_BASE_URL);
    url.searchParams.set('action', 'cancelOffer');
    url.searchParams.set('chip', params.chip);
    url.searchParams.set('ts', Date.now().toString());
    await context.send(url.toString());
  } else {
    await context.reply(
      'Missing required parameter: Chip ID.'
    );
  }
}
