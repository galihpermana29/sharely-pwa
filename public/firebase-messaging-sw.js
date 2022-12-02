// Scripts for firebase and firebase messaging
importScripts(
	'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js'
);
importScripts(
	'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
	apiKey: 'AIzaSyDOTwRq-9D9j9_bkwOPFKo3RX1KYxkeYtA',
	authDomain: 'sharely-3ea3e.firebaseapp.com',
	projectId: 'sharely-3ea3e',
	storageBucket: 'sharely-3ea3e.appspot.com',
	messagingSenderId: '697276091176',
	appId: '1:697276091176:web:62fd386de88d914f2bde1d',
	measurementId: 'G-D4TQ6N804H',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
	console.log('Received background message ', payload);

	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
