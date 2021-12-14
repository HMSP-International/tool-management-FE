import React, { memo, useState } from 'react';
// 3rd Components
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from '../taskList/taskList';
import CreateListModal from '../../../elements/modals/createListModal/createListModal';
import WorkSpaceDropDown from '../../../elements/dropDown/workSpaceDD/workSpaceDD';

// Styled Components
import { WorkSpaceStyled } from './workSpace.styled';

// interfaces
import { DropResult } from 'react-beautiful-dnd';
import { ITaskList } from 'slices/taskList/interfaces';

interface IProps {
	columns: ITaskList;
	onDragEnd: (result: DropResult, columns: ITaskList) => void;
	nameProject: string;
	onCreateList: (nameList: string) => void;
}

const WorkSpace: React.FC<IProps> = ({ columns, onDragEnd, nameProject, onCreateList }) => {
	const [ showCreateList, setShowCreateList ] = useState(false);

	return (
		<React.Fragment>
			<WorkSpaceStyled className='workspace'>
				<section className='workspace__header'>
					<div className='workspace__header__tree'>Projects / {nameProject}</div>
					<div className='workspace__header__title'>MT board</div>
					<div className='workspace__header__assign'>
						<div className='workspace__header__assign__input'>
							<input type='text' />
						</div>

						<div className='workspace__header__assign__group-avt'>
							<div className='workspace__header__assign__group-avt__item'>
								<img
									src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png'
									alt=''
								/>
							</div>
							<div className='workspace__header__assign__group-avt__item'>
								<img
									src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png'
									alt=''
								/>
							</div>
							<div className='workspace__header__assign__group-avt__item'>
								<img
									src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png'
									alt=''
								/>
							</div>
						</div>

						<div className='workspace__header__assign__create-list'>
							<button onClick={() => setShowCreateList(true)}>Create New List</button>
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
														<WorkSpaceDropDown listId={columnId} />
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

			{showCreateList && (
				<CreateListModal hidden={showCreateList} setHidden={setShowCreateList} onSubmit={onCreateList} />
			)}
		</React.Fragment>
	);
};

export default memo(WorkSpace);
