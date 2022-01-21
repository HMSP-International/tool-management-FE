import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux';
import {
	changeListInTaskSocket,
	changeTask,
	createNewList,
	createTaskInList,
	deleteTaskList,
	deleteTasksInList,
} from 'slices/taskList/slice';

import { SocketContext } from 'socketIO/context';
import { projectEvents } from 'socketIO/events/projectEvents';
import { taskEvents } from 'socketIO/events/taskEvents';
import { changeCurrentTaskModal } from 'slices/task/slice';
import { listEvents } from 'socketIO/events/listEvents';

interface IProps {}

const WorkSpaceSocketHoc: React.FC<IProps> = ({ children }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const socket = useContext(SocketContext);

	// Task
	useEffect(
		() => {
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
		},
		[ dispatch, params._id, socket ],
	);

	// List
	useEffect(
		() => {
			socket.on(listEvents.handleCreateList, (data: any) => {
				dispatch(createNewList(data));
			});

			socket.on(listEvents.handleDeleteList, (data: any) => {
				dispatch(deleteTaskList(data));
			});
		},
		[ dispatch, params._id, socket ],
	);

	// Project
	useEffect(
		() => {
			socket.emit(projectEvents.connectionToProject, { data: { _projectId: params._id || '' } });

			return () => {
				socket.emit(projectEvents.disconnectionToProject, { data: { _projectId: params._id || '' } });
			};
		},
		[ dispatch, params._id, socket ],
	);

	return <React.Fragment>{children}</React.Fragment>;
};

export default WorkSpaceSocketHoc;
