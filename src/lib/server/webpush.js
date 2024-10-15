import { PRIVATE_VAPID_KEY } from '$env/static/private';
import { PUBLIC_VAPID_KEY } from '$env/static/public';
import webpush from 'web-push';
import { supabase } from './storage';

webpush.setVapidDetails(
  'mailto:you@example.com',
  PUBLIC_VAPID_KEY,
  PRIVATE_VAPID_KEY
);

/**
 * Web Push通知を送信する関数
 * @param {Object} subscription - ユーザーのサブスクリプション情報
 * @param {Object} payload - 通知の内容 (title, body, icon など)
 */
export async function sendWebPushNotification(subscription, payload) {
  try {
    // Web Push通知を送信
    await webpush.sendNotification(subscription, JSON.stringify(payload));
    console.log('Web Push notification sent successfully.');
  } catch (error) {
    console.error('Error sending Web Push notification:', error);
    throw error; // エラーハンドリング
  }
}

export async function removeSubscriptionFromDatabase(did) {
  try {
    const {data, error} = await supabase.from('subscriptions').delete().eq('key', did).select();
    if (error) {
      throw error;
    }
    console.log(`Subscription removed: ${did}`);
  } catch (error) {
    console.error('Failed to remove subscription from database:', error);
  }
}
