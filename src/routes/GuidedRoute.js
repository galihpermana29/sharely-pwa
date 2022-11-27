import { Navigate } from 'react-router-dom';

const GuidedRoute = ({ children }) => {
	const isLogin = localStorage.getItem('token_user');
	if (!isLogin) {
		// user is not authenticated
		return <Navigate to="/login" />;
	}
	return children;
};

export default GuidedRoute;
