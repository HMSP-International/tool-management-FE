import React from 'react';
// Styled Components
import { ModalStyled } from './taskDetail.styled';
// interfaces
interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
}

const TaskDetail: React.FC<IProps> = ({ hidden, setHidden }) => {
	return (
		<ModalStyled
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
		</ModalStyled>
	);
};

export default TaskDetail;
