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
// socket
// import { SocketContext } from 'socketIO/context';
// import { projectEvents } from 'socketIO/events/projectEvents';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
}

const DeleteTaskListModal: React.FC<IProps> = ({ hidden, setHidden }) => {
	const [ onDeleteProject, { loading } ] = useMutation(DELETE_PROJECT_MUTATION);
	const dispatch = useDispatch();
	const params = useParams();
	// const socket = useContext(SocketContext);
	const navigate = useNavigate();

	if (loading) return <LoadingView />;

	const handleDeleteProject = async () => {
		const { data, isError } = await fetchDataAndShowNotify({
			fnFetchData: onDeleteProject,
			variables: { deleteProjectInput: { _projectId: params._projectId } },
		});

		if (!isError) {
			dispatch(deleteProject(data));
			setHidden(false);
			// socket.emit(projectEvents.handleDeleteProject, { data, _projectId: params._projectId || '' });
			// window.location.replace('/');
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
