<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';

	let { children } = $props();
	let theme = $state('system');

	onMount(() => {
		theme = localStorage.getItem('theme') || 'system';
		applyTheme(theme);
	});

	function applyTheme(newTheme: string) {
		theme = newTheme;
		if (newTheme === 'system') {
			localStorage.removeItem('theme');
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';
			document.documentElement.setAttribute('data-theme', systemTheme);
		} else {
			localStorage.setItem('theme', newTheme);
			document.documentElement.setAttribute('data-theme', newTheme);
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-base-100 text-base-content">
	<div class="navbar bg-base-100 shadow-sm">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost text-xl">Home Page Server</a>
		</div>
		<div class="flex-none">
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-ghost m-1">
					Theme
					<svg
						width="12px"
						height="12px"
						class="h-2 w-2 fill-current opacity-60 inline-block"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 2048 2048"
						><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg
					>
				</div>
				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<ul
					tabindex="0"
					class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li><button onclick={() => applyTheme('light')} class:active={theme === 'light'}>Light</button></li>
					<li><button onclick={() => applyTheme('dark')} class:active={theme === 'dark'}>Dark</button></li>
					<li><button onclick={() => applyTheme('system')} class:active={theme === 'system'}>System</button></li>
				</ul>
			</div>
		</div>
	</div>

	<main class="p-4">
		{@render children()}
	</main>
</div>
