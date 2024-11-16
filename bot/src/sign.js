import {
  SignProtocolClient,
  SpMode,
  EvmChains,
} from '@ethsign/sp-sdk';
import { privateKeyToAccount } from "viem/accounts";
import { fetchData } from './data.js';

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
      textRecord,
      cid,
      timestamp: Date.now(),
    },
    indexingValue: `${chainId}:${address}:${chipId}`,
  });
}

export function makeAttestUrl(attest) {
  return `https://testnet-scan.sign.global/attestation/onchain_evm_84532_${attest.attestationId}`;
}