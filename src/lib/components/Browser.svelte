<script>
	import { customURL } from '$lib/stores';
	import ReloadIcon from '$lib/icons/Reload.svelte';
</script>

<aside class="col xfill">
	<div class="tabs row acenter xfill">
		<div class="tab row acenter">
			<img class="contain" src="/favicon.svg" alt="favicon" />
			<p class="clamp">Page title</p>
		</div>
	</div>

	<div class="address-bar row acenter xfill">
		<ReloadIcon width="16" height="16" fill="#eee" />
		<div class="address row acenter grow">
			<input type="text" bind:value={$customURL} placeholder="iframe url" />
		</div>
	</div>
</aside>

<style lang="scss">
	aside {
		background: #000;
		border-radius: 8px 8px 0 0;
		padding-top: 6px;
		overflow: hidden;
	}

	.tabs {
		height: 34px;
		margin-bottom: -1px;
	}

	.tab {
		position: relative;
		min-width: 200px;
		max-width: calc(100% - 6px);
		height: 100%;
		gap: 10px;
		background: #353535;
		color: #fff;
		font-family: var(--font-system);
		font-size: 13px;
		border-radius: 8px 8px 0 0;
		margin-left: 6px;
		padding: 0 10px;

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: -16px;
			width: 16px;
			height: 16px;
			display: flex;
			background: #000;
			border-radius: 50%;
			box-shadow: 8px 8px 0 0 #353535;
		}

		&::before {
			content: '';
			position: absolute;
			bottom: 0;
			right: -16px;
			width: 16px;
			height: 16px;
			display: flex;
			background: #000;
			border-radius: 50%;
			box-shadow: -8px 8px 0 0 #353535;
		}

		img {
			width: 16px;
			height: 16px;
		}
	}

	.address-bar {
		gap: 10px;
		background: #353535;
		padding: 6px 6px 7px 8px;
		z-index: 1;
	}

	.address {
		height: 26px;
		background: #232427;
		border-radius: 14px;
		padding: 0 8px;

		input {
			color: #fff;
			padding: 0;
		}
	}
</style>
