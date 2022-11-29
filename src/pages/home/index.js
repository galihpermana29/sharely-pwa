import { Button } from 'antd';
import { useState } from 'react';
import BottomDrawer from '../../components/bottom-drawer';
import HelpCard from '../../components/help-card';

import gas from '../../assets/images/fuel.svg';
import tire from '../../assets/images/tire.svg';
import harm from '../../assets/images/harm.svg';
import './style.scss';
import EventCard from '../../components/event-card';
import Mapboxes from '../../components/map';
import { PdModals } from '../../components/modal';
import DetailHelp from '../../components/modal/detail-help';
import { SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const event = [
	{
		title: 'My Vehichle Run Out of Gas',
		desc: 'Use this card if you are facing run out of gas conditions',
		img: gas,
	},
	{
		title: 'My Vehicle Tire is Leaking',
		desc: 'Use this card if you are facing run out of gas conditions',
		img: tire,
	},
	{
		title: 'Someone Harm Me',
		desc: 'Use this card if you are facing someone who harm or try to harm you',
		img: harm,
	},
];

const Home = () => {
	const [visible, setVisible] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState({
		type: '',
		visible: false,
	});

	const handleCloseModal = () => {
		setIsModalOpen({ type: '', visible: false });
	};

	const modalContent = {
		detail: <DetailHelp data={isModalOpen.data} />,
	};
	return (
		<div className="home-wrappers relative">
			<PdModals
				width={600}
				handleClose={handleCloseModal}
				footer={null}
				visible={isModalOpen.visible}>
				{modalContent[isModalOpen.type]}
			</PdModals>
			<div className="bg-prime-orange absolute top-[7%] right-[10px] z-20 rounded-md cursor-pointer">
				<Link to="/profile">
					<SettingOutlined className=" text-[22px] m-1 p-1  text-white" />
				</Link>
			</div>
			<Mapboxes />
			{!visible && (
				<div className="absolute bottom-[42vh] w-full flex justify-center">
					<Button
						onClick={() => setVisible(!visible)}
						className="bg-prime-orange text-white w-full max-w-[320px] h-[40px] ">
						Help me!
					</Button>
				</div>
			)}
			<BottomDrawer visible={visible} onClick={() => setVisible(!visible)}>
				<div className="space-y-5">
					{visible && (
						<section>
							<h1 className="text-prime-orange text-[25px] font-semibold">
								What's Happen?
							</h1>

							<div className="space-y-3 mt-4">
								{event.map((data, idx) => (
									<EventCard
										key={idx}
										img={data.img}
										title={data.title}
										desc={data.desc}
										onClick={() =>
											setIsModalOpen({
												type: 'detail',
												visible: true,
												data: data,
											})
										}
									/>
								))}
							</div>
						</section>
					)}
					<section>
						<h1 className="text-prime-orange text-[25px] font-semibold">
							Quick Help
						</h1>

						<div className="space-y-3 mt-4">
							{[1, 2, 3].map((idx) => (
								<HelpCard key={idx} />
							))}
						</div>
					</section>
				</div>
			</BottomDrawer>
		</div>
	);
};

export default Home;
