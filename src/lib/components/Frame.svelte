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
	$: smallScreen = false;
	$: equalScreen = false;

	let xRatio, yRatio, ratio, windowWidth, windowHeight;

	function calculateLayout() {
		const leftSelection = deviceList[$frameSelection.left];
		const rightSelection = deviceList[$frameSelection.right];
		const screenSelection = deviceList[$frameSelection[screen]];
		let smallLeft = false;
		let smallRight = false;

		if ($rotateDevice[screen] && screenSelection.type === 'mobile') smallScreen = false;
		else if (screenSelection.type === 'mobile') smallScreen = true;
		else smallScreen = false;

		if ($rotateDevice.left) smallLeft = false;
		else if (leftSelection.type === 'mobile') smallLeft = true;
		else smallLeft = false;

		if ($rotateDevice.right) smallRight = false;
		else if (rightSelection.type === 'mobile') smallRight = true;
		else smallRight = false;

		equalScreen = smallLeft && smallRight;

		//TODO CHECK NEXT CONDITIONAL
		if (equalScreen) return windowWidth / 2;
		else if (smallScreen) return windowWidth / 1.35;
		else return windowWidth / 1.65;
	}

	function scaleToFit() {
		const padding = 150;
		const screenWidth = calculateLayout();

		xRatio = (screenWidth - padding) / width;
		yRatio = (windowHeight - padding) / height;
		ratio = Math.min(xRatio, yRatio) > 1 ? 1 : Math.min(xRatio, yRatio);
		$scaleFactor[screen] = ratio;
	}

	$: $frameSelection[screen], scaleToFit();
	$: $rotateDevice[screen], scaleToFit();
</script>

<svelte:window
	on:resize={scaleToFit}
	bind:innerWidth={windowWidth}
	bind:innerHeight={windowHeight}
/>

<section
	id={screen}
	class="col fcenter yfill"
	class:small-screen={smallScreen}
	class:equal-screen={equalScreen}
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
		width: 65%;
		overflow: hidden;
	}

	.small-screen {
		width: 35%;
	}

	.equal-screen {
		width: 50%;
	}
</style>
