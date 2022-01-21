import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux';
import { changeListInTaskSocket, changeTask, createTaskInList, deleteTasksInList } from 'slices/taskList/slice';

import { SocketContext } from 'socketIO/context';
import { projectEvents } from 'socketIO/events/projectEvents';
import { taskEvents } from 'socketIO/events/taskEvents';
import { changeCurrentTaskModal } from 'slices/task/slice';

interface IProps {}

const WorkSpaceSocketHoc: React.FC<IProps> = ({ children }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const socket = useContext(SocketContext);

	useEffect(
		() => {
			socket.emit(projectEvents.emits.connectionToProject, { data: { _projectId: params._id || '' } });

			socket.on(taskEvents.handleDragAndDropIn1List, (data: any) => {
				dispatch(changeListInTaskSocket(data));
			});

			socket.on(taskEvents.handleDragAndDropInAnotherList, (data: any) => {
				dispatch(changeListInTaskSocket(data));
			});

			socket.on(taskEvents.handleCreateTask, (data: any) => {
				dispatch(createTaskInList(data));
			});

			socket.on(taskEvents.handleDeleteTask, (data: any) => {
				dispatch(deleteTasksInList(data));
			});

			socket.on(taskEvents.changeAssingeeTask, (data: any) => {
				dispatch(changeTask(data));
			});

			socket.on(taskEvents.changeTaskName, (data: any) => {
				dispatch(changeCurrentTaskModal(data));
				dispatch(changeTask(data));
			});

			return () => {
				socket.emit(projectEvents.emits.disconnectionToProject, { data: { _projectId: params._id || '' } });
			};
		},
		[ dispatch, params._id, socket ],
	);

	return <React.Fragment>{children}</React.Fragment>;
};

export default WorkSpaceSocketHoc;
