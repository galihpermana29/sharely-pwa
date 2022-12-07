import { Button, Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SharelyAPI from '../../api/apis';
import './style.scss';

const halfLayout = {
	labelCol: { span: 24 },
	wrapperCol: { span: 24 },
	labelAlign: 'left',
};

const Login = () => {
	const [form] = useForm();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleLogin(payload) {
		try {
			setLoading(true);
			const { data } = await SharelyAPI.login(payload);
			const { accessToken } = data ?? {};
			const {
				id = '',
				email = '',
				fullName,
				ktp,
				phoneNumber,
				point,
			} = data.data ?? {};

			const userProfile = {
				id,
				email,
				fullName,
				ktp,
				phoneNumber,
				point,
			};

			if (accessToken && userProfile) {
				localStorage.setItem('user_token', accessToken);
				localStorage.setItem(
					'current_sharely_user',
					JSON.stringify(userProfile)
				);
				navigate('/home');
			}
		} catch (error) {
			console.log(error.response.data);
			if (!error.response.data.success)
				message.error(error.response.data.message);
			else message.error(error.response.data);
		} finally {
			setLoading(false);
		}

		// window.location.reload();
	}

	return (
		<div className="wrappers">
			<div>
				<div className=" w-full max-w-[320px]">
					<h1 className="text-white font-semibold text-[27px]">Login</h1>
					<p className="text-white text-sm mt-2 font-normal">
						Login with your registered account and try to contribute.
					</p>
				</div>

				<Form
					form={form}
					className=" w-full max-w-[320px] mt-[45px]"
					onFinish={handleLogin}>
					<Form.Item
						{...halfLayout}
						name={'email'}
						label={<label style={{ color: 'white' }}>Email</label>}
						rules={[
							{
								type: 'email',
								message: 'The input is not valid E-mail!',
							},
							{
								required: true,
								message: 'Please input your E-mail!',
							},
						]}>
						<Input
							className="h-[40px]"
							placeholder="Input your registered email"
						/>
					</Form.Item>
					<Form.Item
						label={<label style={{ color: 'white' }}>Password</label>}
						{...halfLayout}
						name="password"
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
						]}>
						<Input.Password
							className="h-[40px]"
							placeholder="Input your password"
						/>
					</Form.Item>

					<Form.Item>
						<Button
							loading={loading}
							htmlType="submit"
							className="text-white w-full h-[40px] bg-prime-orange mt-[40px]">
							Log In
						</Button>
						<p className="text-white mt-2">
							Dont have an account?{' '}
							<Link to={'/register'} className="text-prime-orange">
								Register here!
							</Link>
						</p>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default Login;
