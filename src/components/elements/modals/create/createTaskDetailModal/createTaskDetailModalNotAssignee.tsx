import React, { useContext, useState } from 'react';
// Styled Components
import { ModalStyled } from './createTaskDetailModal.styled';
// components
import Image from 'components/shared/image/image';
import TinyMce from 'components/shared/tinyMce/tinyMce';
import LoadingView from 'components/shared/loadingView/loadingView';
import ListUserBeLongProjectDD from 'components/elements/dropDown/listUserBeLongProjectDD/listUserBeLongProjectDD';
// graphql
import { CREATE_TASK_MUTATION } from 'apis/task/mutations';
import { useMutation } from '@apollo/client';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { createTaskInList } from 'slices/taskList/slice';
// helpers
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
// interfaces
import { IInitialStateUser } from 'slices/user/interfaces';
import { RootState } from 'global/redux/rootReducer';
import { openNotification } from 'helpers/toastify/notification';
import { useParams } from 'react-router-dom';
import { IUserDashboard } from 'slices/dashboard/interfaces';
// socket
import { SocketContext } from 'socketIO/context';
import { taskEvents } from 'socketIO/events/taskEvents';
import { mainParamPage } from 'global/routes/page';
import { GET_USER_BY_ID_Mutation } from 'apis/users/mutations';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	listId: string;
}

const CreateTaskDetailModalNotAssignee: React.FC<IProps> = ({ hidden, setHidden, listId }) => {
	// state
	const socket = useContext(SocketContext);
	const params = useParams();
	const [ taskName, setTaskName ] = useState('');
	// redux
	const dispatch = useDispatch();
	const userRedux: IInitialStateUser = useSelector((state: RootState) => state.user);
	const [ descriptions, setDescriptions ] = useState<string>('');
	const [ isShowDescription, setIsShopDescriptions ] = useState(false);
	// graphql
	const [ onCreateTask, { loading: loadingCreateTask } ] = useMutation(CREATE_TASK_MUTATION);
	const [ onGetUserById, { loading: loadingGetUserById } ] = useMutation(GET_USER_BY_ID_Mutation);
	const [ assignee, setAssignee ] = useState<IUserDashboard | null>(null);
	// event
	const handleChangeAssignee = async (_userId: string) => {
		const { data, isError } = await fetchDataAndShowNotify({
			fnFetchData: onGetUserById,
			variables:
				{
					getUserByIdInput:
						{
							_userId,
						},
				},
		});

		if (!isError) {
			setAssignee(data);
		}
	};

	const handleChangeTaskName = async (e: React.FormEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		setTaskName(value);
	};

	const handleCreateTask = async () => {
		if (taskName) {
			const { data, isError } = await fetchDataAndShowNotify({
				fnFetchData: onCreateTask,
				variables:
					{
						createTaskInput:
							{
								_listId: listId,
								name: taskName,
								assignee: assignee === null ? null : assignee._id,
								descriptions,
							},
					},
			});

			// CREATE TASKs
			if (!isError) {
				dispatch(createTaskInList(data));
				// socket
				socket.emit(taskEvents.handleCreateTask, {
					data,
					_projectId: params[mainParamPage.projectId] || '',
				});
				setHidden(false);
			}
		}
		else {
			openNotification({ title: 'Wanning', extensions: [ 'Please enter your task name' ] }, true);
		}
	};

	const handleGetDes = (text: string) => {
		setDescriptions(text);
		setIsShopDescriptions(false);
	};

	if (loadingCreateTask || loadingGetUserById) return <LoadingView />;

	return (
		<React.Fragment>
			<ModalStyled centered visible={hidden} width={'90vw'} footer={null} className='modal__task-detail'>
				<section className='task-detail__container'>
					<div className='task-detail__header'>
						{/* <div className='task-detail__header__tag'>MT - 6</div> */}
						<div className='task-detail__header__close' onClick={() => setHidden(false)}>
							X
						</div>
					</div>

					<div className='task-detail__description'>
						<div className='name-task'>
							<input
								type='text'
								value={taskName}
								placeholder='Enter your task Name...'
								onChange={handleChangeTaskName}
								name='taskName'
							/>
						</div>
						<div className='des-task'>
							{!isShowDescription && (
								<div className='des-task__content' onClick={() => setIsShopDescriptions(true)}>
									Add Description
								</div>
							)}

							{isShowDescription && (
								<TinyMce onGetText={handleGetDes} marginTop='20px' initialValue={descriptions} />
							)}

							{!isShowDescription && (
								<div className='html-tags' dangerouslySetInnerHTML={{ __html: descriptions }} />
							)}
						</div>
					</div>

					<div className='task-detail__assign'>
						<div className='task-detail__assign__detail'>
							<div className='title'>Details</div>

							<div className='table'>
								<div className='assignee'>
									<div className='left'>Assignee</div>
									<div className='right'>
										<div className='right__avt'>
											<ListUserBeLongProjectDD
												onChangeUser={handleChangeAssignee}
												assignee={assignee}
											/>
										</div>
										<div className='right__name'>{''}</div>
									</div>
								</div>
								<div className='reporter'>
									<div className='left'>Reporter</div>
									<div className='right'>
										<div className='right__avt'>
											<Image
												public_id={userRedux.profile.avatar}
												w={40}
												h={40}
												styles={{ borderRadius: '100rem' }}
												tooltip={userRedux.profile.email}
												placement={'rightBottom'}
											/>
										</div>
										<div className='right__name'>{userRedux.profile.displayName}</div>
									</div>
								</div>
							</div>
						</div>

						<div className='task-detail__assign__btn'>
							<button onClick={handleCreateTask}>Create Task</button>
						</div>
					</div>
				</section>
			</ModalStyled>
		</React.Fragment>
	);
};

export default CreateTaskDetailModalNotAssignee;
