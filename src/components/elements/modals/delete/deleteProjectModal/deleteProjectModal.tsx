import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// graphql
import { useMutation } from '@apollo/client';
import { DELETE_PROJECT_MUTATION } from 'apis/projects/mutations';
// interfaces
// redux
import { deleteProject } from 'slices/project/slice';
import { useDispatch } from 'react-redux';
// helpers
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
// components
import LoadingView from 'components/shared/loadingView/loadingView';
// Styled Components
import { DeleteTaskListModalStyled } from './deleteProjectModal.styled';
import { mainParamPage } from 'global/routes/page';
// socket

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
}

const DeleteTaskListModal: React.FC<IProps> = ({ hidden, setHidden }) => {
	const [ onDeleteProject, { loading } ] = useMutation(DELETE_PROJECT_MUTATION);
	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();

	if (loading) return <LoadingView />;

	const handleDeleteProject = async () => {
		const { data, isError } = await fetchDataAndShowNotify({
			fnFetchData: onDeleteProject,
			variables: { deleteProjectInput: { _projectId: params[mainParamPage.projectId] } },
		});

		if (!isError) {
			dispatch(deleteProject(data));
			setHidden(false);
			navigate('/');
		}
	};

	return (
		<DeleteTaskListModalStyled
			centered
			visible={hidden}
			footer={null}
			className='modal__delete-task-list-modal'
			onCancel={() => setHidden(false)}
		>
			<div className='delete-task-list-modal__container'>
				<div className='delete-task-list-modal__question'>Are you sure delete </div>
				<div className='delete-task-list-modal__name' style={{ color: 'red' }}>
					All Task and List on this project will be deleted
				</div>
				<div className='delete-task-list-modal__btn'>
					<button onClick={handleDeleteProject}>Delete</button>
				</div>
			</div>
		</DeleteTaskListModalStyled>
	);
};

export default DeleteTaskListModal;
