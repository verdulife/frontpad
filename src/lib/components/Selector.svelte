<script>
	import { desktopList, tabletList, mobileList } from '$lib/devices';
	import RotateIcon from '$lib/icons/Rotate.svelte';
</script>

<nav class="row jbetween acenter">
	<select class="grow">
		<optgroup label="Desktop">
			{#each desktopList as device, i}
				<option value={i}>{device.name} ({device.size.width}x{device.size.height})</option>
			{/each}
		</optgroup>

		<optgroup label="Tablet">
			{#each tabletList as device, i}
				<option value={i}>{device.name} ({device.size.width}x{device.size.height})</option>
			{/each}
		</optgroup>

		<optgroup label="Mobile">
			{#each mobileList as device, i}
				<option value={i}>{device.name} ({device.size.width}x{device.size.height})</option>
			{/each}
		</optgroup>
	</select>

	<button class="col fcenter">
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
			font-weight: bold;
			padding: 10px 40px 10px 20px;

			optgroup,
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
