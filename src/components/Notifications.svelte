<script>
  import { browser } from "$app/environment";
  import { Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider, Tooltip } from 'flowbite-svelte';
  import { Badge, Indicator  } from 'flowbite-svelte';
  import { Modal } from 'flowbite-svelte';
  import { BellOutline, HeartOutline, UserAddOutline, ArrowsRepeatOutline } from 'flowbite-svelte-icons';
	import { onMount } from "svelte";
  import { registerPushNotifications } from '$lib/notify';

  let showNotifications = false;
  let notifications = [];

  onMount(() => {
    registerPushNotifications();
  });

  async function handleNotifications(showModal) {
    try {
      if (browser) { // レンダリング後に相対URLにfetchするにはこうするのが必要みたい
        const response = await fetch('/api/notification');
        const result = await response.json();

        if (response.ok) {
          showNotifications = showModal || showNotifications; // 引数指定がなければ現在のモーダル状態を維持
          notifications = result.data.notifications;
        }
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  }

  // 定期的に通知を取得する
  setInterval(handleNotifications, 60000); // 1分ごとに通知を取得
</script>

<div class="relative">
  <BellOutline size="lg" withEvents="true" on:click={async () => await handleNotifications(true)} />
  {#if notifications.filter(item => !item.isRead).length > 0}
    <span class="sr-only">Notifications</span>
    <Indicator color="red" border size="xl" placement="top-right" class="text-xs font-bold">
      {notifications.filter(item => !item.isRead).length}
    </Indicator>
  {/if}
</div>

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
      {#if notification.parent}
        <div class="flex-col mt-2 ml-12 pl-2 border-l-2 border-gray-300">
          <p class="text-md font-normal">{notification.parent.record.text}</p>
          <p class="text-xs font-normal mt-1">{new Date(notification.parent.record.createdAt).toLocaleString('ja-JP', {
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
