import { ArrowLeftOutlined } from '@ant-design/icons';
import {
	Avatar,
	Button,
	Form,
	Input,
	InputNumber,
	message,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';
import { useState } from 'react';
import SharelyAPI from '../../api/apis';
import satu from '../../assets/images/1.svg';
import dua from '../../assets/images/2.svg';
import tiga from '../../assets/images/3.svg';

const halfLayout = {
	labelCol: { span: 24 },
	wrapperCol: { span: 24 },
	labelAlign: 'left',
};

const Profile = () => {
	const [form] = useForm();
	const [activeTabs, setActiveTabs] = useState(1);
	const [profile, setProfile] = useState({});

	const { id: userId } = JSON.parse(
		localStorage.getItem('current_sharely_user')
	);

	const { fullName = '', phoneNumber, email, point, id, ktp } = profile;
	form.setFieldsValue({ fullName, phoneNumber, email });

	const handleChangeProfile = async (val) => {
		let bodyFormData = new FormData();
		bodyFormData.append('fullName', val.fullName);
		bodyFormData.append('password', val.password);
		bodyFormData.append('phoneNumber', val.phoneNumber);

		try {
			const data = await SharelyAPI.updateProfile(bodyFormData, id);
			message.success('Sucessfully update profile!');
			const newData = {
				id,
				email,
				fullName: val.fullName,
				ktp,
				phoneNumber: val.phoneNumber,
				point,
			};

			localStorage.setItem('current_sharely_user', JSON.stringify(newData));
			window.location.reload();
		} catch (error) {
			console.log(error);
			message.error('Error while updating profile...');
		}
	};

	async function getProfile() {
		try {
			const {
				data: { data },
			} = await SharelyAPI.getProfileById(userId);
			setProfile(data);
			console.log(data, 'data');
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getProfile();
	}, []);
	return (
		<div className="home-wrapper relative h-screen overflow-hidden">
			<div
				className="absolute left-5 top-10 cursor-pointer"
				onClick={() => window.location.replace('/home')}>
				<ArrowLeftOutlined className="text-[20px]" />
			</div>
			<div className="flex justify-center items-center flex-col py-9">
				<Avatar size={90} className="bg-gray-400">
					{fullName.slice(0, 2)}
				</Avatar>
				<p className="text-prime-orange mt-[7px] text-[18px] font-semibold">
					{fullName}
				</p>
				<p className=" mb-[7px] text-[13px] font-semibold">{email}</p>
				<p className=" my-[7px] text-[15px] font-semibold">{point} Points</p>
			</div>
			<div className="relative h-[75vh]">
				<div className="flex justify-center h-[50px] items-end ">
					<div className="flex bg-prime-orange text-white h-max max-w-max py-[8px] px-[20px] text-[14px] space-x-3 rounded-[20px]">
						<div
							onClick={() => setActiveTabs(1)}
							className={`cursor-pointer ${
								activeTabs === 2 ? 'text-gray-500' : 'text-white'
							}`}>
							Reward
						</div>
						<div
							onClick={() => setActiveTabs(2)}
							className={`cursor-pointer ${
								activeTabs === 1 ? 'text-gray-500' : 'text-white'
							}`}>
							Edit Profile
						</div>
					</div>
				</div>
				<div className="bg-prime-orange h-[65vh] absolute bottom-0 left-4 right-4 rounded-t-[20px] overflow-y-auto">
					{activeTabs === 2 ? (
						<div className="flex justify-center">
							<Form
								form={form}
								onFinish={handleChangeProfile}
								className=" w-full max-w-[320px] mt-[45px]">
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
										className="h-[40px] "
										placeholder="Input your full name"
									/>
								</Form.Item>
								<Form.Item
									{...halfLayout}
									name={'email'}
									label={<label style={{ color: 'white' }}>Email</label>}>
									<Input
										disabled={true}
										className="h-[40px] text-white"
										placeholder="Input your full name"
									/>
								</Form.Item>
								<Form.Item
									label={<label style={{ color: 'white' }}>New Password</label>}
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
										placeholder="Input your new password"
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
										className="text-white w-full h-[40px] bg-prime-orange mb-[60px] mt-[20px]">
										Save Changes
									</Button>
								</Form.Item>
							</Form>
						</div>
					) : (
						<div className="flex justify-center space-y-3 flex-col items-center mt-8 px-5">
							<img src={satu} alt="satu" className="w-full" />
							<img src={dua} alt="satu" className="w-full" />
							<img src={tiga} alt="satu" className="w-full" />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Profile;
