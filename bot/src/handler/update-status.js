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
  if (params.chip) {
    //TODO: Create a Sign attestation
    await context.send('The status has been updated.\nSee the details: ???');
  } else {
    await context.reply(
      'Missing required parameter: Chip ID.'
    );
  }
}