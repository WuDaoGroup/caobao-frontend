import api from '../services/api.js';

export const queryProblemsApi = async (course) => {
	try {
		const response = await api.get(`/api/v1/problems/${course}`);
		return response;
	} catch (err) {
		console.error(err);
	}
};