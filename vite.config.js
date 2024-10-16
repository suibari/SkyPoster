import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	plugins: [
		sveltekit(),
		viteStaticCopy({
      targets: [
        {
          src: 'src/service-worker.js',
          dest: ''
        }
      ]
    }),
	],
	server: {
		host: true,
		port: 7860,
	}
});
