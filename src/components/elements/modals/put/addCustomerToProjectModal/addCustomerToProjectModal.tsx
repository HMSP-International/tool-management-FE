import { AddCustomerToProjectModalStyled } from './addCustomerToProjectModal.style';
// interfaces
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mainParamPage } from 'global/routes/page';
import { useMutation } from '@apollo/client';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import {
	ADD_NEW_VIEWER_TO_SPACE_MUTATION,
	GET_SPACE_BY_PROJECT_ID_MUTATION,
	REMOVE_VIEWER_FROM_SPACE_MUTATION,
} from 'apis/spaces/mutations';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
}

const AddCustomerToProjectModal: React.FC<IProps> = ({ hidden, setHidden }) => {
	const [ newEmail, setNewEmail ] = useState('');
	const [ viewers, setViewers ] = useState<string[]>([]);
	const [ spaceId, setSpaceId ] = useState<string>('');
	const params = useParams();

	const [ onGetSpaceByProjectId ] = useMutation(GET_SPACE_BY_PROJECT_ID_MUTATION);
	const [ onAddNewViewerToProject ] = useMutation(ADD_NEW_VIEWER_TO_SPACE_MUTATION);
	const [ onRemoveViewerFromProject ] = useMutation(REMOVE_VIEWER_FROM_SPACE_MUTATION);

	useEffect(
		() => {
			const fetchData = async () => {
				const { isError, data } = await fetchDataAndShowNotify({
					fnFetchData: onGetSpaceByProjectId,
					variables: { findByProjectId: { _projectId: params[mainParamPage.projectId] } },
				});

				if (!isError) {
					setSpaceId(data._id);
					setViewers(data.viewers);
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
		console.log(spaceId);
		const { isError, data } = await fetchDataAndShowNotify({
			fnFetchData: onAddNewViewerToProject,
			variables: { addNewViewerInput: { _spaceId: spaceId, email: newEmail } },
		});

		if (!isError) {
			setViewers(data.viewers);
			setNewEmail('');
		}
	};

	const handleRemoveEmail = async (email: string) => {
		const { isError, data } = await fetchDataAndShowNotify({
			fnFetchData: onRemoveViewerFromProject,
			variables: { removeViewerInput: { _spaceId: spaceId, email } },
		});

		if (!isError) {
			setViewers(data.viewers);
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
