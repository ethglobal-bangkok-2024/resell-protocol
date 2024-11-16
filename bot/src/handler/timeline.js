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
    const url = new URL(process.env.APP_BASE_URL);
    url.searchParams.set('pk1', params.chip);
    await context.reply(`Visit ${url}`);
  } else {
    await context.reply(
      "Missing required parameter: chip ID.",
    );
  }
}