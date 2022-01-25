import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import LoadingView from 'components/shared/loadingView/loadingView';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import { GET_USERS_BELONG_PROJECT_MUTAIION } from 'apis/paticipants/mutations';
import { IPaticipant } from 'slices/paticipant/interfaces';
import { IUser } from 'slices/dashboard/interfaces';

interface IProps {
	onChangeUser(T: string): void;
	assignee: IUser | null;
}

const ListUserBeLongProjectDD: React.FC<IProps> = ({ onChangeUser, assignee }) => {
	const { _projectId } = useParams();
	const [ options, setOptions ] = useState([]);

	const [ onGetUserBeLongProject, { loading: loadingGetUserBelongProject } ] = useMutation(
		GET_USERS_BELONG_PROJECT_MUTAIION,
	);

	useEffect(
		() => {
			const fetchData = async () => {
				if (!loadingGetUserBelongProject) {
					const { data, isError } = await fetchDataAndShowNotify({
						fnFetchData: onGetUserBeLongProject,
						variables: { getUsersBelongProjectInput: { _projectId } },
					});

					if (!isError) {
						const users = data.map((paticipant: IPaticipant) => ({
							label: paticipant._memberId.email,
							value: paticipant._memberId._id,
						}));

						setOptions(users);
					}
				}
			};

			fetchData();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ _projectId, onGetUserBeLongProject ],
	);

	if (loadingGetUserBelongProject) return <LoadingView />;

	const handleChangeUser = (e: any) => {
		onChangeUser(e.value);
	};

	return (
		<Select
			defaultValue={{
				label: assignee ? assignee.email : 'Please choose member',
				value: assignee ? assignee._id : '',
			}}
			onChange={handleChangeUser}
			options={options}
			styles={{
				control:
					() => ({
						width: 250,
					}),
			}}
			components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
		/>
	);
};

export default ListUserBeLongProjectDD;
