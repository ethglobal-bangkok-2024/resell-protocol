import { PinataSDK } from 'pinata-web3';

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_GATEWAY,
});

const stash = new Map();

export async function stashAttachment(senderAddress, attachment) {
  const file = new File([attachment.data], 'photo.jpeg', {
    type: 'image/jpeg',
  });
  const upload = await pinata.upload.file(file);
  stash.set(senderAddress, upload.IpfsHash);
  return upload;
}

export function unstashAttachment(senderAddress) {
  try {
    return stash.get(senderAddress);
  } finally {
    stash.delete(senderAddress);
  }
}