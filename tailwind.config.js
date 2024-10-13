/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
    extend: {
      colors: {
        primary: '#4a90e2',  // 落ち着いたブルー
        background: '#333333',  // ダーク背景
        text: '#e0e0e0',  // 落ち着いたテキスト色
        accent: '#ffcc00',  // アクセントカラー
      },
    },
  },

	plugins: [require('@tailwindcss/typography')]
};
