<script context="module" lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ fetch }) => {
		let a = await fetch('/__data.json');
		let body = await a.json();
		return {
            props: body
        };
	};
</script>

<button
	on:click={() => {
		const origin = $page.url.origin;
		const url = new URL(`${origin}/__data.json`);
		invalidate(url.href);
	}}
>
	Reload</button
>
