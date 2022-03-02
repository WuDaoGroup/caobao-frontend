import api from '../services/api.js';

export const queryProblemsApi = async (course) => {
	try {
		const response = await api.get(`/api/v1/problems/${course}`);
		return response;
	} catch (err) {
		console.error(err);
	}
};

export const querySingleProblemApi = async (id) => {
	try {
		const response = await api.get(`/api/v1/problems/single/${id}`);
		return response;
	} catch (err) {
		console.error(err);
	}
};