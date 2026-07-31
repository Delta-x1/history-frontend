<script>
	import { env } from '$env/dynamic/public';
	import SiteLayout from '$lib/components/SiteLayout.svelte';
	let { data } = $props();

	const strapiPublicUrl = env.PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

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
	<header class="border-b border-[#1f2a42]">
		<div class="mx-auto max-w-3xl px-6 py-5">
			{#if data.article.category}
				<a href="/categories/{data.article.category.slug}" class="text-xs tracking-widest text-[#c9a659] hover:underline">
					← {data.article.category.name.toUpperCase()}
				</a>
			{:else}
				<a href="/" class="text-xs tracking-widest text-[#c9a659] hover:underline">← HOME</a>
			{/if}
		</div>
	</header>

	{#if data.article.image}
			<div
				class="h-80 w-full bg-cover bg-center"
				style="background-image: url('{strapiPublicUrl}{data.article.image.url}');"
			></div>
		{/if}
	<article class="mx-auto max-w-3xl px-6 py-16">
		<h1 class="mb-4 text-4xl leading-tight" style="font-family: 'Playfair Display', serif;">
			{data.article.title}
		</h1>
		<p class="mb-10 text-xs text-[#6b7590]">{formatDate(data.article.publishedAt)}</p>

		<div class="prose prose-invert max-w-none text-[#d3d6e0] leading-relaxed">
			{@html data.article.content}
		</div>
	</article>
</div>