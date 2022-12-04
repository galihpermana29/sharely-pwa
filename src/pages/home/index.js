import { Button, message, Select } from 'antd';
import { useState, useEffect } from 'react';
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
import {
	LoadingOutlined,
	LogoutOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
	getTokens,
	onMessageListener,
	subscribeToTopic,
} from '../../config/firebase';
import axios from 'axios';
import SharelyAPI from '../../api/apis';
import { Failed, Success } from '../../components/modal/success';
import UserCard from '../../components/user-card';
import MarkAsDone from '../../components/modal/mark-as-done';

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
	const [currentLoc, setCurrentLoc] = useState([]);
	const [quickHelp, setQuickHelp] = useState([]);
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(false);
	const [statusFilter, setStatusFilter] = useState('ongoing');
	const [coords, setCoords] = useState([]);
	const [currentHelp, setCurrentHelp] = useState([]);

	const [show, setShow] = useState(false);
	const [notification, setNotification] = useState({ title: '', body: '' });
	const [isTokenFound, setTokenFound] = useState(false);
	getTokens(setTokenFound);

	onMessageListener()
		.then((payload) => {
			setShow(true);
			setNotification({
				title: payload.notification.title,
				body: payload.notification.body,
			});
		})
		.catch((err) => console.log('failed: ', err));

	function topicOnMessageHandler(message) {
		console.log(message, 'ttt');
	}

	const getQuickHelp = async () => {
		try {
			setLoading(true);
			const {
				data: { data },
			} = await SharelyAPI.getQuickHelp();
			const coords = data.map((data) => ({
				long: data.longitude,
				lat: data.latitude,
			}));
			setCoords(coords);
			console.log(coords);
			setQuickHelp(data);
		} catch (error) {
			message.error('Error while fetching quick help section..');
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
			console.log(data);
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
			message.error('Error while fetching events..');
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

			const data = await SharelyAPI.createEvent(payload);
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
		const data = await SharelyAPI.createHelp(payload);
		setIsModalOpen({ type: 'success', visible: true });
		getQuickHelp();
		getEvents();
	};

	const handleOpenDrawer = (e) => {
		if (
			e.target.outerHTML ===
			'<div class="border-[3px] bg-black border-black max-w-[90px] m-auto mt-4 mb-4 cursor-pointer"></div>'
		) {
			setVisible(!visible);
		}
	};

	const handleHelp = (data) => {
		setIsModalOpen({ type: 'help', visible: true, data: data });
	};

	const handleFinish = (data) => {
		setIsModalOpen({ type: 'done', visible: true, data });
		console.log(data);
	};

	const handleCancel = async (data) => {
		try {
			const { id } = data;
			const datas = await SharelyAPI.cancelEvent(id);
			setIsModalOpen({ type: 'cancel', visible: true });
			getQuickHelp();
			getEvents();
		} catch (error) {
			message.error('Error while canceling this event...');
		}
	};

	const handleChange = async (val) => {
		setStatusFilter(val);
	};

	const handleMarkDone = async (val) => {
		try {
			const { helper, review } = val;
			const data = await SharelyAPI.markAsDone({ helper, review }, val.eventId);
			console.log(data);
			setIsModalOpen({ type: 'markdone', visible: true });
		} catch (error) {
			console.log(error);
			message.error('Error while marking as done..');
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

	const handleLogout = () => {
		localStorage.removeItem('current_sharely_user');
		localStorage.removeItem('register');
		localStorage.removeItem('user_token');

		window.location.reload();
	};

	useEffect(() => {
		getQuickHelp();
		getEvents();
		subscribeToTopic('help', topicOnMessageHandler).then();
	}, [statusFilter]);

	useEffect(() => {
		getCurrentHelp();
	}, []);

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
			<div
				className="bg-prime-orange absolute top-[14%] right-[10px] z-20 rounded-md cursor-pointer"
				onClick={handleLogout}>
				<LogoutOutlined className=" text-[22px] m-1 p-1  text-white" />
			</div>

			<div className="relative">
				{!loading && (
					<Mapboxes
						currentLoc={currentLoc}
						setCurrentLoc={setCurrentLoc}
						renderMarker={coords}
						currentHelp={currentHelp}
					/>
				)}
			</div>
			<BottomDrawer
				visible={visible}
				onClick={handleOpenDrawer}
				setVisible={setVisible}>
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
									value: 'waiting for help',
									label: 'Waiting For Help',
								},
								{
									value: 'finished',
									label: 'Finished',
								},
							]}
						/>

						{loading && (
							<div className="flex justify-center">
								<LoadingOutlined
									style={{
										fontSize: 30,
									}}
								/>
							</div>
						)}
						{!loading && (
							<div className="space-y-3 mt-4">
								{events.length > 0 ? (
									events.map((data, idx) => (
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
									))
								) : (
									<div className="text-center my-5">
										You have no events running
									</div>
								)}
							</div>
						)}
					</section>
					<section>
						<h1 className="text-prime-orange text-[25px] font-semibold">
							Quick Help
						</h1>
						{loading && (
							<div className="flex justify-center">
								<LoadingOutlined
									style={{
										fontSize: 30,
									}}
								/>
							</div>
						)}
						<div className="space-y-3 mt-4">
							{quickHelp.map((data, idx) => (
								<HelpCard key={idx} data={data} handleHelp={handleHelp} />
							))}
						</div>
					</section>
				</div>
			</BottomDrawer>
		</div>
	);
};

export default Home;
