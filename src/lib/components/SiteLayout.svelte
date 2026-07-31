<script>
	let { children, backHref = undefined, backLabel = undefined } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="min-h-screen bg-[#0b1220] text-[#e8e6de]" style="font-family: 'Inter', sans-serif;">
	<header class="border-b border-[#1f2a42]">
		{#if backHref}
			<div class="mx-auto max-w-6xl px-6 py-5">
				<a href={backHref} class="text-xs tracking-widest text-[#c9a659] hover:underline">
					← {backLabel}
				</a>
			</div>
		{:else}
			<div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
				<a href="/" class="flex items-center gap-2">
					<span
						class="flex h-8 w-8 items-center justify-center border border-[#c9a659] text-sm text-[#c9a659]"
						style="font-family: 'Playfair Display', serif;"
					>
						C
					</span>
					<div class="leading-tight">
						<div class="text-base" style="font-family: 'Playfair Display', serif;">Chronicle</div>
						<div class="text-[10px] tracking-widest text-[#6b7590]">EST. MMXXVI</div>
					</div>
				</a>
				<nav class="hidden gap-8 text-sm text-[#a9b0c3] sm:flex">
					<a href="/" class="hover:text-[#e8e6de]">Essays</a>
					<a href="/" class="hover:text-[#e8e6de]">Categories</a>
					<a href="/" class="hover:text-[#e8e6de]">Archive</a>
					<a href="/" class="hover:text-[#e8e6de]">About</a>
				</nav>
				<a
					href="https://www.youtube.com/@GrandAndCalm"
					target="_blank"
					rel="noopener noreferrer"
					class="border border-[#c9a659] px-4 py-2 text-xs tracking-widest text-[#c9a659] transition-colors hover:bg-[#c9a659] hover:text-[#0b1220]"
				>
					SUBSCRIBE
				</a>
			</div>
		{/if}
	</header>

	{@render children()}

	<footer class="border-t border-[#1f2a42] px-6 py-6 text-center text-[10px] text-[#6b7590]">
		© Grand and Calm. All rights reserved.
	</footer>
</div>
