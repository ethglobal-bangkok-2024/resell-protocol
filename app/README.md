<<<<<<< HEAD
# 🏗 Scaffold-ETH 2

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/b237af0c-5027-4849-a5c1-2e31495cccb1)

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.18)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Install dependencies if it was skipped in CLI:

```
cd my-dapp-example
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `packages/hardhat/hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contracts in `packages/hardhat/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/hardhat/deploy`


## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
=======
## Resell Protocol

Secondhand goods trading protocol leveraging the power of PBTs, HaLo Chips,  and Conversational UI.

## Concept

This project is a protocol that allow participants to trade secondhand physical goods seamlessly and securely. 

We realize that a lot of people can try to get an advantage over others in an unfair way when selling secondhand goods to others, such as lying about the date of production, the item condition, or even the authenticity of the item. This is where the idea of Resell Protocol was born.

Resell protocol allows you to have clear and transparent information about the item you are about to purchase. All the hands these goods went to, you will have records of them, whether in the form of pictures or text. The protocol also facilitates seamless trading experience using conversational UI. So that you can easily bargain and haggle without having to do too much context switching. Fund management and bidding are also done through our smart contracts, to ensure that no scams are happening.

## Live demo

Check [here](https://resell-eight.vercel.app/?chainId=84532&chipId=3&address=0xe8926727Bd7e99042D7c415eA64962A9AD3E82B3).

## Implementation details

- The core of this project are the Arx HaLo ships, which are powerful mark of representation of physical goods on chain. 
- We created PBT tokens (ERC-5791) that are linked to these HaLo chips to easily perform state updates to the good in hand. 
- We've extended PBT with our custom functions for trading between secondhand owners of the goods.
- State updates are recorded as Sign Protocol attestations for ease of reading and decoding.
- Our UI layer consists of Converse by XMTP and mini web apps that interact with other to create a seamless trading experience. 
- We utilize Curgvegrid MultiBaas' Webhooks for tracking PBT events on chain and notify buyer about new offers, and track purchases in form of attestations.

Smart contracts:
- Base Sepolia: `0xe8926727Bd7e99042D7c415eA64962A9AD3E82B3`
>>>>>>> eb076bcd1bee861b68b6683757d67b1e64f3d933
