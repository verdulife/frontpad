<script>
	import Frame from '$lib/components/Frame.svelte';
	import Layout from '$lib/components/Layout.svelte';
</script>

<main class="viewport jcenter">
	<Frame screen="left" />
	<ydiv />
	<Frame screen="right" />

	<Layout />
</main>

<style lang="scss">
	main {
		background: var(--color-bg);
	}

	ydiv {
		background: #000;
	}
</style>
