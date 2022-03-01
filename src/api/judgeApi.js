// 评测相关的API

import api from '../services/api.js';

export const judgeApi = async (filename) => {
	try {
		let form = new FormData();
		form.append('filename', filename);
		const response = await api.post(`/api/v1/judge/test`, form);
		return response;
	} catch (err) {
		console.error(err);
	}
};