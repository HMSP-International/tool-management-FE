declare type TooltipPlacement = 'All Workspaces' | 'All Projects' | 'All Lists';
export interface IPropsDefaultValue {
	label: TooltipPlacement;
	value: string;
}

export interface IInitialStateEmployeeDuties {
	status: string;
	error?: string | null;

	project: IPropsDefaultValue;
	space: IPropsDefaultValue;
}
