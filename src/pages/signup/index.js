import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, message, Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SharelyAPI from '../../api/apis';
import './style.scss';

const halfLayout = {
	labelCol: { span: 24 },
	wrapperCol: { span: 24 },
	labelAlign: 'left',
};

const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!');
	}
	return isJpgOrPng && isLt2M;
};

const Signup = () => {
	const [uploadActive, setUploadActive] = useState(false);
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState();
	const [form] = useForm();
	const [datas, setData] = useState(null);

	const handleChange = (info) => {
		if (info.file.status === 'uploading') {
			setLoading(true);
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, (url) => {
				setLoading(false);
				setImageUrl(url);
			});
		}
	};

	const handleSignUp = async (payload) => {
		try {
			setLoading(true);
			const {
				data: { data },
			} = await SharelyAPI.signup(payload);
			setUploadActive(true);
			setData(data);
			console.log(data, 'data');
		} catch (error) {
			console.log(error.response.data.success);
			if (!error.response.data.success) {
				message.error('Error phone number have registered!');
			} else {
				message.error(error.response.data);
			}
		} finally {
			setLoading(false);
		}
	};

	async function beforeUpload(file = {}, purpose) {
		console.log(file.file);
		const { data } = await SharelyAPI.uploadKTP({ data: file.file }, datas.id);
	}

	const propse = {
		name: 'image',
		multiple: false,
		beforeUpload: (file) => {
			beforeUpload({ file }, 'ktp');
		},
		customRequest: (d) => {
			d.onSuccess();
		},
		onRemove: (d) => {
			// const news = uploadList.filter((data) => data.id !== d.uid);
			// afterUpload(news);
			// setUploadList(news);
		},
	};

	const uploadButton = (
		<div className="text-white w-full">
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div
				style={{
					marginTop: 8,
				}}>
				Upload
			</div>
		</div>
	);

	return (
		<div className="wrappers">
			<div>
				<div className=" w-full max-w-[320px]">
					<h1 className="text-white font-semibold text-[27px]">Register</h1>
					<p className="text-white text-sm mt-2 font-normal">
						Register your account, so you can use this apps.
					</p>
				</div>

				<Form
					form={form}
					onFinish={handleSignUp}
					className=" w-full max-w-[320px] mt-[45px]">
					{!uploadActive && (
						<>
							<Form.Item
								{...halfLayout}
								name={'fullName'}
								label={<label style={{ color: 'white' }}>Full Name</label>}
								rules={[
									{
										required: true,
										message: 'Please input your full name',
									},
								]}>
								<Input
									className="h-[40px]"
									placeholder="Input your full name"
								/>
							</Form.Item>
							<Form.Item
								{...halfLayout}
								name={'email'}
								label={<label style={{ color: 'white' }}>Email</label>}
								rules={[
									{
										type: 'email',
										message: 'The input is not valid email!',
									},
									{
										required: true,
										message: 'Please input your email!',
									},
								]}>
								<Input className="h-[40px]" placeholder="Input your email" />
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

							<Form.Item
								label={<label style={{ color: 'white' }}>Phone Number</label>}
								{...halfLayout}
								name="phoneNumber"
								rules={[
									{
										required: true,
										message: 'Please input your phone number!',
									},
								]}>
								<InputNumber
									className="h-[40px] w-full"
									placeholder="Input your phone number"
								/>
							</Form.Item>
							<Form.Item>
								<Button
									htmlType="submit"
									loading={loading}
									className="text-white w-full h-[40px] bg-prime-orange mt-[40px]">
									Continue
								</Button>
								<p className="text-white mt-2">
									Have an account?{' '}
									<Link to={'/login'} className="text-prime-orange">
										Login here!
									</Link>
								</p>
							</Form.Item>
						</>
					)}
					{uploadActive && (
						<>
							<Upload
								name="avatar"
								listType="picture-card"
								className="avatar-uploader"
								{...propse}>
								{imageUrl ? (
									<img
										src={imageUrl}
										alt="avatar"
										// className="avatar-uploader"
										style={{
											width: '100%',
										}}
									/>
								) : (
									uploadButton
								)}
							</Upload>
							<Form.Item>
								<Button className="text-white w-full h-[40px] bg-prime-orange mt-[40px]">
									Register
								</Button>
							</Form.Item>
						</>
					)}
				</Form>
			</div>
		</div>
	);
};

export default Signup;
