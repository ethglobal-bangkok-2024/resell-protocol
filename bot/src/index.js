import { run } from '@xmtp/message-kit';
// import { textGeneration, processMultilineResponse } from "@xmtp/message-kit";
// import { agent_prompt } from "./prompt.js";
import { skills } from './skills.js';

run(
  async (context) => {
    const {
      message: {
        content: { text, params },
        sender,
      },
    } = context;
    try {
      await context.send(`GM! Enter "/help" to start`);
    } catch (error) {
      console.error('Error during OpenAI call:', error);
      await context.send('An error occurred while processing your request.');
    }
  },
  { skills }
);
