<script>
	import { browser } from '$app/environment';
	import { customURL, frameSelection, scaleFactor, rotateDevice } from '$lib/stores';
	import { deviceList } from '$lib/devices';
	import Selector from '$lib/components/Selector.svelte';
	import Scale from '$lib/components/Scale.svelte';

	export let screen;

	$: side = $frameSelection[screen];
	$: size = deviceList[side].size;
	$: width = $rotateDevice[screen] ? size.height : size.width;
	$: height = $rotateDevice[screen] ? size.width : size.height;
	$: title = deviceList[side].name;

	const isPort = !isNaN(Number($customURL));
	$: src = isPort ? `http://localhost:${$customURL}` : `http://${$customURL}`;

	$: leftSide = $frameSelection.left;
	$: rightSide = $frameSelection.right;
	$: leftSideWidth = deviceList[leftSide].size.width;
	$: rightSideWidth = deviceList[rightSide].size.width;
	$: bothBiger = false;
	$: xRatio = xRatio < 1 ? xRatio : 1;
	$: yRatio = yRatio < 1 ? yRatio : 1;
	$: ratio = Math.min(xRatio, yRatio);

	$: if (browser && $frameSelection) {
		const wW = window.innerWidth;
		const bothSidesBigerThanHalf = leftSideWidth > wW / 2.1 && rightSideWidth > wW / 2.1;

		bothBiger = bothSidesBigerThanHalf;

		setTimeout(() => {
			const padding = 150;
			const el = document.querySelector(`#${screen}`);

			xRatio = (el.clientWidth - padding) / width;
			yRatio = (el.clientHeight - padding) / height;

			$scaleFactor[screen] = Math.min(xRatio, yRatio);
		});
	}
</script>

<section id={screen} class="col fcenter grow yfill" class:both-big={bothBiger}>
	<Selector {screen} />

	<div class="outer-frame col fcenter" {width} {height}>
		<iframe {src} {width} {height} {title} style="transform: scale({ratio})" />
	</div>

	<Scale {screen} />
</section>

<style lang="scss">
	section {
		position: relative;
		max-width: 70%;
		width: auto;
	}

	.both-big {
		max-width: 50%;
	}

	iframe {
		background: #000;
	}
</style>
