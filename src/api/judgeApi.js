// 评测相关的API

import api from '../services/api.js';

export const judgeApi = async (sid, course, problem, pid, language, testcase_num) => {
	try {
		let form = new FormData();
		form.append('sid', sid);
		form.append('course', course);
		form.append('problem', problem); // 题目存放地址
		form.append('pid', pid); // 题目编号
		form.append('language', language);
		form.append('testcase_num', testcase_num);
		const response = await api.post(`/api/v1/judge/test`, form);
		return response;
	} catch (err) {
		console.error(err);
	}
};

export const queryJudgeRecordsApi = async (sid) => {
	try {
		let form = new FormData();
		form.append('sid', sid); // 学号
		const response = await api.post(`/api/v1/judge/records`, form);
		return response;
	} catch (err) {
		console.error(err);
	}
};