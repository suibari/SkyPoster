import { postWithOAuth } from "../../../lib/server/bluesky";

export async function POST({ request, locals }) {
  const session = locals.session;
  
  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  
  const { text } = await request.json();

  try {
    await postWithOAuth(text);

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}
