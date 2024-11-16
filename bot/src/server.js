import express from 'express';
import bodyParser from 'body-parser';
import { xmtpClient } from '@xmtp/message-kit';
import { formatEther } from 'viem';

export const server = express();
server.use(bodyParser.json());

async function sendMessage(address, message) {
  const { v2client } = await xmtpClient();
  if (v2client.conversations) {
    const conversations = await v2client.conversations.list();
    const [conversation] = conversations.filter(({peerAddress}) => peerAddress === address); 
    if (conversation) {
      await conversation.send(message);
    }
  }
}

server.post('/', async (req, res) => {
  const { type, chipId, recipient, issuer, amount } = req.body;
  try {
    switch (type) {
      case 'createOffer':
        await sendMessage(
          recipient,
          `You've got an offer for Product #${chipId}: ${formatEther(
            amount
          )} ETH`
        );
        break;
    }
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end(err.message);
  }
});
