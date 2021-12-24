import React, { memo, useState } from 'react';
// 3rd Components
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from '../taskList/taskList';
import CreateListModal from 'components/elements/modals/create/createListModal/createListModal';
import InviteProjectModal from 'components/elements/modals/put/inviteProjectModal/inviteProjectModal';
import DeleteProjectModal from 'components/elements/modals/delete/deleteProjectModal/deleteProjectModal';
import TaskListDD from 'components/elements/dropDown/taskListDD/taskListDD';
import ConfigProjectDD from 'components/elements/dropDown/configProjectDD/configProjectDD';
// Styled Components
import { WorkSpaceStyled } from './workSpace.styled';
// interfaces
import { DropResult } from 'react-beautiful-dnd';
import { ITaskList } from 'slices/taskList/interfaces';

interface IProps {
	columns: ITaskList;
	onDragEnd: (result: DropResult, columns: ITaskList) => void;
	nameProject: string;
}

const WorkSpace: React.FC<IProps> = ({ columns, onDragEnd, nameProject }) => {
	const [ showCreateList, setShowCreateList ] = useState(false);
	const [ showDeleteProject, setShowDeleteProject ] = useState(false);
	const [ showInviteProject, setShowInviteProject ] = useState(false);

	return (
		<React.Fragment>
			<WorkSpaceStyled className='workspace'>
				<section className='workspace__header'>
					<div className='workspace__header__top'>
						<div>Projects / {nameProject}</div>
						<div className='workspace__header__top__btn'>
							<ConfigProjectDD
								onCreateList={setShowCreateList}
								onDeleteProject={setShowDeleteProject}
								onInviteProject={setShowInviteProject}
							/>
						</div>
					</div>
					<div className='workspace__header__title'>MT board</div>
					<div className='workspace__header__assign'>
						<div className='workspace__header__assign__input'>
							<input type='text' />
						</div>

						<div className='workspace__header__assign__group-avt'>
							<div className='workspace__header__assign__group-avt__item'>
								<img src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Green_icon.svg' alt='' />
							</div>
							<div className='workspace__header__assign__group-avt__item'>
								<img src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Green_icon.svg' alt='' />
							</div>
							<div className='workspace__header__assign__group-avt__item'>
								<img src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Green_icon.svg' alt='' />
							</div>
						</div>
					</div>
				</section>

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
			</WorkSpaceStyled>

			{showCreateList && <CreateListModal hidden={showCreateList} setHidden={setShowCreateList} />}

			{showDeleteProject && <DeleteProjectModal hidden={showDeleteProject} setHidden={setShowDeleteProject} />}

			{showInviteProject && (
				<InviteProjectModal
					hidden={showInviteProject}
					setHidden={setShowInviteProject}
					nameProject={nameProject}
				/>
			)}
		</React.Fragment>
	);
};

export default memo(WorkSpace);
