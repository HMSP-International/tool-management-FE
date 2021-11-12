import { ILists, ITask } from '../components/features/boardTask/iBoardTask';

export const itemsFromBe: Array<ITask> = [
	{ _listId: '1', content: 'first task' },
	{ _listId: '2', content: 'two task' },
	{ _listId: '3', content: 'three task' },
];

export const columnsFromBe: ILists = {
	'1':
		{
			name: 'Requested',
			items: itemsFromBe,
		},
	'2':
		{
			name: 'To Do',
			items: [],
		},
	'3':
		{
			name: 'In Progress',
			items: [],
		},
	'4':
		{
			name: 'Done',
			items: [],
		},
	'5':
		{
			name: 'Review',
			items: [],
		},
	'6':
		{
			name: 'Pending',
			items: [],
		},
};
