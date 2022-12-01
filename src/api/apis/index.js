import api from '../index';
import token from '../getAccessToken';
import axios from 'axios';

function login(payload) {
	return api.post(`/signin`, payload, token.getAccessToken('user'));
}
function signup(payload) {
	return api.post(`/signup`, payload, token.getAccessToken('user'));
}

function uploadKTP(file, id) {
	return axios({
		data: file,
		method: 'PUT',
		url: `https://sharely-api-nodejs-production.up.railway.app/image/${id}`,
		headers: {
			'x-amz-acl': 'public-read',
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'multipart/form-data',
			'Cache-Control': 'no-cache',
		},
	});
	// return api.put(`/image/${id}`, file, token.getAccessToken('user'));
}

const SharelyAPI = {
	login,
	signup,
	uploadKTP,
};

export default SharelyAPI;
