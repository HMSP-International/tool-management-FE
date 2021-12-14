import React from 'react';
// graphql
import { useMutation } from '@apollo/client';
import { DELETE_LIST_MUTATION } from 'apis/taskList/mutations';
// interfaces
import { IList } from 'slices/taskList/interfaces';
// redux
import { deleteTaskList } from 'slices/taskList/slice';
import { useDispatch } from 'react-redux';
// helpers
import { openNotification } from 'global/helpers/notification';
import { handleApolloError } from 'global/helpers/apolloError';
// components
import LoadingView from 'components/shared/loadingView/loadingView';
// Styled Components
import { DeleteTaskListModalStyled } from './deleteTaskListModal.styled';
interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	listId: string;
}

const DeleteTaskListModal: React.FC<IProps> = ({ hidden, setHidden, listId }) => {
	const [ onDeleteList, { loading } ] = useMutation(DELETE_LIST_MUTATION);
	const dispatch = useDispatch();

	const hanldeDeleteListTask = async () => {
		try {
			const { data } = await onDeleteList({
				variables:
					{
						deleteListInput:
							{
								_listId: listId,
							},
					},
			});

			const listDeleted: IList = data.deleteLists;
			dispatch(deleteTaskList(listDeleted._id));

			const showing = {
				title: 'Susscess',
				extensions: [ 'Deleted List' ],
			};
			openNotification(showing);
		} catch (error) {
			const showing = handleApolloError(error);
			openNotification(showing, true);
		}
	};

	if (loading) return <LoadingView />;

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
					All Task on this list will be deleted
				</div>
				<div className='delete-task-list-modal__btn'>
					<button onClick={hanldeDeleteListTask}>Delete</button>
				</div>
			</div>
		</DeleteTaskListModalStyled>
	);
};

export default DeleteTaskListModal;
