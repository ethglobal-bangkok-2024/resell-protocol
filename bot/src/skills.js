import { handler as tipping } from './handler/tipping.js';
import { handler as payment } from './handler/payment.js';
// import { handler as games } from "./handler/game.js";
import { handler as help } from './handler/help.js';
import { handler as timeline } from './handler/timeline.js';
import { handler as createOffer } from './handler/create-offer.js';
import { handler as cancelOffer } from './handler/cancel-offer.js';

export const skills = [
  {
    name: 'Group bot',
    tag: '@bot',
    description: 'Group agent for tipping and transactions.',
    skills: [
      // {
      //   skill: "/tip [usernames] [amount] [token]",
      //   examples: ["/tip @vitalik 10 usdc"],
      //   description: "Tip users in a specified token.",
      //   handler: tipping,
      //   params: {
      //     username: {
      //       default: "",
      //       plural: true,
      //       type: "username",
      //     },
      //     amount: {
      //       default: 10,
      //       type: "number",
      //     },
      //     token: {
      //       default: "usdc",
      //       type: "string",
      //       values: ["eth", "dai", "usdc", "degen"],
      //     },
      //   },
      // },
      // {
      //   skill: "/pay [amount] [token] [username]",
      //   examples: ["/pay 10 usdc vitalik.eth", "/pay 1 @alix"],
      //   description:
      //     "Send a specified amount of a cryptocurrency to a destination address.",
      //   handler: payment,
      //   params: {
      //     amount: {
      //       default: 10,
      //       type: "number",
      //     },
      //     token: {
      //       default: "usdc",
      //       type: "string",
      //       values: ["eth", "dai", "usdc", "degen"], // Accepted tokens
      //     },
      //     username: {
      //       default: "",
      //       type: "username",
      //     },
      //   },
      // },
      // {
      //   skill: "/game [game]",
      //   handler: games,
      //   description: "Play a game.",
      //   examples: ["/game wordle", "/game slot", "/game help"],
      //   params: {
      //     game: {
      //       default: "",
      //       type: "string",
      //       values: ["wordle", "slot", "help"],
      //     },
      //   },
      // },
      {
        skill: '/help',
        examples: ['/help'],
        handler: help,
        description: 'Get help with the bot.',
        params: {},
      },
      // {
      //   skill: "/id",
      //   adminOnly: true,
      //   examples: ["/id"],
      //   handler: help,
      //   description: "Get the group ID.",
      //   params: {},
      // },
      {
        skill: '/timeline',
        examples: ['/timeline 04EA'],
        handler: timeline,
        description: 'View the product timeline.',
        params: {
          chip: {
            default: '',
            type: 'string',
          },
        },
      },
      {
        skill: '/create',
        examples: ['/create 04EA 10'],
        handler: createOffer,
        description: 'Create an offer for the product.',
        params: {
          chip: {
            default: '',
            type: 'string',
          },
          amount: {
            default: '',
            type: 'number',
          },
          token: {
            default: 'eth',
            type: 'string',
            values: ['eth'],
          },
        },
      },
      {
        skill: '/cancel',
        examples: ['/cancel 04EA'],
        handler: cancelOffer,
        description: 'Cancel a pending offer.',
        params: {
          chip: {
            default: '',
            type: 'string',
          },
        },
      },
    ],
  },
];
