import { run } from '@xmtp/message-kit';
// import { textGeneration, processMultilineResponse } from "@xmtp/message-kit";
// import { agent_prompt } from "./prompt.js";
import { skills } from './skills.js';
import { stashAttachment } from './stash.js';

run(
  async (context) => {
    const {
      message: {
        content: { text, params, attachment },
        typeId,
        sender,
      },
    } = context;
    try {
      if (typeId === 'remoteStaticAttachment') {
        //TODO: Check if sender is current owner of the chip
        const upload = await stashAttachment(sender.address, attachment);
        const fileUrl = `https://ipfs.io/ipfs/${upload.IpfsHash}`;
        await context.reply(
          `The photo has been uploaded.\nSee the file: ${fileUrl}`
        );
      } else {
        await context.send(`GM! Enter "/help" to start`);
      }
    } catch (error) {
      console.error('Error during OpenAI call:', error);
      await context.send('An error occurred while processing your request.');
    }
  },
  { skills }
);
