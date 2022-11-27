const BottomDrawer = ({ children, visible = false, ...props }) => {
	//h-[70vh]
	return (
		<div
			className={`fixed ${
				visible ? 'h-[75vh]' : 'h-[40vh]'
			} rounded-t-[30px] bottom-0 w-full max-w-[470px] border-black px-4 transition-all z-20 overflow-y-auto scrollbar-hide bg-white`}
			{...props}>
			<div className="border-[2px] max-w-[90px] m-auto mt-4 mb-4 cursor-pointer"></div>
			{children}
		</div>
	);
};

export default BottomDrawer;
