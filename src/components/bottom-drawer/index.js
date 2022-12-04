import { AlertOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const BottomDrawer = ({ children, visible = false, setVisible, ...props }) => {
	//h-[70vh]
	return (
		<div className="relative">
			{!visible && (
				<div className="fixed max-w-[470px] bottom-0 z-30 w-full flex flex-col justify-center bg-white border-t-[1.5px] px-4 py-5">
					<div className="rounded-[100px] bg-green-600 mb-4 text-white text-xs p-2 text-center font-light">
						If you are in trouble, press this button below so other users can
						help you!
					</div>
					<div className="flex w-full items-center">
						<div className="w-[80px] flex items-center justify-center">
							<AlertOutlined className="text-2xl mb-2 text-prime-orange" />
						</div>
						<div className="w-full">
							<Button
								onClick={() => setVisible(!visible)}
								className="bg-prime-orange text-white w-full h-[40px] rounded-[100px] ">
								Help me!
							</Button>
						</div>
					</div>
				</div>
			)}
			<div
				className={`fixed ${
					visible ? 'h-[75vh]' : 'h-[50vh]'
				} rounded-t-[30px] bottom-0 w-full max-w-[470px] px-4 transition-all z-20 overflow-y-auto scrollbar-hide bg-white`}
				{...props}>
				<div className="border-[3px] bg-black border-black max-w-[90px] m-auto mt-4 mb-4 cursor-pointer"></div>
				{children}
			</div>
		</div>
	);
};

export default BottomDrawer;
