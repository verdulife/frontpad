<script>
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

	let windowWidth, containerWidth, containerHeight;

	function scaleToFit() {
		const padding = 150;

		console.log(windowWidth, containerWidth, containerHeight);

		xRatio = (containerWidth - padding) / width;
		yRatio = (containerHeight - padding) / height;

		$scaleFactor[screen] = Math.min(xRatio, yRatio);
	}

	$: if ($frameSelection) scaleToFit();
</script>

<svelte:window bind:innerWidth={windowWidth} on:resize={scaleToFit} />

<section
	bind:offsetWidth={containerWidth}
	bind:offsetHeight={containerHeight}
	class="col fcenter grow yfill"
	class:both-big={bothBiger}
>
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
		overflow: hidden;
	}

	.both-big {
		max-width: 50%;
	}
</style>
