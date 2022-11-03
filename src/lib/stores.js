import { writable } from 'svelte/store';

export const customURL = writable('frontpad.ml');
export const frameSelection = writable({
	left: 0,
	right: 0
});
