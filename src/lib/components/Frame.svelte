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

	let xRatio, yRatio, ratio, containerWidth, containerHeight;

	function scaleToFit() {
		console.log("gets older section sizes", containerWidth, containerHeight);
		const padding = 150;

		xRatio = (containerWidth - padding) / width;
		yRatio = (containerHeight - padding) / height;
		ratio = Math.min(xRatio, yRatio);
		$scaleFactor[screen] = ratio;
	}

	$: $frameSelection[screen] || $rotateDevice[screen] || $UserStore.layout, scaleToFit();
</script>

<svelte:window on:resize={scaleToFit} />

<section
	bind:offsetWidth={containerWidth}
	bind:offsetHeight={containerHeight}
	id={screen}
	class="col fcenter yfill"
	class:mobilefirst-layout={$UserStore.layout === 'mobileFirst'}
	class:desktopfirst-layout={$UserStore.layout === 'desktopFirst'}
	class:equal-layout={$UserStore.layout === 'equal'}
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

	#left.mobilefirst-layout {
		width: 30%;
	}

	#left.desktopfirst-layout {
		width: 70%;
	}

	#right.mobilefirst-layout {
		width: 70%;
	}

	#right.desktopfirst-layout {
		width: 30%;
	}

	.equal-layout {
		width: 50%;
	}
</style>
