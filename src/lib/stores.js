import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const customURL = writable('/welcome');

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

const defalutOptions = {
	customURL: 'localhost:3000',
	layout: 'mobileFirst',
	defaultDevice: { left: 0, right: 0 },
	defaultDeviceRotation: { left: 0, right: 0 }
};

export const UserStore = writable(
	(browser && JSON.parse(localStorage.getItem('UserStore'))) || defalutOptions
);

UserStore.subscribe((val) => browser && (localStorage.UserStore = JSON.stringify(val)));
