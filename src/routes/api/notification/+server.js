import { OAuthAgent } from "$lib/server/bluesky";
import { sendWebPushNotification, removeSubscriptionFromDatabase } from "$lib/server/webpush";
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
    if (unread > 0) {
      const {data, error} = await supabase.from('subscriptions').select('subscription').eq('key', did);
      if (error) {
        throw error;
      }
      const subscription = data[0].subscription;
      const payload = {
        title: "title",
        body: "body",
        icon: "/favicon.png"
      };
      await sendWebPushNotification(subscription, payload)
        .catch(async error => {
          if (error.statusCode === 410 || error.statusCode === 404) {
            console.log(`Subscription has unsubscribed or expired, removing from database: ${did}`);
            await removeSubscriptionFromDatabase(did);
          }
        });
    }

    return new Response(JSON.stringify({ success: true, data }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}
