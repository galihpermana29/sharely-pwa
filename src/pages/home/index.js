import { Button } from 'antd';
import { useState } from 'react';
import BottomDrawer from '../../components/bottom-drawer';
import HelpCard from '../../components/help-card';

import gas from '../../assets/images/fuel.svg';
import tire from '../../assets/images/tire.svg';
import harm from '../../assets/images/harm.svg';
import './style.scss';
import EventCard from '../../components/event-card';

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
	return (
		<div className="home-wrappers relative">
			<iframe
				className="w-full h-screen"
				src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=universitas brawijaya&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
				frameborder="0"></iframe>
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
