import React, { useRef, useState } from 'react';

// Styled Components
import { ListModalStyled } from './createListModal.styled';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	onSubmit(nameList: string): void;
}

const CreateListModal: React.FC<IProps> = ({ hidden, setHidden, onSubmit }) => {
	const [ isValidName, setInValidName ] = useState(true);
	const [ messageError, setMessageError ] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = () => {
		if (inputRef && inputRef.current) {
			if (inputRef.current.value.length === 0) {
				setMessageError('Please enter your list name');
				setInValidName(false);
			}
			else {
				// query Backend
				onSubmit(inputRef.current.value);
			}
		}
	};

	const handleChangeInput = () => {
		if (inputRef && inputRef.current) {
			if (inputRef.current.value.length > 0) {
				setMessageError('');
				setInValidName(true);
			}
			else {
				setMessageError('Please enter your list name');
				setInValidName(false);
			}
		}
	};

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
						<label htmlFor='list' className={isValidName ? '' : 'text-error'}>
							List Name
						</label>
						<input
							type='text'
							name='list'
							onChange={handleChangeInput}
							ref={inputRef}
							placeholder='Enter your list'
						/>
						{!isValidName && (
							<label htmlFor='' className={isValidName ? '' : 'text-error'}>
								{messageError}
							</label>
						)}
					</div>
				</div>

				<div className='list-modal__footer'>
					<div className='list-modal__footer__button'>
						<button onClick={handleSubmit}>Create List</button>
					</div>
				</div>
			</div>
		</ListModalStyled>
	);
};

export default CreateListModal;
