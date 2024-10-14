<script>
  import { Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider, Tooltip } from 'flowbite-svelte';
  import { Badge } from 'flowbite-svelte';
  import { Modal } from 'flowbite-svelte';
  import { BellOutline } from 'flowbite-svelte-icons';

  let showNotifications = false;
  let notifications = [];

  async function handleNotifications() {
    try {
      const response = await fetch('/api/notification'); // APIエンドポイントにリクエスト
      const result = await response.json(); // 結果をJSONとしてパース

      if (response.ok) {
        showNotifications = true;
        notifications = result.data.notifications;
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  }

  function textByReason(notification) {
    switch (notification.reason) {
      case 'like':
        return "あなたに いいね しました!";
      case 'repost':
        return "あなたのポストを リポスト しました!";
      case 'follow':
        return "あなたを フォロー しました!";
      case 'mention':
        console.log(notification.record);
        return notification.record.text;
      case 'reply':
        console.log(notification.record);
        return notification.record.text;
      case 'quote':
        console.log(notification.record);
        return notification.record.text;
      default:
        break;
    }
  }
</script>

<BellOutline size="lg" withEvents="true" on:click={handleNotifications} />

<Modal title="Notifications" bind:open={showNotifications} autoclose>
  {#each notifications as notification, i}
    <div class="flex-col">
      <div class="flex items-center">
        <Avatar src={notification.author.avatar} />
        <div class="flex-col ml-2">
          <p class="text-sm">{notification.author.displayName}</p>
          <div class="flex">
            <p class="text-md font-normal">{textByReason(notification)}</p>
            {#if !notification.isRead}
              <Badge color="red" class="ml-2">New!</Badge>
            {/if}
          </div>
          <p class="text-xs font-normal mt-1">{new Date(notification.indexedAt).toLocaleString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          })}</p>
        </div>
      </div>
      <!-- 返信元、引用元 -->
      {#if notification.record.parent}
        <div class="flex-col ml-12">
          <p class="text-md font-normal">{notification.record.parent.value.text}</p>
          <p class="text-xs font-normal mt-1">{new Date(notification.record.parent.value.createdAt).toLocaleString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          })}</p>
        </div>
      {/if}
    </div>
  {/each}
</Modal>
