import { Button } from 'antd';

const BottomDrawer = ({ children, visible = false, setVisible, ...props }) => {
	//h-[70vh]
	return (
		<div className="relative">
			{!visible && (
				<div className="fixed  max-w-[470px] bottom-[42vh] w-full flex justify-center">
					<Button
						onClick={() => setVisible(!visible)}
						className="bg-prime-orange text-white w-full max-w-[320px] h-[40px] ">
						Help me!
					</Button>
				</div>
			)}
			<div
				className={`fixed ${
					visible ? 'h-[75vh]' : 'h-[40vh]'
				} rounded-t-[30px] bottom-0 w-full max-w-[470px] px-4 transition-all z-20 overflow-y-auto scrollbar-hide bg-white`}
				{...props}>
				<div className="border-[3px] bg-black border-black max-w-[90px] m-auto mt-4 mb-4 cursor-pointer"></div>
				{children}
			</div>
		</div>
	);
};

export default BottomDrawer;
