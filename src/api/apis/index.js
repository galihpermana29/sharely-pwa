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
			// 'Access-Control-Allow-Origin': '*',
			// 'Content-Type': 'multipart/form-data',
			// 'Cache-Control': 'no-cache',
		},
	});
	// return api.put(`/image/${id}`, file, token.getAccessToken('user'));
}

function getAllCompanies(params) {
	return api.get(`/admin/company?${params}`, token.getAccessToken('cms'));
}

function getAllBussiness(params) {
	return api.get(`/admin/bussines?${params}`, token.getAccessToken('cms'));
}

function getDetailCompany(id) {
	return api.get(`/admin/company/${id}/detail`, token.getAccessToken('cms'));
}

function getDetailBusiness(id) {
	return api.get(`/admin/bussines/${id}`, token.getAccessToken('cms'));
}

function getAllNotification(params) {
	return api.get(`/admin/notifications?${params}`, token.getAccessToken('cms'));
}

function editBusiness(payload, id) {
	return api.put(`/admin/bussines/${id}`, payload, token.getAccessToken('cms'));
}
function markAsReadNotif(payload) {
	return api.put(`/admin/notifications`, payload, token.getAccessToken('cms'));
}

function publishBusiness(payload, id) {
	return api.patch(
		`/admin/bussines/${id}/fundraising`,
		payload,
		token.getAccessToken('cms')
	);
}

function verifyCompanies(payload, id) {
	return api.patch(
		`/admin/verification/${id}/company`,
		payload,
		token.getAccessToken('cms')
	);
}

function getAllRequestEdit() {
	return api.get('/admin/bussines/request-edit', token.getAccessToken('cms'));
}

function patchRequest(id, payload) {
	return api.patch(
		`/admin/bussines/request-edit/${id}`,
		payload,
		token.getAccessToken('cms')
	);
}

function createCompany(payload) {
	return api.post(`/admin/company`, payload, token.getAccessToken('cms'));
}

function createExistingBusiness(payload, id) {
	return api.post(
		`/admin/bussines/${id}/existing`,
		payload,
		token.getAccessToken('cms')
	);
}
function createFundrisingBusiness(payload, id) {
	return api.post(
		`/admin/bussines/${id}/fund-raising`,
		payload,
		token.getAccessToken('cms')
	);
}

function getAllRevenueDisbursement(params) {
	return api.get(
		`/admin/revenue-disbursement?${params}`,
		token.getAccessToken('cms')
	);
}

function getUniversalBalance(payload) {
	return api.post(
		'/admin/universal-balance',
		payload,
		token.getAccessToken('cms')
	);
}

function getDetailRevenue(id) {
	return api.get(
		`/admin/revenue-disbursement/${id}`,
		token.getAccessToken('cms')
	);
}

function disburseRevenue(businessId, revenueId) {
	return api.post(
		`/admin/lock-payment/${businessId}/bussines/${revenueId}/revenue-disbursement`,
		{},
		token.getAccessToken('cms')
	);
}

function archiveBusiness(id, payload) {
	return api.patch(
		`/admin/bussines/${id}/archive`,
		payload,
		token.getAccessToken('cms')
	);
}

const SharelyAPI = {
	login,
	signup,
	uploadKTP,
};

export default SharelyAPI;
