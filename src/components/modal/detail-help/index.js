import { Button, Form, Input, InputNumber, Row } from 'antd';
import { useEffect } from 'react';

// import { PdAntdInput } from 'components/pd-antd-input';
// import { PdButton } from 'components/pd-button';
// import PdTitle from 'components/pd-title';

// import { isAlpha, isSpecial } from 'utils/validate-password';

import './style.scss';

/**
 *
 * @param {Function} props.onFinish function that recieve value
 */

export default function DetailHelp({
	onFinish = () => {},
	data = {},
	purpose = 'detail',
}) {
	const [form] = Form.useForm();
	function handleFinish(value) {
		if (purpose === 'detail') {
			onFinish(value);
		} else {
			const payload = {
				eventId: data.id,
				userId: JSON.parse(localStorage.getItem('current_sharely_user')).id,
				title: '',
				message: value.detail,
				phoneNumber: value.phoneNumber.toString(),
			};
			onFinish(payload);
		}
	}

	useEffect(() => {
		form.setFieldsValue({
			title: data.title,
		});
	}, [data.title, form]);

	return (
		<div>
			<h1 className="text-[18px]">Details</h1>

			<div className="content">
				<Form
					form={form}
					layout="vertical"
					className="form-wrapper my-5"
					onFinish={(value) => handleFinish(value)}>
					{purpose === 'detail' && (
						<Form.Item
							label="Title of Events"
							name="title"
							rules={[
								{
									required: true,
									message: 'Please input your title',
								},
							]}>
							<Input className="h-[40px]" placeholder="Title of events" />
						</Form.Item>
					)}
					<Form.Item
						label={`${
							purpose === 'detail'
								? 'Write your detail and what you need'
								: 'Write your message'
						}`}
						name="detail">
						<Input.TextArea className="h-[40px]" placeholder="Your details" />
					</Form.Item>
					<Form.Item label="Your phone number" name="phoneNumber">
						<InputNumber
							className="h-[40px] w-full"
							placeholder="Your phone number"
						/>
					</Form.Item>
					<Form.Item className="btn-finish">
						<Row justify={'space-between'}>
							<Button className="h-[37px]">Cancel</Button>
							<Button
								htmlType="submit"
								className="bg-prime-orange text-white h-[37px]">
								{purpose === 'detail' ? 'Create' : 'Help'}
							</Button>
						</Row>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
