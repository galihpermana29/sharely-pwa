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

function createEvent(payload) {
	return api.post(`/event`, payload, token.getAccessToken('user'));
}

function getQuickHelp() {
	return api.get(`/event`, token.getAccessToken('user'));
}
function getUserEvents(id, status) {
	return api.get(`/event/${id}?status=${status}`, token.getAccessToken('user'));
}
function createHelp(payload) {
	return api.post(`/helper`, payload, token.getAccessToken('user'));
}

function markAsDone(payload, id) {
	return api.put(`/event/${id}`, payload, token.getAccessToken('user'));
}

function cancelEvent(id) {
	return api.put(`/event/cancel/${id}`, token.getAccessToken('user'));
}

const SharelyAPI = {
	cancelEvent,
	login,
	signup,
	uploadKTP,
	createEvent,
	getQuickHelp,
	getUserEvents,
	createHelp,
	markAsDone,
};

export default SharelyAPI;
