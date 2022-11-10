<script>
	import { deviceList } from '$lib/devices';
	import { rotate } from '$lib/actions';
	import { frameSelection, UserStore } from '$lib/stores';
	import RotateIcon from '$lib/icons/Rotate.svelte';

	export let screen;

	$frameSelection[screen] = $UserStore.defaultDevice[screen];

	function updateDefault() {
		$UserStore.defaultDevice[screen] = $frameSelection[screen];
	}

	$: $frameSelection[screen], updateDefault();
</script>

<nav class="row jbetween acenter">
	<select class="grow" bind:value={$frameSelection[screen]}>
		{#each deviceList as device, i}
			<option value={i}>{device.name} ({device.size.width}x{device.size.height})</option>
		{/each}
	</select>

	<button class="col fcenter" on:click={() => rotate(screen)}>
		<RotateIcon width="16" height="16" fill="#aaa" />
	</button>
</nav>

<style lang="scss">
	nav {
		position: absolute;
		top: 0;
		height: 40px;
		background: var(--color-pri);
		border: 1px solid var(--color-border);
		border-top: none;
		border-radius: 0 0 10px 10px;
		z-index: 1;

		select {
			cursor: pointer;
			color: var(--color-sec);
			font-family: var(--font-text);
			font-weight: bold;
			padding: 10px 40px 10px 20px;

			option {
				background: #000;
				color: var(--color-sec);
			}
		}

		button {
			width: 40px;
			height: 100%;
			box-shadow: -1px 0 0 var(--color-border);
			padding: 0;
		}
	}
</style>
