import React, { useState, useRef, useEffect } from 'react';
import { ISpace } from 'slices/space/interfaces';
// Styled Components
import { WorkSpaceModalStyled } from './putSpaceModal.styled';
import LoadingView from 'components/shared/loadingView/loadingView';
// grahql
import { CHANGE_NAME_SPACE_SPACE_MUTATION, DELETE_SPACE_MUTATION } from 'apis/spaces/mutations';
import { useMutation } from '@apollo/client';
// helpers
import { fetchDataAndShowNotify } from 'global/helpers/graphql/fetchDataAndShowNotify';
// redux
import { useDispatch } from 'react-redux';
import { changeNameSpace, deleteSpace } from 'slices/space/slice';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	onSubmit(nameSpace: string): void;
	currentSpace: ISpace;
}

const PutWorkSpaceModal: React.FC<IProps> = ({ hidden, setHidden, onSubmit, currentSpace }) => {
	const [ onChangeNameSpace, { loading: loadingChangeName } ] = useMutation(CHANGE_NAME_SPACE_SPACE_MUTATION);
	const [ onDeleteSpace, { loading: loadingDeleteSpace } ] = useMutation(DELETE_SPACE_MUTATION);
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

	const handleUpdateNewSpace = async () => {
		if (inputRef && inputRef.current) {
			if (inputRef.current.value.length === 0) {
				showError();
			}
			else {
				if (!loadingChangeName) {
					const { isError, data } = await fetchDataAndShowNotify({
						fnFetchData: onChangeNameSpace,
						variables:
							{
								changeNameSpaceInput:
									{
										name: inputRef.current.value,
										_id: currentSpace._id,
									},
							},
						message: 'Change Name Space',
					});

					if (!isError) {
						dispatch(changeNameSpace(data));
						setHidden(false);
					}
				}
			}
		}
	};

	const handleDeleteSpace = async () => {
		const { data, isError } = await fetchDataAndShowNotify({
			fnFetchData: onDeleteSpace,
			variables:
				{
					deleteSpaceInput:
						{
							_spaceId: currentSpace._id,
						},
				},
			message: 'Delete Space',
		});

		if (!isError) {
			dispatch(deleteSpace(data));
			setHidden(false);
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

	if (loadingChangeName || loadingDeleteSpace) return <LoadingView />;

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
						<button onClick={handleDeleteSpace}>Delete Space</button>
					</div>
					<div className='modal__work-space-modal__button'>
						<button onClick={handleUpdateNewSpace}>Update NameSpace</button>
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
