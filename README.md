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