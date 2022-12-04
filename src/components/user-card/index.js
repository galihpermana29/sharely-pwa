import { Avatar, Button } from 'antd';
import moment from 'moment';
import { useState } from 'react';

import wa from '../../assets/images/wa.svg';

const UserCard = ({ data, handleFinish, handleCancel, ...props }) => {
	const { place, title, detail, helpers = [], createdAt, status } = data;
	console.log(data);
	const [isOpen, setIsOpen] = useState(false);
	const handleToggleHelpers = (e) => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="bg-[#FAF4FD] py-[19px] px-[20px] rounded-[10px]">
			<div className="flex  items-center cursor-pointer">
				<div className="mr-[17px]">
					<Avatar size={50} src="https://joeschmoe.io/api/v1/random" />
				</div>
				<div>
					<div>
						<p className="font-light max-w-[330px] text-[12px]">
							{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}
						</p>
					</div>
					<p className="font-regular text-[13px] mt-1">
						You in {place.replace(/(.{34})..+/, '$1…')}
					</p>
					<p className="font-semibold">{title}</p>
					<p className="font-light max-w-[330px] text-[15px]">{detail}</p>{' '}
				</div>
			</div>
			{isOpen && (
				<div className="space-y-2 my-5">
					{helpers.map((data, idx) => (
						<div key={idx}>
							<div className="flex items-center cursor-pointer">
								<div className="mr-[17px]">
									<Avatar size={50} src="https://joeschmoe.io/api/v1/random" />
								</div>
								<div className="w-full">
									<div>
										<p className="font-light max-w-[330px] text-[12px]">
											{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}
										</p>
									</div>
									<p className="font-semibold">
										{data.user.fullName} in{' '}
										{data.place.replace(/(.{34})..+/, '$1…')}
									</p>
									<p className="font-regular text-[13px]">{data.title}</p>
									<p className="font-light max-w-[330px] text-[15px]">
										{data.message}
									</p>
									<Button
										className="bg-transparent border-2 w-full mt-[5px] border-[#409E44] text-[#409E44] h-[35px] leading-3 rounded-[10px]"
										onClick={handleToggleHelpers}
										disabled={!helpers.length}>
										<a
											href={`https://wa.me/62${data.user.phoneNumber}`}
											target="blank"
											className="flex justify-center space-x-1">
											<img src={wa} alt="wa" />
											<p>Contact {data.user.fullName}</p>
										</a>
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
			<div className="w-full flex justify-center space-x-3 mt-[13px]">
				<Button
					className="bg-transparent border-2 border-prime-orange text-prime-orange h-[40px] rounded-[10px]"
					onClick={handleToggleHelpers}
					disabled={!helpers.length}>
					{isOpen ? 'Hide' : 'See'} who's help
				</Button>
				<Button
					onClick={() => handleCancel(data)}
					className="bg-prime-orange  text-white h-[40px] rounded-[10px]"
					disabled={status === 'finished'}>
					Cancel
				</Button>
				<Button
					onClick={() => handleFinish({ helper: helpers[0].userId })}
					className="bg-[#409E44]  text-white h-[40px] rounded-[10px]"
					disabled={status === 'finished'}>
					Done
				</Button>
			</div>
		</div>
	);
};

export default UserCard;
