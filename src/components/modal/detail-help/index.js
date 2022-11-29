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

export default function DetailHelp({ onFinish = () => {}, data = {} }) {
	const [form] = Form.useForm();

	function handleFinish(value) {
		console.log(value);
		form.resetFields();
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
					<Form.Item label="Write your detail and what you need" name="desc">
						<Input.TextArea className="h-[40px]" placeholder="Your details" />
					</Form.Item>
					<Form.Item label="Your phone number" name="phone_number">
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
								Create
							</Button>
						</Row>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
