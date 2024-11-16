import { run } from '@xmtp/message-kit';
import { PinataSDK } from 'pinata-web3';
// import { textGeneration, processMultilineResponse } from "@xmtp/message-kit";
// import { agent_prompt } from "./prompt.js";
import { skills } from './skills.js';
import { createStatusUpdate, makeAttestUrl } from './sign.js';

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_GATEWAY,
});

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
        const file = new File([attachment.data], 'photo.jpeg', {
          type: 'image/jpeg',
        });
        const upload = await pinata.upload.file(file);
        const fileUrl = `ipfs://${upload.IpfsHash}`;
        const attest = await createStatusUpdate(params.chip, sender.address, { cid: upload.IpfsHash });
        const attestUrl = makeAttestUrl(attest);
        await context.reply(
          `The photo has been uploaded.\nSee the file: ${fileUrl}\nSee the attestation: ${attestUrl}`
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
