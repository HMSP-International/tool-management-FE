import React, { useState, useRef, useEffect } from 'react';
import { ISpace } from 'slices/space/interfaces';
// Styled Components
import { WorkSpaceModalStyled } from './putSpaceModal.styled';
// grahql
import { CHANGE_NAME_SPACE_SPACE_MUTATION } from '../../../../apis/spaces/mutations';
import { useMutation } from '@apollo/client';
// helpers
import { handleApolloError } from 'global/helpers/apolloError';
import { openNotification } from 'global/helpers/notification';
// redux
import { useDispatch } from 'react-redux';
import { changeNameSpace } from '../../../../slices/space/slice';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	onSubmit(nameSpace: string): void;
	currentSpace: ISpace;
}

const PutWorkSpaceModal: React.FC<IProps> = ({ hidden, setHidden, onSubmit, currentSpace }) => {
	const [ onChangeNameSpace, { loading } ] = useMutation(CHANGE_NAME_SPACE_SPACE_MUTATION);
	const [ isValidName, setInValidName ] = useState(true);
	const [ messageError, setMessageError ] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const dispatch = useDispatch();

	useEffect(
		() => {
			if (inputRef && inputRef.current) {
				inputRef.current.value = currentSpace.name;
			}
		},
		[ currentSpace ],
	);

	const showError = () => {
		setMessageError('Please enter your space name');
		setInValidName(false);
	};

	const updateNewSpace = async () => {
		if (inputRef && inputRef.current) {
			if (inputRef.current.value.length === 0) {
				showError();
			}
			else {
				if (!loading) {
					try {
						const { data } = await onChangeNameSpace({
							variables:
								{
									changeNameSpaceInput:
										{
											name: inputRef.current.value,
											_id: currentSpace._id,
										},
								},
						});

						dispatch(changeNameSpace(data.changeNameSpace));

						const showing = {
							title: 'Susscess',
							extensions: [ 'Change Name Space' ],
						};
						openNotification(showing);
					} catch (error) {
						const showing = handleApolloError(error);
						openNotification(showing, true);
					}
				}
			}
		}
	};

	const handleOpenSpaceSubmit = () => {
		if (inputRef && inputRef.current)
			if (inputRef.current.value.length === 0) {
				showError();
			}
			else {
				onSubmit(inputRef.current.value);
			}
	};

	const handleChangeInput = () => {
		if (inputRef && inputRef.current) {
			if (inputRef.current.value.length > 0) {
				setMessageError('');
				setInValidName(true);
			}
			else {
				showError();
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
				<div className='modal__work-space-modal__title'>Edit New Space</div>
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
				<div className='modal__work-space-modal__btn-group'>
					<div className='modal__work-space-modal__button'>
						<button onClick={updateNewSpace}>Update NameSpace</button>
					</div>
					<div className='modal__work-space-modal__button'>
						<button onClick={handleOpenSpaceSubmit}>Next</button>
					</div>
				</div>
			</WorkSpaceModalStyled>
		</React.Fragment>
	);
};

export default PutWorkSpaceModal;
