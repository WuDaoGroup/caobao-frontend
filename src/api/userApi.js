// 用户相关的API

import api from '../services/api.js';

export const loginApi = async (sid, password) => {
	try {
		let form = new FormData();
		form.append('sid', sid);
		form.append('password', password);
		const response = await api.post(`/api/v1/students/login`, form);
		return response;
	} catch (err) {
		console.error(err);
	}
};
export const registerApi = async (sid, name, password, course, info) => {
	try {
		let form = new FormData();
		form.append('sid', sid);
		form.append('name', name);
		form.append('password', password);
		form.append('course', course);
		form.append('info', info);
		const response = await api.post(`/api/v1/students/register`, form);
		return response;
	} catch (err) {
		console.error(err);
	}
};
