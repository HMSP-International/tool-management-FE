import { useMutation } from '@apollo/client';
import { GET_PROJECT_BY_MEMBER_ID_AND_SPACE_ID_MUTATION } from 'apis/projects/mutations';
import LoadingView from 'components/shared/loadingView/loadingView';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { PROJECT_DEFAULT } from 'slices/employeeDuties/initialState';
import { IPropsDefaultValue } from 'slices/employeeDuties/interfaces';
import { IProject } from 'slices/project/interfaces';
// routes
import { mainParamPage } from 'global/routes/page';

interface IProps {
	defaultValue: IPropsDefaultValue;
	onChangeData: (e: any) => void;
	space: IPropsDefaultValue;
}
// This is the page to check the tasks of every project about an employee
const ListFilterSpaceProjectListDD: React.FC<IProps> = ({ defaultValue, onChangeData, space }) => {
	const params = useParams();
	const [ options, setOptions ] = useState<IPropsDefaultValue[]>([
		{
			label: 'All Projects',
			value: '-1',
		},
	]);

	const [ onGetSpacesByMemberIdAndSpaceId, { loading: loadingGetprojectByMemberIdAndSpaceId } ] = useMutation(
		GET_PROJECT_BY_MEMBER_ID_AND_SPACE_ID_MUTATION,
	);

	useEffect(
		() => {
			const fetchData = async (space: IPropsDefaultValue) => {
				if (!loadingGetprojectByMemberIdAndSpaceId) {
					const { data, isError } = await fetchDataAndShowNotify({
						fnFetchData: onGetSpacesByMemberIdAndSpaceId,
						variables:
							{
								findByMemberIdAndSpaceIdInput:
									{ _memberId: params[mainParamPage.userId], _spaceId: space.value },
							},
					});

					if (!isError) {
						const newOptions: IPropsDefaultValue[] = [ PROJECT_DEFAULT ];

						newOptions.push(
							...data.map((d: IProject) => ({
								label: d.name,
								value: d._id,
							})),
						);
						setOptions(newOptions);
					}
				}
			};

			fetchData(space);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ space.value ],
	);

	if (loadingGetprojectByMemberIdAndSpaceId) return <LoadingView />;

	return (
		<Select
			defaultValue={defaultValue}
			onChange={onChangeData}
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
