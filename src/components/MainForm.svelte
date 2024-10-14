<script>
  import { onMount } from 'svelte';
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
  import { FileCirclePlusOutline } from 'flowbite-svelte-icons';
  import { BellOutline, InfoCircleOutline } from 'flowbite-svelte-icons';
  import PostButton from "./PostButton.svelte";
	import Notifications from './Notifications.svelte';

  let text = "";
  let avatar = "/defaultavatar.png";

  onMount(async () => {
    try {
      const response = await fetch('/api/profile'); // APIエンドポイントにリクエスト
      const result = await response.json(); // 結果をJSONとしてパース

      if (response.ok) {
        avatar = result.data.avatar; // avatar プロパティにAPIの結果を設定
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  });
</script>

<div class="flex justify-center items-center h-screen">
  <div class="w-2/3 bg-gray-500 p-6 rounded-lg shadow-lg relative">
    <!-- テキストフィールド -->
    <textarea class="w-full h-40 p-4 rounded-lg border border-gray-300" placeholder="何を考えていますか？"  bind:value={text}></textarea>

    <!-- 画像添付＆投稿ボタン -->
    <div class="flex justify-between mt-4">
      <FileCirclePlusOutline class="w-8 h-8" />
      <PostButton {text} />
    </div>
  </div>
</div>

<Navbar class="fixed top-0 left-0 w-full bg-gray-500 text-white">
  <NavBrand>
    <img src={avatar} alt="Profile Icon" class="w-10 h-10 rounded-full" />
  </NavBrand>
  <NavHamburger />

  <NavUl nonActiveClass="text-white">
    <NavLi>
      <Notifications />
    </NavLi>
    <NavLi>
      <InfoCircleOutline class="w-6 h-6" />
    </NavLi>
  </NavUl>
</Navbar>
