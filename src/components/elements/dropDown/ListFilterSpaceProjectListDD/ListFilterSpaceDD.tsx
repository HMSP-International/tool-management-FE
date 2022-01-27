import React, { useState } from 'react';
import Select from 'react-select';

// import { IUser } from 'slices/dashboard/interfaces';

interface IProps {
	// onChangeUser(T: string): void;
	// assignee: IUser | null;
}

const ListFilterSpaceProjectListDD: React.FC<IProps> = () => {
	// const { _projectId } = useParams();
	const [ options ] = useState([
		{
			label: 'All Space',
			value: '-1',
		},
		{
			label: 'HMSP',
			value: '12',
		},
	]);

	// const [ onGetUserBeLongProject, { loading: loadingGetUserBelongProject } ] = useMutation(
	// 	GET_USERS_BELONG_PROJECT_MUTAIION,
	// );

	// useEffect(
	// 	() => {
	// 		const fetchData = async () => {
	// 			if (!loadingGetUserBelongProject) {
	// 				const { data, isError } = await fetchDataAndShowNotify({
	// 					fnFetchData: onGetUserBeLongProject,
	// 					variables: { getUsersBelongProjectInput: { _projectId } },
	// 				});

	// 				if (!isError) {
	// 					const users = data.map((paticipant: IPaticipant) => ({
	// 						label: paticipant._memberId.email,
	// 						value: paticipant._memberId._id,
	// 					}));

	// 					setOptions(users);
	// 				}
	// 			}
	// 		};

	// 		fetchData();
	// 	},
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// 	[ _projectId, onGetUserBeLongProject ],
	// );

	// if (loadingGetUserBelongProject) return <LoadingView />;

	const handleChangeUser = (e: any) => {
		// onChangeUser(e.value);
	};

	return (
		<Select
			// defaultValue={{
			// 	label: assignee ? assignee.email : 'Please choose member',
			// 	value: assignee ? assignee._id : '',
			// }}
			defaultValue={{
				label: 'All',
				value: '-1',
			}}
			onChange={handleChangeUser}
			options={options}
			styles={{
				control:
					() => ({
						width: 200,
					}),
			}}
			components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
		/>
	);
};

export default ListFilterSpaceProjectListDD;
