import { PUBLIC_VAPID_KEY } from '$env/static/public';

export function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function registerPushNotifications() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      // Service Worker を登録
      const register = await navigator.serviceWorker.register('./src/service-worker.js');
      
      // Push通知のサブスクリプションを作成
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY), // VAPIDの公開鍵
      });
      console.log(subscription)

      // サーバーにサブスクリプション情報を送信
      await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Successfully subscribed to Push Notifications');
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
    }
  }
}
