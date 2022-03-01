import { useDispatch, useSelector } from 'react-redux';
import { AddCustomerToProjectModalStyled } from './addCustomerToProjectModal.style';
// interfaces
import { RootState } from 'global/redux/rootReducer';
import { IInitialStateProject } from 'slices/project/interfaces';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mainParamPage } from 'global/routes/page';
import { useMutation } from '@apollo/client';
import { ADD_NEW_VIEWER_TO_PROJECT_MUTATION, REMOVE_VIEWER_FROM_PROJECT_MUTATION } from 'apis/projects/mutations';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import { addNewViewerToProject, removeViewerFromProject } from 'slices/project/slice';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
}

const AddCustomerToProjectModal: React.FC<IProps> = ({ hidden, setHidden }) => {
	const { currentProject }: IInitialStateProject = useSelector((state: RootState) => state.project);
	const [ newEmail, setNewEmail ] = useState('');
	const params = useParams();
	const dispatch = useDispatch();

	const [ onAddNewViewerToProject ] = useMutation(ADD_NEW_VIEWER_TO_PROJECT_MUTATION);
	const [ onRemoveViewerFromProject ] = useMutation(REMOVE_VIEWER_FROM_PROJECT_MUTATION);

	const handleChangeNewEmail = async (e: React.FormEvent<HTMLInputElement>) => {
		setNewEmail(e.currentTarget.value);
	};

	const handleAddNewEmail = async () => {
		if (newEmail === '') return;

		const { isError, data } = await fetchDataAndShowNotify({
			fnFetchData: onAddNewViewerToProject,
			variables: { addNewViewerInput: { _projectId: params[mainParamPage.projectId], email: newEmail } },
		});

		if (!isError) {
			dispatch(addNewViewerToProject(data));
			setNewEmail('');
		}
	};

	const handleRemoveEmail = async (email: string) => {
		const { isError, data } = await fetchDataAndShowNotify({
			fnFetchData: onRemoveViewerFromProject,
			variables: { removeViewerInput: { _projectId: params[mainParamPage.projectId], email } },
		});

		if (!isError) {
			dispatch(removeViewerFromProject(data));
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
					{currentProject.viewers.map((item, index) => (
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
