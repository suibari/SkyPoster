<script>
  // 必要な変数などは後ほど追加
</script>

<div class="flex justify-center items-center h-screen">
  <div class="w-2/3 bg-gray-500 p-6 rounded-lg shadow-lg relative">
    
    <!-- プロフィールアイコン -->
    <div class="absolute top-4 left-4">
      <img src="/path/to/profile-icon.png" alt="Profile Icon" class="w-10 h-10 rounded-full">
    </div>
    
    <!-- メンション表示ボタン＆設定ボタン -->
    <div class="absolute top-4 right-4 space-x-2">
      <button class="bg-blue-500 text-white py-1 px-3 rounded">メンション</button>
      <button class="bg-gray-300 text-black py-1 px-3 rounded">設定</button>
    </div>

    <!-- テキストフィールド -->
    <textarea class="w-full h-40 p-4 rounded-lg border border-gray-300" placeholder="何を考えていますか？"></textarea>

    <!-- 画像添付＆投稿ボタン -->
    <div class="flex justify-between mt-4">
      <button class="bg-gray-200 text-black py-2 px-4 rounded-lg">画像添付</button>
      <button class="bg-blue-500 text-white py-2 px-4 rounded-lg">ポスト</button>
    </div>
  </div>
</div>

<style>
  /* カスタムスタイルが必要ならここに追加 */
</style>
