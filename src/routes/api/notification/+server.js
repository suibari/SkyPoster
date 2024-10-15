import { OAuthAgent } from "$lib/server/bluesky";
import { sendWebPushNotification } from "$lib/server/webpush";
import { supabase } from "$lib/server/storage";

export async function GET({ locals }) {
  const session = locals.session;
  
  if (!session || !session.tokenSet.sub) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const did = session.tokenSet.sub;

  try {
    const agent = new OAuthAgent(did);
    await agent.init();
    const data = await agent.listNotifications();

    // 未読があったらwebpush通知
    const unread = data.notifications.filter(notify => !notify.isRead).length;
    if (1) {
      const {data, error} = await supabase.from('subscriptions').select('subscription').eq('key', did);
      if (error) {
        throw error;
      }
      const subscription = data[0].subscription;
      const payload = "test";
      await sendWebPushNotification(subscription, payload)
        .catch(error => {
          if (error.statusCode === 410 || error.statusCode === 404) {
            // Subscription has expired or is no longer valid
            console.log('Subscription has unsubscribed or expired, removing from database');
            // removeSubscriptionFromDatabase(subscription);
          }
        });
    }

    return new Response(JSON.stringify({ success: true, data }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}
