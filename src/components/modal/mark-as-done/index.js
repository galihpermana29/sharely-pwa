import { Button, Form, Input, Row } from 'antd';

import './style.scss';

/**
 *
 * @param {Function} props.onFinish function that recieve value
 */

export default function MarkAsDone({ onFinish = () => {}, data = {} }) {
	const [form] = Form.useForm();
	function handleFinish(value) {
		const payload = {
			...value,
			helper: data.helper,
			eventId: data.id,
		};
		onFinish(payload);
	}

	return (
		<div>
			<h1 className="text-[18px]">Details</h1>

			<div className="content">
				<Form
					form={form}
					layout="vertical"
					className="form-wrapper my-5"
					onFinish={(value) => handleFinish(value)}>
					<Form.Item label={`Write your review for your helper`} name="review">
						<Input.TextArea className="h-[40px]" placeholder="Your details" />
					</Form.Item>
					<Form.Item className="btn-finish">
						<Row justify={'space-between'}>
							<Button className="h-[37px]">Cancel</Button>
							<Button
								htmlType="submit"
								className="bg-prime-orange text-white h-[37px]">
								{'Finish'}
							</Button>
						</Row>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
