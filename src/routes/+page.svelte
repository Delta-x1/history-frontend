<script>
	import { env } from '$env/dynamic/public';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { data } = $props();

	const strapiPublicUrl = env.PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

	let searchQuery = $state('');

	let filteredCategories = $derived(
		data.categories.filter((c) =>
			c.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
		)
	);

	function excerpt(html, len = 130) {
		const text = (html ?? '').replace(/<[^>]*>/g, '');
		return text.length > len ? text.slice(0, len).trim() + '…' : text;
	}

	function readMins(html) {
		const words = (html ?? '').replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
		return Math.max(1, Math.round(words / 200));
	}

	function formatDate(d) {
		if (!d) return '';
		return new Date(d).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen bg-[#0b1220] text-[#e8e6de]" style="font-family: 'Inter', sans-serif;">

	<!-- Header -->
	<Header />

	<!-- Hero -->
	<section class="mx-auto max-w-3xl px-6 py-24 text-center">
		<p class="mb-4 text-xs tracking-[0.3em] text-[#c9a659]">— A WORLD HISTORY JOURNAL —</p>
		<h1 class="mb-6 text-4xl leading-tight sm:text-5xl" style="font-family: 'Playfair Display', serif;">
			The world, <span class="text-[#c9a659] italic">retold</span><br />
			one century at a time.
		</h1>
		<p class="mx-auto mb-8 max-w-xl text-sm text-[#a9b0c3]">
			Long-form essays on the empires, revolutions, and everyday lives that shaped human history.
		</p>
		<div class="mx-auto flex max-w-md items-center border border-[#2a3450] bg-[#0f1729] px-4 py-3">
			<input
				type="text"
				placeholder="Search categories — try 'Vietnam' or 'China'"
				bind:value={searchQuery}
				class="w-full bg-transparent text-sm text-[#e8e6de] placeholder-[#5c6480] focus:outline-none"
			/>
			<span class="text-xs tracking-widest text-[#c9a659]">SEARCH</span>
		</div>
	</section>

	<!-- Browse by category -->
	<section class="mx-auto max-w-6xl px-6 py-16">
		<p class="mb-1 text-xs tracking-widest text-[#6b7590]">§ 01 — ATLAS</p>
		<h2 class="mb-8 text-2xl" style="font-family: 'Playfair Display', serif;">Browse by category (<span>{filteredCategories.length}</span>)</h2>

		{#if data.categories.length === 0}
			<p class="text-sm text-[#6b7590]">No categories yet. Create one in Strapi admin.</p>
		{:else if filteredCategories.length === 0}
			<p class="text-sm text-[#6b7590]">No categories match "{searchQuery}".</p>
		{:else}
			<div class="flex flex-wrap gap-3">
				{#each filteredCategories as category}
					<a href="/categories/{category.slug}" class="group flex w-20 flex-col items-center gap-2 text-center">
						<span class="h-14 w-14 overflow-hidden flex items-center justify-center rounded-full border border-[#2a3450] transition-colors group-hover:border-[#c9a659]">
							{#if category.image}
								<img src="{strapiPublicUrl}{category.image.url}" alt={category.name} class="h-5 w-8 object-cover" />
							{:else}
								<span class="flex h-full w-full items-center justify-center bg-[#1a2338] text-[#6b7590]">?</span>
							{/if}
						</span>
						<span class="text-xs text-[#e8e6de]">{category.name}</span>
					</a>
				{/each}
			</div>
		{/if}
	</section>

	<!-- Recent essays -->
	<section class="mx-auto max-w-6xl px-6 py-16">
		<div class="mb-8 flex items-end justify-between">
			<div>
				<p class="mb-1 text-xs tracking-widest text-[#6b7590]">§ 02 — DISPATCHES</p>
				<h2 class="text-2xl" style="font-family: 'Playfair Display', serif;">Recent essays</h2>
			</div>
			<a href="/" class="text-xs text-[#c9a659] hover:underline">The archive →</a>
		</div>

		{#if data.articles.length === 0}
			<p class="text-sm text-[#6b7590]">No articles yet. Create one in Strapi admin.</p>
		{:else}
			<div class="grid gap-px overflow-hidden border border-[#1f2a42] bg-[#1f2a42] sm:grid-cols-3">
				{#each data.articles as article}
					<a href="/articles/{article.slug}" class="group bg-[#0b1220] p-6 transition-colors hover:bg-[#0f1729]">
						{#if article.category}
							<p class="mb-3 text-[10px] tracking-widest text-[#c9a659]">{article.category.name.toUpperCase()}</p>
						{/if}
						<h3 class="mb-2 text-lg leading-snug group-hover:underline" style="font-family: 'Playfair Display', serif;">
							{article.title}
						</h3>
						<p class="mb-4 text-xs leading-relaxed text-[#a9b0c3]">{excerpt(article.content)}</p>
						<div class="flex items-center gap-3 text-[10px] text-[#6b7590]">
							<span>{formatDate(article.publishedAt)}</span>
							<span>·</span>
							<span>{readMins(article.content)} MIN</span>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</section>

	<!-- Footer -->
	<Footer />
</div>