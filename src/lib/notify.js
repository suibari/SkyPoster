import { PUBLIC_VAPID_KEY, PUBLIC_NODE_ENV } from '$env/static/public';
const workerPath = (PUBLIC_NODE_ENV === 'development') ? './src/service-worker.js' : '/service-worker.js';

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

export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(workerPath).then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, err => {
        console.error('ServiceWorker registration failed:', err);
      });
    });
  }
}

export async function registerPushNotifications() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      // 既存のService Workerを取得
      const registration = await navigator.serviceWorker.getRegistration();

      if (!registration) {
        console.error('ServiceWorker is not registered yet');
        return;
      }

      // Push通知のサブスクリプションを作成
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY), // VAPIDの公開鍵
      });

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
