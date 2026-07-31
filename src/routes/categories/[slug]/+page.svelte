<script>
	import { env } from '$env/dynamic/public';
	import SiteLayout from '$lib/components/SiteLayout.svelte';

	let { data } = $props();

	const strapiPublicUrl = env.PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

	let searchQuery = $state('');

	let filteredArticles = $derived(
		data.articles.filter((a) =>
			a.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
		)
	);

	function excerpt(html, len = 130) {
		const text = (html ?? '').replace(/<[^>]*>/g, '');
		return text.length > len ? text.slice(0, len).trim() + '…' : text;
	}

	function formatDate(d) {
		if (!d) return '';
		return new Date(d).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
	}
</script>

<SiteLayout backHref="/" backLabel="ALL CATEGORIES">
	<section class="mx-auto max-w-4xl px-6 py-16">
		<p class="mb-1 text-xs tracking-widest text-[#6b7590]">§ CATEGORY</p>
		<h1 class="mb-6 text-4xl" style="font-family: 'Playfair Display', serif;">{data.category.name}</h1>

		{#if data.category.background}
			<div
				class="mb-8 h-130 w-full rounded-xl bg-cover bg-center"
				style="background-image: url('{strapiPublicUrl}{data.category.background.url}');"
			></div>
		{/if}

		{#if data.articles.length > 0}
			<div class="mb-10 flex items-center border border-[#2a3450] bg-[#0f1729] px-4 py-3">
				<input
					type="text"
					placeholder="Search articles in this category…"
					bind:value={searchQuery}
					class="w-full bg-transparent text-sm text-[#e8e6de] placeholder-[#5c6480] focus:outline-none"
				/>
				<span class="text-xs tracking-widest text-[#c9a659]">SEARCH</span>
			</div>
		{/if}

		{#if data.articles.length === 0}
			<p class="text-sm text-[#6b7590]">No articles in this category yet.</p>
		{:else if filteredArticles.length === 0}
			<p class="text-sm text-[#6b7590]">No articles match "{searchQuery}".</p>
		{:else}
			<div class="divide-y divide-[#1f2a42] border-t border-[#1f2a42]">
				{#each filteredArticles as article}
					<a href="/articles/{article.slug}" class="group block py-6">
						<h2 class="mb-2 text-xl leading-snug group-hover:underline" style="font-family: 'Playfair Display', serif;">
							{article.title}
						</h2>
						<p class="mb-3 text-sm leading-relaxed text-[#a9b0c3]">{excerpt(article.content)}</p>
						<span class="text-[10px] text-[#6b7590]">{formatDate(article.publishedAt)}</span>
					</a>
				{/each}
			</div>
		{/if}
	</section>
</SiteLayout>