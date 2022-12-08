// Scripts for firebase and firebase messaging
importScripts(
	'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js'
);
importScripts(
	'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
);

// Initialize the Firebase app in the service worker by passing the generated config
// const firebaseConfig = {
// 	apiKey: 'AIzaSyDOTwRq-9D9j9_bkwOPFKo3RX1KYxkeYtA',
// 	authDomain: 'sharely-3ea3e.firebaseapp.com',
// 	projectId: 'sharely-3ea3e',
// 	storageBucket: 'sharely-3ea3e.appspot.com',
// 	messagingSenderId: '697276091176',
// 	appId: '1:697276091176:web:62fd386de88d914f2bde1d',
// 	measurementId: 'G-D4TQ6N804H',
// };

const firebaseConfig = {
	apiKey: 'AIzaSyCcJxmjD7YmRcPUQQIChou4KoRWPyr-skY',
	authDomain: 'sharely-api.firebaseapp.com',
	projectId: 'sharely-api',
	storageBucket: 'sharely-api.appspot.com',
	messagingSenderId: '640700045874',
	appId: '1:640700045874:web:1cbdbc15d3d662d54efa2b',
	measurementId: 'G-2FNXL98HQK',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
	console.log('Received background message berubah ', payload);
	window.location.reload();
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
