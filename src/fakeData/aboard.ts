import { ILists, ITask } from '../components/features/boardTask/iBoardTask';

export const itemsFromBe: Array<ITask> = [
	{ _listId: '1', content: 'first task' },
	{ _listId: '2', content: 'two task' },
	{ _listId: '3', content: 'three task' },
];

export const columnsFromBe: ILists = {
	'1':
		{
			name: 'To Do',
			items: itemsFromBe,
		},
	'2':
		{
			name: 'In Progress',
			items: [],
		},
	'3':
		{
			name: 'Review',
			items: [],
		},
};
