import {
  SignProtocolClient,
  SpMode,
  EvmChains,
} from '@ethsign/sp-sdk';
import { privateKeyToAccount } from "viem/accounts";
import { fetchData } from './chain.js';

export const Sign = new SignProtocolClient(SpMode.OnChain, {
  chain: EvmChains.baseSepolia,
  account: privateKeyToAccount(`0x${process.env.KEY}`),
});

export async function createStatusUpdate(chipId, senderAddress, { textRecord = undefined, cid = undefined }) {
  const { chainId, address } = await fetchData();
  return Sign.createAttestation({
    schemaId: process.env.SIGN_RECORD_SCHEMA,
    data: {
      id: chipId,
      ownerAddress: senderAddress,
      pbtAddressWithChainId: `${chainId}:${address}`,
      // Strip quotes
      textRecord: textRecord?.trim().replace(/^"/, '').replace(/"$/, ''),
      cid,
      timestamp: Date.now(),
    },
    indexingValue: `${chainId}:${address}:${chipId}`,
  });
}

export async function createTransfer(chipId, senderAddress, { toAddress, price }) {
  const { chainId, address } = await fetchData();
  return Sign.createAttestation({
    schemaId: process.env.SIGN_TRANSFER_SCHEMA,
    data: {
      id: chipId,
      // ownerAddress: senderAddress,
      chipAddress: '0xa3c4b270cafc4dcc6841ce50e9b64d6fa53914d9',
      pbtAddressWithChainId: `${chainId}:${address}`,
      fromAddress: senderAddress,
      toAddress, 
      price,
      timestamp: Date.now(),
    },
    indexingValue: `${chainId}:${address}:${chipId}`,
  });
}

export function makeAttestUrl(attest) {
  return `https://testnet-scan.sign.global/attestation/onchain_evm_84532_${attest.attestationId}`;
}