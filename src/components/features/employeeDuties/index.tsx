import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
// Component
import { EmployeeDutiesStyled } from './index.styled';
import ListFilterSpaceProjectListDD from 'components/elements/dropDown/ListFilterSpaceProjectListDD/ListFilterSpaceDD';
// import { RootState } from 'global/redux/rootReducer';
interface E1 {
	id: string;
	content: string;
}
interface E3 {
	name: string;
	items: E1[];
}
interface E2 {
	[key: string]: E3;
}
const itemsFromBackend = [
	{ id: '1', content: 'First task' },
	{ id: '2', content: 'Second task' },
	{ id: '3', content: 'Third task' },
	{ id: '4', content: 'Fourth task' },
	{ id: '5', content: 'Fifth task' },
];

const columnsFromBackend: E2 = {
	1:
		{
			name: 'Requested',
			items: itemsFromBackend,
		},
	2:
		{
			name: 'To do',
			items: [],
		},
	3:
		{
			name: 'In Progress',
			items: [],
		},
	4:
		{
			name: 'Done',
			items: [],
		},
	5:
		{
			name: 'Done',
			items: [],
		},
	6:
		{
			name: 'Done',
			items: [],
		},
};

const EmployeeDuties: React.FC = () => {
	const [ columns, setColumns ] = useState<E2>(columnsFromBackend);

	const onDragEnd = (result: DropResult, columns: E2, setColumns: React.Dispatch<React.SetStateAction<E2>>) => {
		if (!result.destination) return;
		const { source, destination } = result;

		if (source.droppableId !== destination.droppableId) {
			const sourceColumn = columns[source.droppableId];
			const destColumn = columns[destination.droppableId];
			const sourceItems = [ ...sourceColumn.items ];
			const destItems = [ ...destColumn.items ];
			const [ removed ] = sourceItems.splice(source.index, 1);
			destItems.splice(destination.index, 0, removed);
			setColumns({
				...columns,
				[source.droppableId]:
					{
						...sourceColumn,
						items: sourceItems,
					},
				[destination.droppableId]:
					{
						...destColumn,
						items: destItems,
					},
			});
		}
		else {
			const column = columns[source.droppableId];
			const copiedItems = [ ...column.items ];
			const [ removed ] = copiedItems.splice(source.index, 1);
			copiedItems.splice(destination.index, 0, removed);
			setColumns({
				...columns,
				[source.droppableId]:
					{
						...column,
						items: copiedItems,
					},
			});
		}
	};

	return (
		<EmployeeDutiesStyled>
			<div className='employee-duties__header'>user --{'>'} Phạm Đức Huy</div>
			<div className='employee-duties__filter'>
				<div className='employee-duties__filter__container'>
					<div className='employee-duties__filter__name'>
						<p>Work Space</p>
					</div>
					<div className='employee-duties__filter__item'>
						<ListFilterSpaceProjectListDD />
					</div>
				</div>
				<div className='employee-duties__filter__container'>
					<div className='employee-duties__filter__name'>
						<p>Project</p>
					</div>
					<div className='employee-duties__filter__item'>
						<ListFilterSpaceProjectListDD />
					</div>
				</div>
				<div className='employee-duties__filter__container'>
					<div className='employee-duties__filter__name'>
						<p>List</p>
					</div>
					<div className='employee-duties__filter__item'>
						<ListFilterSpaceProjectListDD />
					</div>
				</div>
			</div>
			<div style={{ display: 'flex', justifyContent: 'center', height: '100%' }} className='drag-drop-context'>
				<DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
					{Object.entries(columns).map(([ columnId, column ], index) => {
						return (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
								key={columnId}
							>
								<h2>{column.name}</h2>
								<div style={{ margin: 8 }}>
									<Droppable droppableId={columnId} key={columnId}>
										{(provided, snapshot) => {
											return (
												<div
													{...provided.droppableProps}
													ref={provided.innerRef}
													style={{
														background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
														padding: 4,
														width: 250,
														minHeight: 500,
													}}
												>
													{column.items.map((item, index) => {
														return (
															<Draggable
																key={item.id}
																draggableId={item.id}
																index={index}
															>
																{(provided, snapshot) => {
																	return (
																		<div
																			ref={provided.innerRef}
																			{...provided.draggableProps}
																			{...provided.dragHandleProps}
																			style={{
																				userSelect: 'none',
																				padding: 16,
																				margin: '0 0 8px 0',
																				minHeight: '50px',
																				backgroundColor:
																					snapshot.isDragging
																						? '#263B4A'
																						: '#456C86',
																				color: 'white',
																				...provided.draggableProps.style,
																			}}
																		>
																			{item.content}
																		</div>
																	);
																}}
															</Draggable>
														);
													})}
													{provided.placeholder}
												</div>
											);
										}}
									</Droppable>
								</div>
							</div>
						);
					})}
				</DragDropContext>
			</div>
			);
		</EmployeeDutiesStyled>
	);
};

export default EmployeeDuties;
