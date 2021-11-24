import React from 'react';

// Styled Components
import { ListModalStyled } from './listModal.styled';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	onSubmit(): void;
}

const ShareModal: React.FC<IProps> = ({ hidden, setHidden, onSubmit }) => {
	return (
		<ListModalStyled
			centered
			visible={hidden}
			footer={null}
			className='modal__list-modal'
			onCancel={() => setHidden(false)}
			width={650}
		>
			<div className='list-modal__container'>
				<div className='list-modal__header'>
					<div className='list-modal__header__title'>Create List</div>
					<div className='list-modal__header__close' onClick={() => setHidden(false)}>
						X
					</div>
				</div>
				<div className='list-modal__body'>
					<div className='list-modal__body__input'>
						<label htmlFor='list'>List Name</label>
						<input type='text' name='list' />
					</div>
				</div>
			</div>
		</ListModalStyled>
	);
};

export default ShareModal;
