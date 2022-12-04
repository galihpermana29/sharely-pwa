import { Avatar, Badge, Button } from 'antd';
import { parseStatus, statusColor } from '../../utils/status';
const HelpCard = ({ data, handleHelp, ...props }) => {
	const { detail, title, status, place, user = {} } = data;
	return (
		<div
			className="border-[0.1px] shadow-sm py-[19px] px-[20px] rounded-[10px]"
			{...props}>
			<div className="flex items-center ">
				<div className="mr-[17px]">
					<Avatar size={45} src="https://joeschmoe.io/api/v1/random" />
				</div>
				<div>
					<Badge
						count={parseStatus(status)}
						style={{ backgroundColor: statusColor(status) }}
					/>
					<p className="font-semibold mt-2">
						{user.fullName} di {place.replace(/(.{52})..+/, '$1…')}
					</p>
					<p className="font-light max-w-[330px] text-[15px]">
						{title}. {detail}
					</p>
				</div>
			</div>
			<div>
				{status === 'ongoing' ? (
					<Button
						className="bg-prime-orange mt-4 text-white w-full h-[40px] rounded-2xl"
						onClick={() => handleHelp(data)}>
						Help Galih!
					</Button>
				) : (
					<Button className="bg-white border-2 border-prime-orange mt-4 text-prime-orange w-full h-[40px] rounded-2xl">
						Other user is now trying to help..
					</Button>
				)}
			</div>
		</div>
	);
};

export default HelpCard;
