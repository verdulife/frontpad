import { writable } from 'svelte/store';

export const customURL = writable('frontpad.ml');
export const frameSelection = writable({
	left: 0,
	right: 0
});
export const scaleFactor = writable({
	left: 1,
	right: 1
});
export const rotateDevice = writable({
	left: false,
	right: false
});
