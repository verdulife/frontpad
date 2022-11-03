<script>
	import { customURL } from '$lib/stores';
	import Selector from '$lib/components/Selector.svelte';
	import Scale from '$lib/components/Scale.svelte';

	export let title;

	console.log($customURL);
</script>

<section class="col fcenter grow yfill">
	<Selector />

	<div class="outer-frame col fcenter fill">
		<iframe src={$customURL} {title} />
	</div>

	<Scale />
</section>

<style lang="scss">
	section {
		position: relative;
	}

	iframe {
		width: 80%;
		height: 80%;
		background: #000;
	}
</style>
