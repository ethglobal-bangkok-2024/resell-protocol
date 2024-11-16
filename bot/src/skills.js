import { handler as help } from './handler/help.js';
import { handler as timeline } from './handler/timeline.js';
import { handler as createOffer } from './handler/create-offer.js';
import { handler as cancelOffer } from './handler/cancel-offer.js';
import { handler as popOffer } from './handler/pop-offer.js';
import { handler as updateStatus } from './handler/update-status.js';

export const skills = [
  {
    name: 'Group bot',
    tag: '@bot',
    description: 'Group agent for tipping and transactions.',
    skills: [
      {
        skill: '/help',
        examples: ['/help'],
        handler: help,
        description: 'Get help with the bot.',
        params: {},
      },
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
        skill: '/offer',
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
      {
        skill: '/answer',
        examples: ['/pop 04EA'],
        handler: popOffer,
        description: 'Accept or deny a pending offer (owner only).',
        params: {
          chip: {
            default: '',
            type: 'string',
          },
        },
      },
      {
        skill: '/update',
        examples: ['/update 04EA status'],
        handler: updateStatus,
        description: 'Update a product status (owner only).',
        params: {
          chip: {
            default: '',
            type: 'string',
          },
          status: {
            default: '',
            type: 'string',
          },
        },
      },
    ],
  },
];
