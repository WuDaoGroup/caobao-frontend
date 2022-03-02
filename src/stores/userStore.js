import { writable } from 'svelte/store';
import { browser } from '$app/env';

let defaultUser = {
	sid : 10001,
	name: '未登录',
	password: 'xxxx',
	course: 'alg',
	info: '好开心'
};
export const user = writable(defaultUser);

if (browser) {
	user.set(
		localStorage.getItem('user') == null ? defaultUser : JSON.parse(localStorage.getItem('user'))
	);
}
