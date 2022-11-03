<script>
	import { browser } from '$app/environment';
	import { customURL, frameSelection } from '$lib/stores';
	import { deviceList } from '$lib/devices';
	import Selector from '$lib/components/Selector.svelte';
	import Scale from '$lib/components/Scale.svelte';

	export let screen;
	$: xRatio = 1;

	$: side = $frameSelection[screen];
	$: size = deviceList[side].size;
	$: title = deviceList[side].name;

	const isPort = !isNaN(Number($customURL));
	$: src = isPort ? `http://localhost:${$customURL}` : `http://${$customURL}`;

	$: leftSide = $frameSelection.left;
	$: rightSide = $frameSelection.right;
	$: leftSideWidth = deviceList[leftSide].size.width;
	$: rightSideWidth = deviceList[rightSide].size.width;
	$: bothBiger = false;

	$: if (browser && $frameSelection) {
		const wW = window.innerWidth;
		const bothSidesBigerThanHalf = leftSideWidth > wW / 2 && rightSideWidth > wW / 2;

		bothBiger = bothSidesBigerThanHalf;

		const el = document.querySelector(`#${screen}`);

		setTimeout(() => {
			console.log(el, el.clientWidth);
			xRatio = el.clientWidth / size.width;

			console.log(xRatio);
		});
	}
</script>

<section id={screen} class="col fcenter grow yfill" class:both-big={bothBiger}>
	<Selector {screen} />

	<div class="outer-frame col fcenter" width={size.width} height={size.height}>
		<iframe
			{src}
			width={size.width}
			height={size.height}
			{title}
			style="transform: scale({xRatio < 1 ? xRatio : 1})"
		/>
	</div>

	<Scale />
</section>

<style lang="scss">
	section {
		position: relative;
		max-width: 60%;
		width: auto;
	}

	.both-big {
		max-width: 50%;
	}

	iframe {
		background: #000;
	}
</style>
