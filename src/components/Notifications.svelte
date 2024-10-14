<script>
  import { Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider, Tooltip } from 'flowbite-svelte';
  import { Badge } from 'flowbite-svelte';
  import { Modal } from 'flowbite-svelte';
  import { BellOutline, HeartOutline, UserAddOutline, ArrowsRepeatOutline } from 'flowbite-svelte-icons';

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
            <!-- <p class="text-md font-normal">{textByReason(notification)}</p> -->
            {#if notification.reason === 'like'}
              <HeartOutline size="lg" />
            {:else if notification.reason === 'repost'}
              <ArrowsRepeatOutline size="lg" />
            {:else if notification.reason === 'follow'}
              <UserAddOutline size="lg" />
            {:else}
              <p class="text-md font-normal">{notification.record.text}</p>
            {/if}
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
        <div class="flex-col mt-2 ml-12 pl-2 border-l-2 border-gray-300">
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
