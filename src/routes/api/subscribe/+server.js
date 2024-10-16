import { supabase } from "$lib/server/storage";

export const POST = async ({ request, locals }) => {
  const session = locals.session;
  
  if (!session || !session.tokenSet.sub) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const did = session.tokenSet.sub;
  const subscription = await request.json();

  // サブスクリプション情報をデータベースに保存
  const { data, error } = await supabase
    .from('subscriptions') // サブスクリプションテーブルを指定
    .upsert({
      endpoint: subscription.endpoint,
      key: did,
      subscription: subscription,
    });

  if (error) {
    return new Response('Failed to save subscription', { status: 500 });
  }

  return new Response('Subscription received', { status: 201 });
};
