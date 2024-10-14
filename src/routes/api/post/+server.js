import { OAuthAgent } from "$lib/server/bluesky";

export async function POST({ request, locals }) {
  const session = locals.session;
  
  if (!session || !session.tokenSet.sub) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { text } = await request.json();
  const did = session.tokenSet.sub;

  try {
    const agent = new OAuthAgent(session.tokenSet.sub);
    await agent.init();
    await agent.post(text);

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}
