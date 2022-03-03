import { AddCustomerToProjectModalStyled } from './addCustomerToProjectModal.style';
// interfaces
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import { ADD_EMAIL_TO_VIEWER, GET_REVIEWS_MUTATION, REMOVE_EMAIL_FROM_VIEWER_MUTATION } from 'apis/viewers/mutations';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
}

const AddCustomerToProjectModal: React.FC<IProps> = ({ hidden, setHidden }) => {
	const [ newEmail, setNewEmail ] = useState('');
	const [ viewers, setViewers ] = useState<string[]>([]);
	const params = useParams();

	const [ onGetSpaceByProjectId ] = useMutation(GET_REVIEWS_MUTATION);
	const [ onAddNewViewerToProject ] = useMutation(ADD_EMAIL_TO_VIEWER);
	const [ onRemoveViewerFromProject ] = useMutation(REMOVE_EMAIL_FROM_VIEWER_MUTATION);

	useEffect(
		() => {
			const fetchData = async () => {
				const { isError, data } = await fetchDataAndShowNotify({
					fnFetchData: onGetSpaceByProjectId,
				});

				if (!isError) {
					setViewers(data.emails);
				}
			};

			fetchData();
		},
		[ onGetSpaceByProjectId, params ],
	);

	const handleChangeNewEmail = async (e: React.FormEvent<HTMLInputElement>) => {
		setNewEmail(e.currentTarget.value);
	};

	const handleAddNewEmail = async () => {
		if (newEmail === '') return;

		const { isError, data } = await fetchDataAndShowNotify({
			fnFetchData: onAddNewViewerToProject,
			variables: { addNewEmail: { email: newEmail } },
		});

		if (!isError) {
			setViewers(data.emails);
			setNewEmail('');
		}
	};

	const handleRemoveEmail = async (email: string) => {
		const { isError, data } = await fetchDataAndShowNotify({
			fnFetchData: onRemoveViewerFromProject,
			variables: { removeEmail: { email } },
		});

		if (!isError) {
			setViewers(data.emails);
		}
	};

	return (
		<AddCustomerToProjectModalStyled
			centered
			visible={hidden}
			footer={null}
			className=''
			onCancel={() => setHidden(false)}
		>
			<section className='modal-add-customer-to-project'>
				<div className='input-email'>
					<input
						type='text'
						placeholder='Add new customer'
						onChange={handleChangeNewEmail}
						value={newEmail}
						name='email'
					/>
					<button onClick={handleAddNewEmail}>Add</button>
				</div>

				<div className='group-email'>
					{viewers.map((item, index) => (
						<div className='group-email__item' key={index + item}>
							<span className='stt'>{index + 1}. </span>
							<span className='email'>{item}</span>
							<span className='delete' onClick={() => handleRemoveEmail(item)}>
								X
							</span>
						</div>
					))}
				</div>
			</section>
		</AddCustomerToProjectModalStyled>
	);
};

export default AddCustomerToProjectModal;
