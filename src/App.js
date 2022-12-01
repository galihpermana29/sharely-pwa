import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import Landing from './pages/landing';
import Login from './pages/login';
import GuidedRoute from './routes/GuidedRoute';

import './App.scss';
import Signup from './pages/signup';
import UnguidedRoute from './routes/UnguidedRoute';

export const currentRoutes = createBrowserRouter([
	{
		path: '/home',
		element: (
			<GuidedRoute>
				<Home />
			</GuidedRoute>
		),
	},
	{
		path: '/',
		element: (
			<UnguidedRoute>
				<Landing />
			</UnguidedRoute>
		),
	},
	{
		path: 'login',
		element: (
			<UnguidedRoute>
				<Login />
			</UnguidedRoute>
		),
	},
	{
		path: 'register',
		element: (
			<UnguidedRoute>
				<Signup />
			</UnguidedRoute>
		),
	},
]);
