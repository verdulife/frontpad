import { rotateDevice } from '$lib/stores';

export function rotate(screen) {
	rotateDevice.update((val) => {
		val[screen] = !val[screen];
		return val;
	});
}
