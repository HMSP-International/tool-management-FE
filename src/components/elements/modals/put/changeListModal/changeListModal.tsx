import React, { useRef, useState } from 'react';
// components
import LoadingView from 'components/shared/loadingView/loadingView';
// Styled Components
import { ListModalStyled } from './changeListModal.styled';
// graphql
import { useMutation } from '@apollo/client';
import { CHANGE_NAME_LIST_MUTATION } from 'apis/taskList/mutations';
// redux
// helpers
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
// interfaces
interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	listId: string;
}

const ChangeListModal: React.FC<IProps> = ({ hidden, setHidden, listId }) => {
	const [ isValidName, setInValidName ] = useState(true);
	const [ messageError, setMessageError ] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	// graphql
	const [ onChangeList, { loading: loadingChangeList } ] = useMutation(CHANGE_NAME_LIST_MUTATION);
	// redux

	const handleSubmit = () => {
		if (inputRef && inputRef.current) {
			if (inputRef.current.value.length === 0) {
				setMessageError('Please enter your list name');
				setInValidName(false);
			}
			else {
				// query Backend
				handleSubmitChangeList(inputRef.current.value);
			}
		}
	};

	const handleSubmitChangeList = async (name: string) => {
		const { isError } = await fetchDataAndShowNotify({
			fnFetchData: onChangeList,
			variables: { changeNameListInput: { _listId: listId, name } },
		});

		if (!isError) {
			window.location.reload();
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

	if (loadingChangeList) {
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
					<div className='list-modal__header__title'>Change List</div>
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

export default ChangeListModal;
