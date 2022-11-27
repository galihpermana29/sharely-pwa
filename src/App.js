import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import Landing from './pages/landing';
import Login from './pages/login';
import GuidedRoute from './routes/GuidedRoute';

import './App.scss';
import Signup from './pages/signup';

export const currentRoutes = createBrowserRouter([
	{
		path: '/home',
		element: (
			// <GuidedRoute>
				<Home />
			// </GuidedRoute>
		),
	},
	{
		path: '/',
		element: <Landing />,
	},
	{
		path: 'login',
		element: <Login />,
	},
	{
		path: 'register',
		element: <Signup />,
	},
]);
