import React from 'react';
import { Modal } from 'antd';
// Styled Components
// interfaces
interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
}

const TaskDetail: React.FC<IProps> = ({ hidden, setHidden }) => {
	return (
		<Modal
			centered
			visible={hidden}
			onCancel={() => {
				setHidden(false);
			}}
			width={1500}
			footer={null}
			className='modal__task-detail'
		>
			<div className='modal__'>1</div>

			<div className='modal__'>2</div>
		</Modal>
	);
};

export default TaskDetail;
