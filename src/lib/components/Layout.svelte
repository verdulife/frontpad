<script>
	import { UserStore } from '$lib/stores';
</script>

<select bind:value={$UserStore.layout}>
	<option value="mobileFirst">Mobile first</option>
	<option value="Equal">Equal</option>
	<option value="desktopFirst">Desktop first</option>
</select>

<style lang="scss">
	select {
		position: absolute;
		bottom: 0;
		height: 40px;
		background: var(--color-pri);
		color: var(--color-sec);
		border: 1px solid var(--color-border);
		border-bottom: none;
		border-radius: 10px 10px 0 0;
		z-index: 1;
	}
</style>
