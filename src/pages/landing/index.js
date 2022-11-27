import './style.scss';
import landing from '../../assets/images/landing2.svg';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<div className="wrapper">
			<img src={landing} alt="landing" className="w-full max-w-[200px]" />
			<h1 className="text-white text-[27px] w-[317px] text-center font-medium">
				Start to <span className="text-[#F16C59]">help</span> people who need
				you urgently
			</h1>
			<div className="flex justify-evenly w-full">
				<Link to={'/register'}>
					<button className="btn-orange w-[150px]">Register</button>
				</Link>
				<Link to={'/login'}>
					<button className="btn-white w-[150px]">Login</button>
				</Link>
			</div>
		</div>
	);
};

export default Landing;
