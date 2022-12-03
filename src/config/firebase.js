// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import axios from 'axios';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDOTwRq-9D9j9_bkwOPFKo3RX1KYxkeYtA',
	authDomain: 'sharely-3ea3e.firebaseapp.com',
	projectId: 'sharely-3ea3e',
	storageBucket: 'sharely-3ea3e.appspot.com',
	messagingSenderId: '697276091176',
	appId: '1:697276091176:web:62fd386de88d914f2bde1d',
	measurementId: 'G-D4TQ6N804H',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const messaging = getMessaging(app);

// messaging.getToken({
// 	vapidKey:
// 		'BIyuZCE_0ysJ1ah68xwN5hfay05sYM6XGcGGVW9qTcHOaYDIUpfI8SabrNKoCSYP7k9JiVJex1LgiG0STI40vTo',
// });

// function requestPermission() {
// 	console.log('Requesting permission...');
// 	Notification.requestPermission().then((permission) => {
// 		if (permission === 'granted') {
// 			console.log('Notification permission granted.');
// 		}
// 	});
// }

export const getTokens = (setTokenFound) => {
	return getToken(messaging, {
		vapidKey:
			'BIyuZCE_0ysJ1ah68xwN5hfay05sYM6XGcGGVW9qTcHOaYDIUpfI8SabrNKoCSYP7k9JiVJex1LgiG0STI40vTo',
	})
		.then((currentToken) => {
			if (currentToken) {
				console.log('current token for client: ', currentToken);
				setTokenFound(true);
				// Track the token -> client mapping, by sending to backend server
				// show on the UI that permission is secured
			} else {
				console.log(
					'No registration token available. Request permission to generate one.'
				);
				setTokenFound(false);
				// shows on the UI that permission is required
			}
		})
		.catch((err) => {
			console.log('An error occurred while retrieving token. ', err);
			// catch error while creating client token
		});
};

export const onMessageListener = () => {
	return new Promise((resolve) => {
		onMessage(messaging, (payload) => {
			resolve(payload);
		});
	});
};

export const subscribeTopics = () => {
	return messaging
		.subscribeToTopic(
			[
				'ftIKzmOssxnQ9oDKNA9vK3:APA91bFdyAtAwEzXvtDFi_aAdOmBvAK7Dy57FYNSwFGUaTALmFLafyZXHVA-4npckHXFJjTpb7wENpfqk2sIl5C2At5WevhVq1uTRxuw7qhc5UHck-UP7rMV_HIWopWBXGu-vVbjNe-Q',
			],
			'help'
		)
		.then((response) => {
			// See the MessagingTopicManagementResponse reference documentation
			// for the contents of response.
			console.log('Successfully subscribed to topic:', response);
		})
		.catch((error) => {
			console.log('Error subscribing to topic:', error);
		});
};

export const subscribeToTopic = (topicName, handler = () => {}) =>
	getToken(messaging, {
		vapidKey:
			'BIyuZCE_0ysJ1ah68xwN5hfay05sYM6XGcGGVW9qTcHOaYDIUpfI8SabrNKoCSYP7k9JiVJex1LgiG0STI40vTo',
	}).then((currentToken) => {
		if (currentToken) {
			const FIREBASE_API_KEY = `BIyuZCE_0ysJ1ah68xwN5hfay05sYM6XGcGGVW9qTcHOaYDIUpfI8SabrNKoCSYP7k9JiVJex1LgiG0STI40vTo`;
			// Subscribe to the topic
			const topicURL = `https://iid.googleapis.com/iid/v1/${currentToken}/rel/topics/`;
			return fetch({
				url: topicURL,
				method: 'POST',
				headers: {
					Authorization: `key=${FIREBASE_API_KEY}`,
				},
			})
				.then((response) => {
					console.log(response, ' tt');
					onMessage(messaging, (payload) => {
						console.log(payload, 'apas');
						handler(payload);
					});
				})
				.catch(() => {
					console.error(`Can't subscribe to ${topicName} topic`);
				});
		}
	});

export const sendMessage = async (topic) => {
	// const message = {
	// 	notification: {
	// 		title: '$FooCorp up 1.43% on the day',
	// 		body: '$FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.',
	// 	},
	// 	topic: topic,
	// };
	// console.log(getMessaging(app));
	// console.log);
	// Send a message to devices subscribed to the combination of topics
	// specified by the provided condition.
	const FIREBASE_API_KEY = `BIyuZCE_0ysJ1ah68xwN5hfay05sYM6XGcGGVW9qTcHOaYDIUpfI8SabrNKoCSYP7k9JiVJex1LgiG0STI40vTo`;
	// Subscribe to the topic
	const topicURL = `https://fcm.googleapis.com//v1/projects/sharely-3ea3e/messages:send`;
	const config = {
		headers: {
			Authorization: `bearer ${FIREBASE_API_KEY}`,
			'Content-Type': 'application/json',
		},
	};

	const data = await axios.post(
		topicURL,
		{
			message: {
				topic: 'help',
				notification: {
					title: 'Background Message Title',
					body: 'Background message body',
				},
				webpush: {
					fcm_options: {
						link: 'https://dummypage.com',
					},
				},
			},
		},
		config
	);
	console.log(data);

	// fetch({
	// 	url: topicURL,
	// 	method: 'POST',
	// 	headers: {
	// 		Authorization: `bearer ${FIREBASE_API_KEY}`,
	// 		'Content-Type': 'application/json',
	// 	},
	// 	body: {
	// 		message: {
	// 			topic: 'help',
	// 			notification: {
	// 				title: 'Background Message Title',
	// 				body: 'Background message body',
	// 			},
	// 			webpush: {
	// 				fcm_options: {
	// 					link: 'https://dummypage.com',
	// 				},
	// 			},
	// 		},
	// 	},
	// }).then((data) => {
	// 	console.log(data);
	// });
};
