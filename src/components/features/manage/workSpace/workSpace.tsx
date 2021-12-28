import React, { memo, useState } from 'react';
// 3rd Components
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from '../taskList/taskList';
import CreateListModal from 'components/elements/modals/create/createListModal/createListModal';
import InviteProjectModal from 'components/elements/modals/put/inviteProjectModal/inviteProjectModal';
import DeleteProjectModal from 'components/elements/modals/delete/deleteProjectModal/deleteProjectModal';
import TaskListDD from 'components/elements/dropDown/taskListDD/taskListDD';
// Styled Components
import Container from '../container/container';
// interfaces
import { DropResult } from 'react-beautiful-dnd';
import { ITaskList } from 'slices/taskList/interfaces';
import { IInitialStateProject } from 'slices/project/interfaces';
// redux
import { useSelector } from 'react-redux';
import { RootState } from 'global/redux/rootReducer';

interface IProps {
	columns: ITaskList;
	onDragEnd: (result: DropResult, columns: ITaskList) => void;
}

const WorkSpace: React.FC<IProps> = ({ columns, onDragEnd }) => {
	const [ showCreateList, setShowCreateList ] = useState(false);
	const [ showDeleteProject, setShowDeleteProject ] = useState(false);
	const [ showInviteProject, setShowInviteProject ] = useState(false);

	const { currentProject }: IInitialStateProject = useSelector((state: RootState) => state.project);

	return (
		<React.Fragment>
			<Container>
				<section className='workspace__body'>
					<DragDropContext onDragEnd={result => onDragEnd(result, columns)}>
						{Object.entries(columns).map(([ columnId, columnData ]) => (
							<Droppable key={columnId} droppableId={columnId}>
								{(provided, snapshot) => {
									return (
										<div className='wrap-list'>
											<div className='wrap-list__title'>
												<div className='wrap-list__title__left'>
													<div className='wrap-list__title__left__name'>
														{columnData.name}
													</div>
													{'  '}
													<div className='wrap-list__title__left__number'>
														{columnData.items.length}
													</div>
												</div>
												<div className='wrap-list__title__right'>
													<div className='wrap-list__title__right__icon'>
														<TaskListDD listId={columnId} />
													</div>
												</div>
											</div>
											<List
												snapshot={snapshot}
												provided={provided}
												columnData={columnData}
												listId={columnId}
											/>
										</div>
									);
								}}
							</Droppable>
						))}
					</DragDropContext>
				</section>
			</Container>

			{showCreateList && <CreateListModal hidden={showCreateList} setHidden={setShowCreateList} />}

			{showDeleteProject && <DeleteProjectModal hidden={showDeleteProject} setHidden={setShowDeleteProject} />}

			{showInviteProject && (
				<InviteProjectModal
					hidden={showInviteProject}
					setHidden={setShowInviteProject}
					nameProject={currentProject.name}
				/>
			)}
		</React.Fragment>
	);
};

export default memo(WorkSpace);
