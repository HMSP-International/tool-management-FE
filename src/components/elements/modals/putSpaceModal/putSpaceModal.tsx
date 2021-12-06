import React, { useState, useRef, useEffect } from 'react';
import { ISpace } from 'slices/space/interfaces';
// Styled Components
import { WorkSpaceModalStyled } from './putSpaceModal.styled';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	onSubmit(nameSpace: string): void;
	currentSpace: ISpace;
}

const PutWorkSpaceModal: React.FC<IProps> = ({ hidden, setHidden, onSubmit, currentSpace }) => {
	const [ isValidName, setInValidName ] = useState(true);
	const [ messageError, setMessageError ] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(
		() => {
			if (inputRef && inputRef.current) {
				inputRef.current.value = currentSpace.name;
			}
		},
		[ currentSpace ],
	);

	const handleSubmit = () => {
		if (inputRef && inputRef.current) {
			if (inputRef.current.value.length === 0) {
				setMessageError('Please enter your spane name');
				setInValidName(false);
			}
			else {
				// query Backend
				if (true) {
					onSubmit(inputRef.current.value);
				}
				else {
					// return error from DB
				}
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
				setMessageError('Please enter your spane name');
				setInValidName(false);
			}
		}
	};

	return (
		<React.Fragment>
			<WorkSpaceModalStyled
				centered
				visible={hidden}
				onCancel={() => {
					setHidden(false);
				}}
				footer={null}
				className='modal__work-space-modal'
			>
				<div className='modal__work-space-modal__logo'>
					<img
						src='https://lh3.googleusercontent.com/sYGCKFdty43En6yLGeV94mfNGHXfVj-bQYitHRndarB7tHmQq_kyVxhlPejeCBVEEYUbnKG2_jUzgNXoPoer6XJm71V3uz2Z6q0CmNw=w0'
						alt=''
					/>
				</div>
				<div className='modal__work-space-modal__title'>Create New Space</div>
				<div className='modal__work-space-modal__input'>
					<label htmlFor='' className={isValidName ? '' : 'text-error'}>
						Space Name
					</label>
					<input
						name='space'
						type='text'
						placeholder='Enter Space Name'
						ref={inputRef}
						onChange={handleChangeInput}
					/>
					{!isValidName && (
						<label htmlFor='' className={isValidName ? '' : 'text-error'}>
							{messageError}
						</label>
					)}
				</div>
				<div className='modal__work-space-modal__button'>
					<button onClick={handleSubmit}>Next</button>
				</div>
			</WorkSpaceModalStyled>
		</React.Fragment>
	);
};

export default PutWorkSpaceModal;