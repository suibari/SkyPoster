import { getProfile } from "$lib/server/bluesky";

export async function GET({ locals }) {
  const session = locals.session;
  
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const data = await getProfile(session.tokenSet.sub);

    return new Response(JSON.stringify({ success: true, data }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}
