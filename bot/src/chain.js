import { getContract, createWalletClient, extractChain, http } from 'viem';
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from 'viem/chains';
import pbtAbi from './pbt.abi.json' with { type: 'json' };

export async function fetchData() {
  const res = await fetch(process.env.API_BASE_URL);
  const { chainId, address } = await res.json();
  return { chainId, address };
}

export function privateKeyBySender(senderAddress) {
  switch (senderAddress) {
    case '0x904903236b56997393EAc3b946D10Fd4576e7e35':
      return process.env.DEMO_PRIVATE_KEY_1;
    case '0x5593c4461afa5c12fe8D462B95EbeCc181A3ccC7':
      return process.env.DEMO_PRIVATE_KEY_2;
  }
  throw new Error(`Unknown signer: ${senderAddress}`);
}

export async function pbt(senderAddress) {
  const { chainId, address } = await fetchData();
  const pk = privateKeyBySender(senderAddress);
  const signer = privateKeyToAccount(`0x${pk}`);
  const chain = extractChain({
    chains: [baseSepolia],
    id: Number(chainId),
  });
  const client = createWalletClient({
    account: signer,
    chain,
    transport: http(),
  })
  return getContract({
    address,
    abi: pbtAbi,
    client,
  });
}

