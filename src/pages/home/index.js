import { message, Select } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import BottomDrawer from '../../components/bottom-drawer';
import HelpCard from '../../components/help-card';

import gas from '../../assets/images/fuel.svg';
import tire from '../../assets/images/tire.svg';
import harm from '../../assets/images/harm.svg';
import custom from '../../assets/images/custom.png';
import './style.scss';
import EventCard from '../../components/event-card';
import Mapboxes from '../../components/map';
import { PdModals } from '../../components/modal';
import DetailHelp from '../../components/modal/detail-help';
import {
	LoadingOutlined,
	LogoutOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { messaging, onMessageListener } from '../../config/firebase';

import axios from 'axios';
import SharelyAPI from '../../api/apis';
import { Failed, Success } from '../../components/modal/success';
import UserCard from '../../components/user-card';
import MarkAsDone from '../../components/modal/mark-as-done';
import { useRef } from 'react';
import { useMemo } from 'react';
import { getToken } from 'firebase/messaging';
import useSWR from 'swr';

const event = [
	{
		title: 'Custom',
		desc: 'You can customize the event that you want to create',
		img: custom,
	},
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

// const config = {
// 	headers: {
// 		Authorization: `Bearer ${localStorage.getItem(`user_token`)}`,
// 	},
// };

const Home = () => {
	const userId = JSON.parse(localStorage.getItem('current_sharely_user')).id;

	const [visible, setVisible] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState({
		type: '',
		visible: false,
	});
	const [currentLoc, setCurrentLoc] = useState([]);

	const [loading, setLoading] = useState(false);
	const [statusFilter, setStatusFilter] = useState('ongoing');

	const [currentHelp, setCurrentHelp] = useState([]);
	const drawerOpen = useRef(false);
	const [show, setShow] = useState(false);
	const [notif, setNotif] = useState({ title: '', body: '' });

	const [coords, setCoords] = useState([]);
	const [quickHelp, setQuickHelp] = useState([]);
	const [events, setEvents] = useState([]);

	const getQuickHelp = async () => {
		try {
			setLoading(true);
			const {
				data: { data },
			} = await SharelyAPI.getQuickHelp();
			setCoords(data);
			setQuickHelp(data);
		} catch (error) {
			// message.error('Error while fetching quick help section..');
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const getCurrentHelp = async () => {
		const userId = JSON.parse(localStorage.getItem('current_sharely_user')).id;
		try {
			const { data } = await SharelyAPI.getEventWhichHelped(userId);
			setCurrentHelp(data.data[0]);
		} catch (error) {
			console.log(error);
		}
	};

	const getEvents = async () => {
		try {
			setLoading(true);
			const userId = JSON.parse(
				localStorage.getItem('current_sharely_user')
			).id;
			const {
				data: { data },
			} = await SharelyAPI.getUserEvents(userId, statusFilter);

			setEvents(data);
		} catch (error) {
			// message.error('Error while fetching events..');
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleCloseModal = () => {
		setIsModalOpen({ type: '', visible: false });
	};

	const getPlaceName = async () => {
		const { data } = await axios.get(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${currentLoc[0]},${currentLoc[1]}.json?access_token=pk.eyJ1IjoiZ2FsaWhwZXJtYW5hMjkiLCJhIjoiY2xhZTZybzBhMGNwbDNxbzlxN284NzBvbCJ9.vW68KDX_nY_y6ynbkOaRUg`
		);
		const place = data.features[0].place_name;
		return place;
	};

	const handleCreateEvent = async (val) => {
		const { phoneNumber, detail, title } = val;
		const place = await getPlaceName();
		try {
			const payload = {
				userId: JSON.parse(localStorage.getItem('current_sharely_user')).id,
				latitude: currentLoc[1].toString(),
				longitude: currentLoc[0].toString(),
				place,
				detail,
				title,
				phoneNumber: phoneNumber.toString(),
			};

			await SharelyAPI.createEvent(payload);
			setIsModalOpen({ type: 'success', visible: true });
			getQuickHelp();
			getEvents();
		} catch (error) {
			if (error.response.data.message === 'Invalid, Event has been created') {
				message.error(
					'You already have an ongoing event! mark as done or cancel so you can create the new one!'
				);
			} else {
				message.error('Error while creating event..');
				console.log(error);
			}
			handleCloseModal();
		}
	};

	const handleCreateHelp = async (val) => {
		const place = await getPlaceName();
		const payload = {
			...val,
			place,
		};
		await SharelyAPI.createHelp(payload);
		setIsModalOpen({ type: 'successHelp', visible: true });
		getQuickHelp();
		getEvents();
		getCurrentHelp();
	};

	const handleOpenDrawer = useCallback(
		(e) => {
			if (
				e.target.outerHTML ===
					'<div class="border-[3px] bg-transparent border-black max-w-[90px] m-auto mt-4 mb-4 cursor-pointer"></div>' ||
				e.target.outerHTML ===
					'<div class="border-[3px] bg-transparent border-none max-w-[90px] p-2 m-auto mt-4 mb-4 cursor-pointer"><div class="border-[3px] bg-transparent border-black max-w-[90px] m-auto mt-4 mb-4 cursor-pointer"></div></div>'
			) {
				setVisible(!visible);
			}
		},
		[visible]
	);

	const handleHelp = (data) => {
		setIsModalOpen({ type: 'help', visible: true, data: data });
	};

	const handleFinish = (data) => {
		setIsModalOpen({ type: 'done', visible: true, data });
	};

	const handleCancel = async (data) => {
		try {
			const { id } = data;
			await SharelyAPI.cancelEvent(id);
			setIsModalOpen({ type: 'cancel', visible: true });
			getQuickHelp();
			getEvents();
		} catch (error) {
			message.error('Error while canceling this event...');
		}
	};

	const handleChange = async (val) => {
    console.log(val, 'a')
		setStatusFilter(val);
	};

	const handleMarkDone = async (val) => {
		try {
			const { helper, review } = val;
			await SharelyAPI.markAsDone({ helper, review }, val.eventId);
			setIsModalOpen({ type: 'markdone', visible: true });
			getQuickHelp();
			getEvents();
		} catch (error) {
			console.log(error);
			message.error('Error while marking as done..');
		}
	};

	const subscibeToTopics = async () => {
		const fcmToken = await getToken(messaging, {
			vapidKey:
				'BCpuoXtEoGnsEyXEUede3NJs-qlphjwCSS6DAYsLLmybdx9bKt9KM33IN-uAHl2mQIzepk75hT3YbuhAqYsXy_A',
		});
		if (fcmToken) {
			try {
				const userId = JSON.parse(
					localStorage.getItem('current_sharely_user')
				).id;

				const { data } = await SharelyAPI.subscribeToTopics(
					{ fcmToken },
					userId
				);
				console.log(data, 'subscribed');
			} catch (error) {
				console.log(error);
			}
		}
	};

	const modalContent = {
		detail: <DetailHelp data={isModalOpen.data} onFinish={handleCreateEvent} />,
		success: (
			<Success
				title="Successfully Create Event!"
				desc="Be patient for waiting other people responding you, you are not alone!"
			/>
		),
		successHelp: (
			<Success
				title="Now you are a helper!"
				desc="They need your help, so help them quickly!"
			/>
		),
		help: (
			<DetailHelp
				data={isModalOpen.data}
				onFinish={handleCreateHelp}
				purpose="help"
			/>
		),
		cancel: <Failed title="Ooops" desc="You have canceled this events" />,
		done: <MarkAsDone onFinish={handleMarkDone} data={isModalOpen.data} />,
		markdone: (
			<Success
				title="Done!"
				desc="Thanks for not afraid when you are facing a problems, hope you have great day!"
			/>
		),
	};

	const child2 = useMemo(() => {
		return (
			<Mapboxes
				currentLoc={currentLoc}
				setCurrentLoc={setCurrentLoc}
				renderMarker={coords}
				currentHelp={currentHelp}
			/>
		);
	}, [currentLoc, setCurrentLoc, coords, currentHelp]);

	const handleLogout = () => {
		localStorage.removeItem('current_sharely_user');
		localStorage.removeItem('register');
		localStorage.removeItem('user_token');

		window.location.reload();
	};

	useEffect(() => {
		getQuickHelp();
		getEvents();
		subscibeToTopics();
	}, [statusFilter]);

	useEffect(() => {
		onMessageListener()
			.then((payload) => {
				getQuickHelp();
				getEvents();
				getCurrentHelp();
				console.log(payload, 'terima message');
				setShow(true);
				setNotif({
					title: payload.notification.title,
					body: payload.notification.body,
				});
			})
			.catch((err) => console.log('failed: ', err));
		getCurrentHelp();
	}, []);
	return (
		<>
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
				<div
					className="bg-prime-orange absolute top-[14%] right-[10px] z-20 rounded-md cursor-pointer"
					onClick={handleLogout}>
					<LogoutOutlined className=" text-[22px] m-1 p-1  text-white" />
				</div>

				<div className="relative">{!loading && child2}</div>

				<BottomDrawer
					visible={visible}
					onClick={handleOpenDrawer}
					ref={drawerOpen}
					currentHelp={currentHelp}
					setVisible={setVisible}>
					<div className="space-y-5">
						{visible && (
							<section>
								<h1 className="text-prime-orange text-[25px] font-semibold">
									What's Happen?
								</h1>

								<div className="space-y-3 mt-4 max-h-[350px] overflow-y-scroll">
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
								Your Events
							</h1>
							<Select
								defaultValue="ongoing"
								className="w-full mt-2"
								onChange={handleChange}
								options={[
									{
										value: 'ongoing',
										label: 'On Going',
									},
									{
										value: 'finished',
										label: 'Finished',
									},
								]}
							/>
							{loading && (
								<>
									<div className="flex justify-center mt-4">
										<LoadingOutlined
											style={{
												fontSize: 30,
											}}
										/>
									</div>
								</>
							)}
							{events && (
								<div className="space-y-3 mt-4">
									{events.length > 0 ? (
										events.map((data, idx) => (
											<>
												<UserCard
													key={idx}
													title={data.title}
													desc={data.detail}
													data={data}
													onClick={() =>
														setIsModalOpen({
															type: 'detail',
															visible: true,
															data: data,
														})
													}
													handleFinish={handleFinish}
													handleCancel={handleCancel}
												/>
											</>
										))
									) : (
										<div className="text-center my-5">You have no events</div>
									)}
								</div>
							)}
						</section>
						<section className="mb-10">
							<h1 className="text-prime-orange text-[25px] font-semibold">
								Quick Help
							</h1>
							{!quickHelp && (
								<div className="flex justify-center">
									<LoadingOutlined
										style={{
											fontSize: 30,
										}}
									/>
								</div>
							)}
							<div className="space-y-3 mt-4">
								<div className="space-y-3 mt-4">
									{quickHelp.length > 0 ? (
										quickHelp.map((data, idx) => (
											<HelpCard key={idx} data={data} handleHelp={handleHelp} />
										))
									) : (
										<div className="text-center my-5">
											There is no someone need to be help
										</div>
									)}
								</div>
							</div>
						</section>
					</div>
				</BottomDrawer>
			</div>
		</>
	);
};

export default Home;
