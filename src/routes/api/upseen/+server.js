import { OAuthAgent } from "$lib/server/bluesky";

export async function POST({ locals }) {
  const session = locals.session;
  
  if (!session || !session.tokenSet.sub) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const did = session.tokenSet.sub;

  try {
    const agent = new OAuthAgent(did);
    await agent.init();
    await agent.updateSeen();

    return new Response(JSON.stringify({ success: true, data }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}
