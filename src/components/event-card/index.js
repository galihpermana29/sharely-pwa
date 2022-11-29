import { Avatar } from 'antd';

const EventCard = ({
	title = 'My Vehicle Run Out of Gas',
	desc = 'Use this card if you are facing run out of gas conditions',
	img,
	...props
}) => {
	return (
		<div
			className="flex py-[19px] px-[20px] rounded-[10px] items-center bg-[#F4FDF6] cursor-pointer"
			{...props}>
			<div className="mr-[17px]">
				<Avatar size={50} src={img} />
			</div>
			<div>
				<p className="font-semibold">{title}</p>
				<p className="font-light max-w-[330px] text-[15px]">{desc}</p>
			</div>
		</div>
	);
};

export default EventCard;
