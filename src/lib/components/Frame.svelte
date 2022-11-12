<script>
	import { customURL, frameSelection, scaleFactor, rotateDevice, UserStore } from '$lib/stores';
	import { deviceList } from '$lib/devices';
	import Selector from '$lib/components/Selector.svelte';
	import Scale from '$lib/components/Scale.svelte';
	import Browser from '$lib/components/Browser.svelte';

	export let screen;

	const isPort = !isNaN(Number($customURL));

	$: src = isPort ? `http://localhost:${$customURL}` : `http://${$customURL}`;
	$: deviceSize = deviceList[$frameSelection[screen]].size;
	$: deviceWidth = $rotateDevice[screen] ? deviceSize.height : deviceSize.width;
	$: deviceHeight = $rotateDevice[screen] ? deviceSize.width : deviceSize.height;
	$: title = deviceList[$frameSelection[screen]].name;

	let smallScreen, equalScreen, screenWidth, screenHeight, xRatio, yRatio, ratio;

	function calculateLayout() {
		const leftSelection = deviceList[$frameSelection.left];
		const rightSelection = deviceList[$frameSelection.right];
		const screenSelection = deviceList[$frameSelection[screen]];
		let smallLeft, smallRight;

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
	}

	function scaleToFit() {
		const padding = 150;

		calculateLayout();

		setTimeout(() => {
			xRatio = (screenWidth - padding) / deviceWidth;
			yRatio = (screenHeight - padding) / deviceHeight;
			ratio = Math.min(xRatio, yRatio) > 1 ? 1 : Math.min(xRatio, yRatio);
			$scaleFactor[screen] = ratio;
		});
	}

	$: $frameSelection[screen], scaleToFit();
	$: $rotateDevice[screen], scaleToFit();
</script>

<svelte:window on:resize={scaleToFit} />

<section
	bind:offsetWidth={screenWidth}
	bind:offsetHeight={screenHeight}
	class="col fcenter yfill"
	class:small-screen={smallScreen}
	class:equal-screen={equalScreen}
>
	<Selector {screen} />

	<div
		class="outer-frame col fcenter"
		style="min-width: {deviceWidth}px; min-height: {deviceHeight}px; transform: scale({ratio})"
		on:load={scaleToFit}
	>
		{#if $UserStore.browserSimulation}
			<Browser />
		{/if}

		<iframe class="fill" {src} {title} />
	</div>

	<Scale {screen} />
</section>

<style lang="scss">
	section {
		position: relative;
		width: 65%;
		overflow: hidden;
	}

	.outer-frame {
		border: 1px solid #37373a;
		border-radius: 8px;
		box-shadow: 0 80px 80px -30px rgba(#000, 0.4);
	}

	iframe {
		border-radius: 0 0 8px 8px;
	}

	.small-screen {
		width: 35%;
	}

	.equal-screen {
		width: 50%;
	}
</style>
