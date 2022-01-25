import React, { useContext, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
// components
import LoadingView from 'components/shared/loadingView/loadingView';
// Styled Components
import { ListModalStyled } from './createListModal.styled';
// graphql
import { useMutation } from '@apollo/client';
import { CREATE_LIST_MUTATION } from 'apis/taskList/mutations';
// redux
import { useDispatch } from 'react-redux';
import { createNewList } from 'slices/taskList/slice';
// helpers
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import { convertTaskList } from 'helpers/formatData/convertTaskList';
// socket
import { SocketContext } from 'socketIO/context';
import { listEvents } from 'socketIO/events/listEvents';
// interfaces
interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
}

const CreateListModal: React.FC<IProps> = ({ hidden, setHidden }) => {
	const [ isValidName, setInValidName ] = useState(true);
	const [ messageError, setMessageError ] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const params = useParams();
	const socket = useContext(SocketContext);
	// graphql
	const [ onCreateList, { loading: loadingCreateList } ] = useMutation(CREATE_LIST_MUTATION);
	// redux
	const dispatch = useDispatch();

	const handleSubmit = () => {
		if (inputRef && inputRef.current) {
			if (inputRef.current.value.length === 0) {
				setMessageError('Please enter your list name');
				setInValidName(false);
			}
			else {
				// query Backend
				handleCreateList(inputRef.current.value);
			}
		}
	};

	const handleCreateList = async (name: string) => {
		const { isError, data } = await fetchDataAndShowNotify({
			fnFetchData: onCreateList,
			variables:
				{
					createListInput:
						{
							_projectId: params._projectId,
							name,
						},
				},
		});

		if (!isError) {
			const list = convertTaskList([ data ]);
			dispatch(createNewList(list));
			socket.emit(listEvents.handleCreateList, { data: list, _projectId: params._projectId || '' });
			setHidden(false);
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

	if (loadingCreateList) {
		return <LoadingView />;
	}

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
