import { Navigate } from 'react-router-dom';

const UnguidedRoute = ({ children }) => {
	const isLogin = localStorage.getItem('user_token');
	if (isLogin) {
		// user is not authenticated
		return <Navigate to="/home" />;
	}
	return children;
};

export default UnguidedRoute;
