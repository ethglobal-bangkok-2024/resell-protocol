/**
 *
 * @param {import('@xmtp/message-kit').HandlerContext} context
 */
export async function handler(context) {
  const { skills } = context;
  const intro =
    'Welcome to the Resell Protocol bot! Available commands:\n' +
    skills
      ?.flatMap((app) => app.skills)
      .map((skill) => `${skill.skill} - ${skill.description}`)
      .join('\n');
  await context.send(intro);
}
