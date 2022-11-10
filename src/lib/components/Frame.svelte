<script>
	import { customURL, frameSelection, scaleFactor, rotateDevice, UserStore } from '$lib/stores';
	import { deviceList } from '$lib/devices';
	import Selector from '$lib/components/Selector.svelte';
	import Scale from '$lib/components/Scale.svelte';

	export let screen;

	const isPort = !isNaN(Number($customURL));

	$: src = isPort ? `http://localhost:${$customURL}` : `http://${$customURL}`;
	$: size = deviceList[$frameSelection[screen]].size;
	$: width = $rotateDevice[screen] ? size.height : size.width;
	$: height = $rotateDevice[screen] ? size.width : size.height;
	$: title = deviceList[$frameSelection[screen]].name;
	$: equalScreens = false;

	let xRatio, yRatio, ratio, containerWidth, containerHeight;

	function mustBeBig() {
		const selectionLeft = deviceList[$frameSelection.left];
		const selectionRight = deviceList[$frameSelection.right];

		equalScreens = selectionLeft.type === selectionRight.type;
		equalScreens =
			selectionLeft.type === ('desktop' || 'tablet') &&
			selectionRight.type === ('desktop' || 'tablet');
	}

	function scaleToFit() {
		const padding = 150;

		mustBeBig();

		xRatio = (containerWidth - padding) / width;
		yRatio = (containerHeight - padding) / height;
		ratio = Math.min(xRatio, yRatio) > 1 ? 1 : Math.min(xRatio, yRatio);
		$scaleFactor[screen] = ratio;
	}

	$: $frameSelection[screen] || $rotateDevice[screen] || $UserStore.layout, scaleToFit();
</script>

<svelte:window on:resize={scaleToFit} />

<section
	bind:offsetWidth={containerWidth}
	bind:offsetHeight={containerHeight}
	id={screen}
	class="col fcenter grow yfill"
	class:equal-screens={equalScreens}
>
	<Selector {screen} />

	<div class="outer-frame col fcenter" {width} {height}>
		<iframe {src} {width} {height} {title} style="transform: scale({ratio})" on:load={scaleToFit} />
	</div>

	<Scale {screen} />
</section>

<style lang="scss">
	section {
		position: relative;
		overflow: hidden;
	}

	.equal-screens {
		width: 50%;
	}
</style>
