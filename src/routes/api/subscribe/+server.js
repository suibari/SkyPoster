import { supabase } from "$lib/server/storage";

export const POST = async ({ request }) => {
  const subscription = await request.json();

  // サブスクリプション情報をデータベースに保存
  const { data, error } = await supabase
    .from('subscriptions') // サブスクリプションテーブルを指定
    .insert({
      endpoint: subscription.endpoint,
      subscription: subscription,
    });

  if (error) {
    return new Response('Failed to save subscription', { status: 500 });
  }

  return new Response('Subscription received', { status: 201 });
};
