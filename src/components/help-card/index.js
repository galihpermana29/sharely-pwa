import { Avatar, Button } from 'antd';
const HelpCard = ({ ...props }) => {
	return (
		<div className="border-[0.1px] shadow-sm py-[19px] px-[20px] rounded-[10px]" {...props}>
			<div className="flex items-center ">
				<div className="mr-[17px]">
					<Avatar size={45} src="https://joeschmoe.io/api/v1/random" />
				</div>
				<div>
					<p className="font-semibold">Galih Permana di Sardo Swalayan</p>
					<p className="font-light max-w-[330px] text-[15px]">
						Help me, my fuel is empty! now i’m stuck with my motorcycle. Anyone
						who have pertalite please help me!
					</p>
				</div>
			</div>
			<div>
				<Button className="bg-prime-orange mt-4 text-white w-full h-[40px] ">
					Help Galih!
				</Button>
			</div>
		</div>
	);
};

export default HelpCard;
