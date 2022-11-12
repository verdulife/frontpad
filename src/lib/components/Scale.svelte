<script>
	import { scaleFactor, UserStore } from '$lib/stores';
	import ExpandIcon from '$lib/icons/Expand.svelte';

	export let screen;

	$: percentage = $scaleFactor[screen] * 100;
	$: rounded = percentage > 100 ? 100 : percentage.toFixed(2);

	function togBrowser() {
		$UserStore.browserSimulation = !$UserStore.browserSimulation;
	}
</script>

<nav class="row jbetween acenter">
	<p>Scaled to {rounded}%</p>

	<button class="col fcenter" title="Pop up view" on:click={togBrowser}>
		<ExpandIcon width="12" height="12" fill="#aaa" />
	</button>
</nav>

<style lang="scss">
	nav {
		position: absolute;
		bottom: 0;
		height: 40px;
		background: var(--color-pri);
		border: 1px solid var(--color-border);
		border-bottom: none;
		border-radius: 10px 10px 0 0;
		z-index: 1;

		p {
			color: var(--color-sec);
			font-weight: bold;
			font-size: 12px;
			padding: 10px 40px 10px 20px;
		}

		button {
			width: 40px;
			height: 100%;
			box-shadow: -1px 0 0 var(--color-border);
			padding: 0;
		}
	}
</style>
