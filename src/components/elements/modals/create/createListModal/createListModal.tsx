import React, { useRef, useState } from 'react';
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
import { openNotification } from 'global/helpers/notification';
import { handleApolloError } from 'global/helpers/apolloError';
import { useParams } from 'react-router-dom';
import { convertTaskList } from 'global/helpers/convertTaskList';
// interfaces
import { IList } from 'slices/taskList/interfaces';
interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
}

const CreateListModal: React.FC<IProps> = ({ hidden, setHidden }) => {
	const [ isValidName, setInValidName ] = useState(true);
	const [ messageError, setMessageError ] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const params = useParams();

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
		try {
			const { data } = await onCreateList({
				variables:
					{
						createListInput:
							{
								_projectId: params._id,
								name,
							},
					},
			});

			const list: IList = data.createList;
			const convertedList = convertTaskList([ list ]);

			dispatch(createNewList(convertedList));
			setHidden(false);

			const showing = {
				title: 'Susscess',
				extensions: [ 'Created new list' ],
			};
			openNotification(showing);
		} catch (error) {
			const showing = handleApolloError(error);
			openNotification(showing, true);
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
